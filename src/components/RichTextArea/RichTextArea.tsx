import { useEffect } from 'react';
import { setCaretToEnd, uid } from '../../infra/helpers'
import EditableBlock from './EditableBlock';

const initialBlock = { id: undefined, html: "", tag: "h1" };

type Block = {
  id: string,
  html: string,
  tag: 'h1' | 'h2' | 'h3' | 'p'
}

type Props = {
  blocks: Block[],
  setBlocks: Function
}

const RichTextArea: React.FC<Props> = ({ blocks, setBlocks }: Props) => {
  useEffect(() => {
    setBlocks([initialBlock])
  }, [])

  const updateTextArea = (updatedBlock) => {
    const index = blocks.map((b) => b.id).indexOf(updatedBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: updatedBlock.tag,
      html: updatedBlock.html
    };
    updatedBlock.ref.focus()
    setBlocks(updatedBlocks);
  }

  const addBlockHandler = (currentBlock) => {
    const newBlock = { id: undefined, html: "", tag: "p" };
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
    <div className="Content">
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