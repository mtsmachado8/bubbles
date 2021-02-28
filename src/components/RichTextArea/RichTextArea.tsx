import { useEffect } from 'react';
import { setCaretToEnd, uid } from './helpers'
import EditableBlock from './EditableBlock';

type Block = {
  id: string,
  html: string,
  tag: string, // 'h1' | 'h2' | 'h3' | 'p'
  placeholder: string
}

type Props = {
  blocks: Block[],
  setBlocks: Function
}

const RichTextArea: React.FC<Props> = ({ blocks, setBlocks }: Props) => {

  useEffect(() => {
    console.log('effect', blocks)
  }, [blocks])

  const updateBlockHandler = (updatedBlock) => {
    const index = blocks.map((b) => b.id).indexOf(updatedBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: updatedBlock.tag,
      html: updatedBlock.html,
      placeholder: updatedBlock.placeholder
    };
    updatedBlock?.ref?.focus()
    setBlocks(updatedBlocks);
  }

  const addBlockHandler = (currentBlock) => {
    const newBlock = { id: uid(), html: "", tag: "p", placeholder: `Type '/' for commands` };
    const currentBlockIndex = blocks.findIndex(block => block.id === currentBlock.id)
    const newBlocks = [...blocks]
    newBlocks.splice(currentBlockIndex + 1, 0, ...[newBlock])
    setBlocks(newBlocks);
    setTimeout(() => {currentBlock.ref.nextElementSibling?.focus();}, 200);
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
    <div className="Content">
      {blocks.map((block, key) => {
        return (
          <EditableBlock
            key={key}
            block={block}
            updateBlock={updateBlockHandler}
            addBlock={addBlockHandler}
            deleteBlock={deleteBlockHandler}
          />
        );
      })}
    </div>
  );
}

export default RichTextArea