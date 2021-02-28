import ContentEditable, { ContentEditableEvent } from './ContentEditable';
import { useRef } from 'react';

type Props = {
  contentEditableRef?: React.Ref<HTMLElement>,
  html: string,
  tag: string,
  onChangeHandler?: (event: ContentEditableEvent) => void,
  onKeyDownHandler?: (event: React.KeyboardEvent<HTMLDivElement>) => void,
  onKeyUpHandler?: (event: React.KeyboardEvent<HTMLDivElement>) => void,
};

const HtmlContent: React.FC<Props> = ({ html, tag, onChangeHandler, onKeyDownHandler, onKeyUpHandler }: Props) => {
  const contentEditableRef = useRef<HTMLElement>();
  
  return (
    <ContentEditable
      innerRef={contentEditableRef}
      html={html}
      tagName={tag}
      onChange={onChangeHandler}
      onKeyDown={onKeyDownHandler}
      onKeyUp={onKeyUpHandler}
    />
  )
}

export default HtmlContent
