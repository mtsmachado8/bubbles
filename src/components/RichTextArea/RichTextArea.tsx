import { useState } from 'react';
import { setCaretToEnd, uid } from '../../infra/helpers'
import EditableBlock from './EditableBlock';

const initialBlock = { id: uid(), html: "", tag: "p" };

const RichTextArea: React.FC = () => {
  const [blocks, setBlocks] = useState([initialBlock])

  const updateTextArea = (updatedBlock) => {
    const index = blocks.map((b) => b.id).indexOf(updatedBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: updatedBlock.tag,
      html: updatedBlock.html
    };
    setBlocks(updatedBlocks);
  }

  const addBlockHandler = (currentBlock) => {
    const newBlock = { id: uid(), html: "", tag: "p" };
    const updatedBlocks = [...blocks, newBlock];
    setBlocks(updatedBlocks);
    setTimeout(() => {currentBlock.ref.nextElementSibling.focus();}, 200);
  }

  const deleteBlockHandler = (currentBlock) => {
    const previousBlock = currentBlock.ref.previousElementSibling;
    if (previousBlock) {
      const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index, 1);
      setBlocks(updatedBlocks);
      setCaretToEnd(previousBlock);
      previousBlock.focus();
    }
  }

  return (
    <div className="Page">
      {blocks.map((block, key) => {
        return (
          <EditableBlock
            key={key}
            id={block.id}
            initTag={block.tag}
            initHtml={block.html}
            updateTextArea={updateTextArea}
            addBlock={addBlockHandler}
            deleteBlock={deleteBlockHandler}
          />
        );
      })}
    </div>
  );
}

export default RichTextArea