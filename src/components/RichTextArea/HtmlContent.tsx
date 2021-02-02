import styles from './_editableBlock.module.css';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { createRef } from 'react';

type Props = {
  contentEditableRef?: React.Ref<HTMLElement>,
  html: string,
  tag: string,
  onChangeHandler?: (event: ContentEditableEvent) => void,
  onKeyDownHandler?: (event: React.KeyboardEvent<HTMLDivElement>) => void,
  onKeyUpHandler?: (event: React.KeyboardEvent<HTMLDivElement>) => void,
};

const HtmlContent: React.FC<Props> = ({ html, tag, onChangeHandler, onKeyDownHandler, onKeyUpHandler }: Props) => {
  const contentEditableRef = createRef<HTMLElement>();
  
  return (
    <ContentEditable
      className={styles.block}
      innerRef={contentEditableRef}
      html={html}
      tagName={tag}
      onChange={onChangeHandler}
      onKeyDown={onKeyDownHandler}
      onKeyUp={onKeyUpHandler}
      placeholder={"Type '/' for commands"}
    />
  )
}

export default HtmlContent
