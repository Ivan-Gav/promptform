import React from "react";
import Select, { components } from "react-select";
import type { Props as SelectProps, MenuListProps } from "react-select";
import { FixedSizeList } from "react-window";
import type { TOption } from "../model/types";

// Custom MenuList for virtualization
const ITEM_HEIGHT = 44;
const MAX_VISIBLE = 7;
const MENU_PADDING = 16; // react-select default menu vertical padding
const LIST_HEIGHT = ITEM_HEIGHT * MAX_VISIBLE;

const VirtualizedMenuList = (props: MenuListProps<TOption>) => {
  const { options, children } = props;
  const itemCount = options.length;
  const height = Math.min(itemCount, MAX_VISIBLE) * ITEM_HEIGHT - MENU_PADDING;
  const childrenArray = Array.isArray(children)
    ? children
    : React.Children.toArray(children);

  return (
    <components.MenuList {...props}>
      <FixedSizeList
        height={height}
        itemCount={itemCount}
        itemSize={ITEM_HEIGHT}
        width="100%"
  style={{ overflowY: "auto", pointerEvents: "auto" }}
        >
        {({ index, style }) => {
          const option = options[index];
          const label =
            typeof option.label === "string"
              ? option.label
              : String(option.label);
          return (
            <div
              style={{
                ...style,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                padding: "0 12px",
                boxSizing: "border-box",
                cursor: "pointer",
              }}
              title={label}
            >
              {childrenArray[index]}
            </div>
          );
        }}
      </FixedSizeList>
    </components.MenuList>
  );
};

// VirtualizedSelect component
const VirtualizedSelect = (props: SelectProps<TOption, true>) => {
  return (
    <Select
      {...props}
      components={{
        ...props.components,
        MenuList: VirtualizedMenuList,
      }}
      menuShouldScrollIntoView={false}
      filterOption={null}
      styles={{
        ...props.styles,
        menu: (base) => ({
          ...base,
          maxHeight: `${LIST_HEIGHT}px`,
          overflowY: "hidden",
        }),
        option: (base) => ({
          ...base,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }),
      }}
    />
  );
};

export default VirtualizedSelect;
