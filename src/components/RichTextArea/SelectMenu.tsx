import { useEffect, useState } from "react";
import { matchSorter } from 'match-sorter'

const MENU_HEIGHT = 150;
const allowedTags = [
  {
    id: "page-title",
    tag: "h1",
    label: "Page Title"
  },
  {
    id: "heading",
    tag: "h2",
    label: "Heading"
  },
  {
    id: "subheading",
    tag: "h3",
    label: "Subheading"
  },
  {
    id: "paragraph",
    tag: "p",
    label: "Paragraph"
  }
];

type Props = {
  onSelect: Function
  close: Function
  position: {
    x: number,
    y: number
  }
}

const SelectMenu: React.FC<Props> = ({ onSelect, close, position }: Props) => {
  const [items, setItems] = useState(allowedTags);
  const [selectedItem, setSelectedItem] = useState(0);
  const [command, setCommand] = useState('');

  const keyDownHandler = (e) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        onSelect(items[selectedItem].tag);
        break;
      case "Backspace":
        if (!command) close();
        setCommand(command.substring(0, command.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        const prevSelected = selectedItem === 0 ? items.length - 1 : selectedItem - 1;
        setSelectedItem(prevSelected);
        break;
      case "ArrowDown":
      case "Tab":
        e.preventDefault();
        const nextSelected = selectedItem === items.length - 1 ? 0 : selectedItem + 1;
        setSelectedItem(nextSelected)
        break;
      default:
        setCommand(command + e.key);
        break;
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);

    return document.removeEventListener("keydown", keyDownHandler);
  }, [])

  useEffect(() => {
    const newItems = matchSorter(allowedTags, command, { keys: ["tag"] });
    setItems(newItems);
  }, [command])

  const x = position.x;
  const y = position.y - MENU_HEIGHT;
  const positionAttributes = { top: y, left: x };

    return (
      <div className="SelectMenu" style={positionAttributes}>
        <div className="Items">
          {items.map((item, key) => {
            const isSelected = items.indexOf(item) === selectedItem;
            return (
              <div
                className={isSelected ? "Selected" : null}
                key={key}
                role="button"
                tabIndex={0}
                onClick={() => onSelect(item.tag)}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default SelectMenu;