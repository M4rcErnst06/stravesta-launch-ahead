
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ToolCard from './ToolCard';

interface DraggableToolCardProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  status: 'active' | 'coming-soon' | 'beta';
  onUse?: () => void;
}

const DraggableToolCard: React.FC<DraggableToolCardProps> = ({ 
  id, 
  icon, 
  title, 
  status, 
  onUse 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <ToolCard
        icon={icon}
        title={title}
        status={status}
        onUse={onUse}
      />
    </div>
  );
};

export default DraggableToolCard;
