'use client';

import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import SortableBlock from './SortableBlock';
import { BLOCK_TYPES, EMPTY_CONTENT, newTempId, deleteFile } from '../_lib/block-helpers';
import { saveBlocksAction } from '../_lib/post-actions';

export default function BlockList({ postId, initialBlocks }) {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [isPending, startTransition] = useTransition();

  // Requires a small drag distance before activating, so a normal click
  // on a text field inside a block doesn't accidentally start a drag.
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function addBlock(type) {
    setBlocks([...blocks, { id: newTempId(), type, content: EMPTY_CONTENT[type] }]);
  }

  function updateBlockContent(id, content) {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, content } : b)));
  }

  function removeBlock(id) {
    const block = blocks.find((b) => b.id === id);
    if (block?.content?.publicId) {
      deleteFile(block.content.publicId, block.content.resourceType);
    }
    setBlocks(blocks.filter((b) => b.id !== id));
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = blocks.findIndex((b) => b.id === active.id);
    const newIndex = blocks.findIndex((b) => b.id === over.id);
    setBlocks(arrayMove(blocks, oldIndex, newIndex));
  }

  function handleSave() {
    const blocksToSave = blocks.map((b) => ({
      id: typeof b.id === 'string' && b.id.startsWith('temp-') ? undefined : b.id,
      type: b.type,
      content: b.content,
    }));

    startTransition(async () => {
      try {
        const saved = await saveBlocksAction(postId, blocksToSave);
        setBlocks(saved);
        toast.success('Blocks saved');
      } catch (error) {
        toast.error('Something went wrong saving blocks.');
      }
    });
  }

  return (
    <div className="block-list">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
          <div className="block-list__list">
            {blocks.map((block) => (
              <SortableBlock
                key={block.id}
                block={block}
                onChange={(content) => updateBlockContent(block.id, content)}
                onRemove={() => removeBlock(block.id)}
              />
            ))}
            {blocks.length === 0 && <p>No blocks yet — add one below.</p>}
          </div>
        </SortableContext>
      </DndContext>

      <div className="block-list__add-row">
        {BLOCK_TYPES.map(({ type, label }) => (
          <button key={type} type="button" onClick={() => addBlock(type)}>
            + {label}
          </button>
        ))}
      </div>

      <div className="block-list__save-row">
        <button type="button" onClick={handleSave} disabled={isPending}>
          {isPending ? 'Saving…' : 'Save blocks'}
        </button>
      </div>
    </div>
  );
}