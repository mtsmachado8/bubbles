import React, { useEffect, useState, useRef } from "react";
import { getCaretCoordinates, setCaretToEnd } from "../../infra/helpers";
import SelectMenu from "./SelectMenu";
import ContentEditable from './ContentEditable';

type Props = {
  id: string,
  initHtml: string,
  initTag: string,
  initPlaceholder: string,
  addBlock: Function,
  deleteBlock: Function,
  updateTextArea: Function,
};

const EditableBlock: React.FC<Props> = ({ id, initHtml, initTag, initPlaceholder, addBlock, deleteBlock, updateTextArea }: Props) => {
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
  const [selectMenuPosition, setSelectMenuPosition] = useState({ x: null, y: null })
  const [htmlBackup, setHtmlBackup] = useState(null);
  const [previousKey, setPreviousKey] = useState('');
  const [tag, setTag] = useState(initTag)
  const [html, setHtml] = useState(initHtml)
  const [placeholder, setPlaceholder] = useState(initPlaceholder)
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
    if (e.key === "/") setHtmlBackup(html);
    if (e.key === "Enter") {
      if (previousKey !== "Shift") {
        e.preventDefault();
        addBlock({
          id,
          ref: contentEditable.current
        });
      }
    }
    if (e.key === "Backspace" && !html) {
      e.preventDefault();
      deleteBlock({
        id,
        ref: contentEditable.current
      });
    }
    setPreviousKey(e.key);
  }

  const tagSelectionHandler = (item: any) => {
    setTag(item.tag)
    setPlaceholder(item.placeholder)
    setHtml(htmlBackup);
    setCaretToEnd(contentEditable.current);
    closeSelectMenuHandler();
  }

  const onChangeHandler = (e) => setHtml(e.target.value);

  useEffect(() => {
    updateTextArea({
      id,
      html,
      tag,
      placeholder,
      ref: contentEditable.current
    })
  }, [id, html, tag, placeholder])

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
        html={html}
        tagName={tag}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        onKeyUp={onKeyUpHandler}
        placeholder={placeholder}
      />
    </>
  );
}

export default EditableBlock;