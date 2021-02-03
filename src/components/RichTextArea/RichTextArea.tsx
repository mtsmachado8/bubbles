import { useEffect } from 'react';
import { setCaretToEnd, uid } from '../../infra/helpers'
import EditableBlock from './EditableBlock';

const defaultInitialBlock = { id: uid(), html: "", tag: "h1", placeholder: 'Title' };

type Block = {
  id: string,
  html: string,
  tag: string, // 'h1' | 'h2' | 'h3' | 'p'
  placeholder: string
}

type Props = {
  initialBlock: Block,
  blocks: Block[],
  setBlocks: Function
}

const RichTextArea: React.FC<Props> = ({ initialBlock = defaultInitialBlock, blocks, setBlocks }: Props) => {
  useEffect(() => {
    setBlocks([initialBlock])
  }, [])

  const updateTextArea = (updatedBlock) => {
    const index = blocks.map((b) => b.id).indexOf(updatedBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: updatedBlock.tag,
      html: updatedBlock.html,
      placeholder: updatedBlock.placeholder
    };
    updatedBlock.ref.focus()
    setBlocks(updatedBlocks);
  }

  const addBlockHandler = (currentBlock) => {
    const newBlock = { id: uid(), html: "", tag: "p", placeholder: `Type '/' for commands` };
    const updatedBlocks = [...blocks, newBlock];
    setBlocks(updatedBlocks);
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
            id={block.id}
            initTag={block.tag}
            initHtml={block.html}
            initPlaceholder={block.placeholder}
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