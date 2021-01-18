import React, { useEffect, useState } from "react";
import { getCaretCoordinates, setCaretToEnd } from "../../infra/helpers";
import SelectMenu from "./SelectMenu";
import ContentEditable from 'react-contenteditable';

type Props = {
  id: string,
  initHtml: string,
  initTag: string,
  addBlock: Function,
  deleteBlock: Function,
  updatePage: Function,
};

const EditableBlock: React.FC<Props> = ({ id, initHtml, initTag, addBlock, deleteBlock, updatePage }: Props) => {
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
  const [selectMenuPosition, setSelectMenuPosition] = useState({ x: null, y: null })
  const [htmlBackup, setHtmlBackup] = useState(null);
  const [previousKey, setPreviousKey] = useState('');
  const [tag, setTag] = useState(initTag)
  const [html, setHtml] = useState(initHtml)
  const contentEditable = React.createRef<HTMLElement>();
  
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

  const tagSelectionHandler = (tag) => {
    setTag(tag)
    setHtml(htmlBackup);
    setCaretToEnd(contentEditable.current);
    closeSelectMenuHandler();
  }

  const onChangeHandler = (e) => setHtml(e.target.value);

  useEffect(() => {
    updatePage({
      id,
      html,
      tag
    })
  }, [id, html, tag])

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
        className="Block"
        innerRef={contentEditable}
        html={html}
        tagName={tag}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        onKeyUp={onKeyUpHandler}
      />
    </>
  );
}

export default EditableBlock;