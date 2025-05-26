
import { supabase } from '@/integrations/supabase/client';

export const checkAndCreateAdminUser = async (email: string) => {
  try {
    // Check if admin user exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking admin user:', checkError);
      return false;
    }

    // If admin doesn't exist, create one (this will require the user to be authenticated first)
    if (!existingAdmin) {
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert({ email });

      if (insertError) {
        console.error('Error creating admin user:', insertError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error in checkAndCreateAdminUser:', error);
    return false;
  }
};
