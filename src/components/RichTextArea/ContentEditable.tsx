import React, { useEffect, useState, createElement, createRef } from 'react';
import styles from './_contentEditable.module.css';

export type ContentEditableEvent = React.SyntheticEvent<any, Event> & { target: { value: string } };
type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R;
type DivProps = Modify<JSX.IntrinsicElements["div"], { onChange: ((event: ContentEditableEvent) => void) }>;

export interface Props extends DivProps {
  html: string,
  disabled?: boolean,
  tagName?: string,
  className?: string,
  innerRef?: React.RefObject<HTMLElement> | Function,
}

const replaceCaret = (el: HTMLElement) => {
  // Place the caret at the end of the element
  const target = document.createTextNode('');
  el.appendChild(target);
  // do not move caret if element was not focused
  const isTargetFocused = document.activeElement === el;
  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    var sel = window.getSelection();
    if (sel !== null) {
      var range = document.createRange();
      range.setStart(target, target.nodeValue.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    if (el instanceof HTMLElement) el.focus();
  }
}

const ContentEditable: React.FC<Props> = ({ html, disabled, tagName, className, innerRef, ...props }: Props) => {
  const [lastHtml, setLastHtml] = useState(html)

  const el: any = typeof innerRef === 'function' ? { current: null } : createRef<HTMLElement>();

  const getEl = () => (innerRef && typeof innerRef !== 'function' ? innerRef : el).current;
  
  useEffect(() => {
    const el = getEl();
    el.innerHTML = html;
    setLastHtml(html);
    replaceCaret(el);
  }, [html])

  const emitChange = (originalEvt: React.SyntheticEvent<any>) => {
    const el = getEl();
    if (!el) return;

    const html = el.innerHTML;
    if (props.onChange && html !== lastHtml) {
      // Clone event with Object.assign to avoid
      // "Cannot assign to read only property 'target' of object"
      const evt = Object.assign({}, originalEvt, {
        target: {
          value: html
        }
      });
      props.onChange(evt);
    }
    setLastHtml(html);
  }

  return createElement(
    tagName || 'div',
    {
      ...props,
      className: styles.block,
      ref: typeof innerRef === 'function' ? (current: HTMLElement) => {
        innerRef(current)
        el.current = current
      } : innerRef || el,
      onInput: emitChange,
      onBlur: props.onBlur || emitChange,
      onKeyUp: props.onKeyUp || emitChange,
      onKeyDown: props.onKeyDown || emitChange,
      contentEditable: !disabled,
      dangerouslySetInnerHTML: { __html: html }
    },
    props.children
  );
}

export default ContentEditable
