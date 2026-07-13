import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import BlockFields from './BlockFields';

export default function SortableBlock({ block, onChange, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  });

  // These inline styles are what actually move the block during a drag -
  // dnd-kit calculates the transform, we just apply it.
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="block-list__block">
      <div className="block-list__block-header">
        <span className="block-list__handle" {...attributes} {...listeners}>
          ⠿
        </span>
        <span className="block-list__type-badge">{block.type}</span>
        <button type="button" onClick={onRemove}>
          Remove
        </button>
      </div>
      <BlockFields block={block} onChange={onChange} />
    </div>
  );
}