import React, { useEffect, useState, useRef } from "react";
import { getCaretCoordinates, setCaretToEnd } from "./helpers";
import SelectMenu from "./SelectMenu";
import ContentEditable from './ContentEditable';

type Block = {
  id: string,
  html: string,
  tag: string, // 'h1' | 'h2' | 'h3' | 'p'
  placeholder: string
}

type Props = {
  block: Block,
  addBlock: Function,
  deleteBlock: Function,
  updateBlock: Function,
};

const EditableBlock: React.FC<Props> = ({ block, addBlock, deleteBlock, updateBlock }: Props) => {
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
  const [selectMenuPosition, setSelectMenuPosition] = useState({ x: null, y: null })
  const [htmlBackup, setHtmlBackup] = useState(null);
  const [previousKey, setPreviousKey] = useState('');
  const contentEditable = useRef<HTMLElement>();
  
  const closeSelectMenuHandler = () => {
    setHtmlBackup(null)
    setIsSelectMenuOpen(false)
    setSelectMenuPosition({ x: null, y: null })
    document.removeEventListener("click", closeSelectMenuHandler);
  }

  const openSelectMenuHandler = () => {
    const { x, y } = getCaretCoordinates();
    setIsSelectMenuOpen(true);
    setSelectMenuPosition({ x, y })
    document.addEventListener("click", closeSelectMenuHandler);
  }

  const onKeyUpHandler = (e) => {
    if (e.key === "/") {
      openSelectMenuHandler();
    }
  }

  const onKeyDownHandler = (e) => {
    if (e.key === "/") setHtmlBackup(block.html);
    if (e.key === "Enter") {
      if (previousKey !== "Shift") {
        e.preventDefault();
        addBlock({
          id: block.id,
          ref: contentEditable.current
        });
      }
    }
    if (e.key === "Backspace" && !block.html) {
      e.preventDefault();
      deleteBlock({
        id: block.id,
        ref: contentEditable.current
      });
    }
    setPreviousKey(e.key);
  }

  const tagSelectionHandler = (item: any) => {
    updateBlock({
      ...block,
      tag: item.tag,
      html: htmlBackup,
      placeholder: item.placeholder
    })
    setCaretToEnd(contentEditable.current);
    closeSelectMenuHandler();
  }

  const onChangeHandler = (e) => updateBlock({
    ...block,
    html: e.target.value
  });

  useEffect(() => {
    updateBlock({
      ...block,
      ref: contentEditable.current
    })
  }, [block])

  return (
    <>
      {isSelectMenuOpen && (
        <SelectMenu
          position={selectMenuPosition}
          onSelect={tagSelectionHandler}
          close={closeSelectMenuHandler}
        />
      )}
      <ContentEditable
        innerRef={contentEditable}
        html={block?.html}
        tagName={block?.tag}
        placeholder={block?.placeholder}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        onKeyUp={onKeyUpHandler}
      />
    </>
  );
}

export default EditableBlock;