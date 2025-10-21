-- Fix 1: Remove public SELECT access from subscribers table
-- This prevents email harvesting by unauthenticated users
DROP POLICY IF EXISTS "Anyone can read subscribers for duplicate check" ON public.subscribers;
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscribers;
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.subscribers;
DROP POLICY IF EXISTS "Allow public subscription" ON public.subscribers;

-- Add UNIQUE constraint on email to enable INSERT...ON CONFLICT
-- This allows duplicate prevention without public SELECT access
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'subscribers_email_unique'
  ) THEN
    ALTER TABLE public.subscribers ADD CONSTRAINT subscribers_email_unique UNIQUE (email);
  END IF;
END $$;

-- Fix 2: Fix admin_users RLS recursion issue
-- Update the existing is_admin_user function to ensure it has SET search_path
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())
  )
$$;

-- Drop the recursive policy that queries admin_users from within itself
DROP POLICY IF EXISTS "Admins can view admin users" ON public.admin_users;

-- Recreate using the SECURITY DEFINER function which bypasses RLS
CREATE POLICY "Admins can view admin users"
ON public.admin_users
FOR SELECT
USING (public.is_admin_user());