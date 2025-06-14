
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
      className="relative"
    >
      {/* Drag Handle - nur ein kleiner Bereich zum Ziehen */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 right-2 w-8 h-8 cursor-grab active:cursor-grabbing z-10 bg-stravesta-navy/80 rounded-full flex items-center justify-center hover:bg-stravesta-teal/20 transition-colors"
        title="Ziehen zum Verschieben"
      >
        <div className="grid grid-cols-2 gap-0.5">
          <div className="w-1 h-1 bg-stravesta-lightGray rounded-full"></div>
          <div className="w-1 h-1 bg-stravesta-lightGray rounded-full"></div>
          <div className="w-1 h-1 bg-stravesta-lightGray rounded-full"></div>
          <div className="w-1 h-1 bg-stravesta-lightGray rounded-full"></div>
        </div>
      </div>
      
      {/* Tool Card - kann normal geklickt werden */}
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
