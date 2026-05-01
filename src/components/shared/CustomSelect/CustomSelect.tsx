"use client";

import Select from "react-select";
import type { StylesConfig, Props as SelectProps } from "react-select";

const selectColors = {
  systemBlack900: "#0d0d0d",
  systemBlack100: "#2a2a2a",
  coolGray: "#4a4a4a",
  systemBlack300: "#1f1f1f",
  light: "#ffffff",
  systemTextWhite100: "rgba(255, 255, 255, 0.6)",
  systemGrey100: "#a3a3a3",
} as const;

export interface CustomSelectOption {
  label: string;
  value: string;
  data?: any;
}

// Helper function to get background based on variant
const getBackgroundByVariant = (variant: string = "default") => {
  const backgrounds = {
    default: selectColors.systemBlack900,
  };
  return (
    backgrounds[variant as keyof typeof backgrounds] || backgrounds.default
  );
};

// Custom theme styles for react-select components
export const customSelectTheme = (
  variant: string = "default",
  menuWidth?: string,
  maxHeight?: string,
  embeddedStyles?: StylesConfig<any, any, any>,
) => ({
  control: (provided: any, state: any) => ({
    ...provided,
    background: getBackgroundByVariant(variant),
    border: `1px solid ${selectColors.systemBlack100}`,
    boxShadow: "none",
    borderRadius: "2px",
    minHeight: "44px",

    "&:hover": {
      borderColor: selectColors.systemBlack100,
    },

    ...embeddedStyles?.control?.(provided, state),
  }),
  menuPortal: (provided: any) => ({
    ...provided,
    zIndex: 9999,
    position: "fixed",
  }),
  menu: (provided: any, _state: any) => ({
    ...provided,
    background: getBackgroundByVariant(variant),
    border: `1px solid ${selectColors.coolGray}`,
    borderRadius: "2px",
    backdropFilter: "blur(10px)",
    zIndex: 9999,
    maxHeight: maxHeight,
    overflow: "hidden",
    position: "absolute",
    right: 0,
    left: "auto",
    transform: "translateX(0)",
    marginTop: "0px",
    ...(menuWidth && {
      width: menuWidth,
      minWidth: menuWidth,
      maxWidth: menuWidth,
    }),
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? selectColors.coolGray
      : state.isFocused
        ? selectColors.systemBlack300
        : selectColors.systemBlack900,
    color: selectColors.light,
    padding: "10px 16px",
    minHeight: "auto",
    whiteSpace: "normal",
    wordWrap: "break-word",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: state.isSelected
        ? selectColors.coolGray
        : selectColors.systemBlack300,
    },
    ...embeddedStyles?.option?.(provided, state),
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    color: selectColors.light,
    fontSize: "16px",
    fontWeight: "300",
    ...embeddedStyles?.singleValue?.(provided, state),
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
    color: selectColors.systemTextWhite100,
    fontSize: "16px",
    ...embeddedStyles?.placeholder?.(provided, state),
  }),
  input: (provided: any, state: any) => ({
    ...provided,
    color: selectColors.systemTextWhite100,
    ...embeddedStyles?.input?.(provided, state),
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    backgroundColor: selectColors.light,
    marginRight: "8px",
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,

    color: selectColors.systemGrey100,

    transform: state.selectProps.menuIsOpen
      ? "rotate(180deg) translateX(10px)"
      : "rotate(0deg)",
    transition: "transform 0.2s ease-in-out",
    padding: "8px 8px 8px 0px",

    "&:hover": {
      color: selectColors.systemGrey100,
    },
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    color: selectColors.light,
  }),
  loadingIndicator: (provided: any) => ({
    ...provided,
    color: selectColors.systemBlack100,
  }),
  noOptionsMessage: (provided: any, state: any) => ({
    ...provided,
    color: selectColors.systemTextWhite100,
    fontSize: "16px",
    ...embeddedStyles?.noOptionsMessage?.(provided, state),
  }),
  menuList: (base: any) => ({
    ...base,
    padding: "0px",
  }),
});

// Reusable CustomSelect component with built-in theme
interface ReactSelectProps extends SelectProps {
  variant?: "default" | "dark" | "light" | "transparent";
  usePortal?: boolean;
  minDate?: string | Date;
  maxDate?: string | Date;
  maxHeight?: string;
  menuWidth?: string;
  onMenuScrollToBottom?: () => void;
}

interface CustomSelectProps extends ReactSelectProps {
  additionalStyles?: StylesConfig<any, any, any>;
  embeddedStyles?: StylesConfig<any, any, any>;
  height?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  variant = "default",
  usePortal = true,
  minDate,
  maxDate,
  maxHeight = "300px",
  onMenuScrollToBottom,
  menuWidth,
  embeddedStyles = {},
  additionalStyles = {},
  height = "",
  ...props
}) => {
  const customSelectStyles: StylesConfig<any, any, any> = {
    ...customSelectTheme(variant, menuWidth, maxHeight, embeddedStyles),
    ...additionalStyles,
  };

  // Handle menu scroll to bottom for infinite loading
  const handleMenuScrollToBottom = () => {
    if (onMenuScrollToBottom) {
      onMenuScrollToBottom();
    }
  };

  return (
    <Select
      styles={customSelectStyles}
      instanceId={props.instanceId || "react-select"}
      formatOptionLabel={(option: any) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            height: height ? height : undefined,
            fontSize: "inherit",
          }}
        >
          <span style={{ fontWeight: "300" }}>{option.label}</span>
        </div>
      )}
      menuPortalTarget={
        usePortal && typeof document !== "undefined" ? document.body : undefined
      }
      menuPosition="fixed"
      menuPlacement="auto"
      onMenuScrollToBottom={handleMenuScrollToBottom}
      {...props}
      // Pass minDate and maxDate to selectProps for custom components
      {...(minDate && { minDate })}
      {...(maxDate && { maxDate })}
    />
  );
};
