/** @jsxImportSource @emotion/react */
import { CSSObject, css } from "@emotion/react";
import React, { CSSProperties, useMemo, useState } from "react";
type Toption = { label: string; value: string; style?: CSSObject };

const SelectBar = ({
  placeholder,
  options = [],
  value,
  onSelect,
  disabled,
  containerStyle,
}: {
  placeholder?: string;
  options?: Toption[];
  value?: string;
  onSelect?: (value: string) => void;
  disabled?: boolean;
  containerStyle?: CSSProperties;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Toption | null>(null);

  const toggleOptions = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Toption) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const selectBarStyles = css`
    position: relative;
    font-family: Arial, sans-serif;
  `;

  const selectedOptionStyles = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border: 1px solid #dfe5eb;
    border-radius: 32px;
    cursor: pointer;
    position: relative;
    user-select: none;

    .arrow {
      border: solid #333;
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 3px;
      margin-left: 15px;
      transition: transform 0.3s;
    }

    .up {
      transform: rotate(-135deg);
    }

    .down {
      transform: rotate(45deg);
    }
  `;

  const optionsStyles = css`
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    z-index: 1;
    display: ${isOpen ? "block" : "none"};

    .option {
      padding: 10px;
      cursor: pointer;

      &:hover {
        background-color: #f0f0f0;
      }
    }
  `;

  const placeholderMemo = useMemo(() => {
    return placeholder || "Select an option";
  }, [placeholder]);

  return (
    <div css={selectBarStyles} className="select-bar">
      <div
        css={selectedOptionStyles}
        onClick={toggleOptions}
        style={{ ...containerStyle }}
      >
        {selectedOption?.label || placeholderMemo}
        <span className={`arrow ${isOpen ? "up" : "down"}`}></span>
      </div>
      {isOpen && options.length > 0 && (
        <div css={optionsStyles} className="options">
          {options.map((option) => (
            <div
              key={option.value}
              className="option"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectBar;
