import type { ReactNode } from "react";
import type { ButtonProps } from "@mui/material";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import { cn } from "@/lib/utils/utils";

const buttonColors = {
  light: "#ffffff",
  systemBlack900: "#0d0d0d",
  systemBlack200: "#1a1a1a",
  systemBlack100: "#2a2a2a",
  systemBlack300: "#1f1f1f",
  systemGrey600: "#737373",
  systemGrey200: "#404040",
  sysMint: "#5dcea4",
  systemCoolGray900: "#1e293b",
  coolGray: "#4a4a4a",
} as const;

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    transparent: true;
    mint: true;
    dark: true;
    underline: true;
    "gray-900": true;
    icon: true;
    rounded: true;
  }
}

const buttonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "@media (max-width: 499px)": {
            fontSize: "14px",
            padding: "10px 12px",
          },
        },
      },
      variants: [
        {
          props: { variant: "primary" },
          style: {
            backgroundColor: buttonColors.light,
            color: buttonColors.systemBlack200,
            borderRadius: "2px",
            padding: "12px 16px",
            fontSize: "16px",
            fontWeight: 400,
            fontFamily: "PUBLIC SANS",
            textTransform: "none",
            minHeight: "40px",
            lineHeight: "0",
            border: `1px solid transparent`,

            ":hover": {
              backgroundColor: buttonColors.systemBlack200,
              color: buttonColors.light,
              borderColor: buttonColors.light,
            },

            "&.Mui-disabled": {
              backgroundColor: buttonColors.systemBlack100,
              color: buttonColors.systemGrey600,
              borderColor: buttonColors.systemBlack100,
              cursor: "not-allowed",
            },
          },
        },
        {
          props: { variant: "secondary" },
          style: {
            backgroundColor: buttonColors.systemBlack100,
            color: buttonColors.light,
            borderRadius: "2px",
            padding: "12px 16px",
            fontSize: "16px",
            fontWeight: 400,
            textTransform: "none",
            fontFamily: "PUBLIC SANS",
            minHeight: "40px",
            lineHeight: "0",
            border: `1px solid ${buttonColors.systemBlack100}`,

            ":hover": {
              backgroundColor: buttonColors.systemBlack200,
              color: buttonColors.light,
              borderColor: buttonColors.light,
            },

            "&.Mui-disabled": {
              backgroundColor: buttonColors.systemBlack200,
              color: buttonColors.systemGrey600,
              borderColor: buttonColors.systemBlack200,
              cursor: "not-allowed",
            },
          },
        },
        {
          props: { variant: "mint" },
          style: {
            backgroundColor: buttonColors.sysMint,
            color: "#131313",
            borderRadius: "2px",
            padding: "12px 16px",
            fontSize: "16px",
            fontWeight: 400,
            fontFamily: "PUBLIC SANS",
            textTransform: "none",
            minHeight: "40px",
            lineHeight: "0",
            border: "1px solid transparent",

            ":hover": {
              backgroundColor: buttonColors.systemBlack900,
              color: buttonColors.light,
              borderColor: buttonColors.light,
            },

            "&.Mui-disabled": {
              backgroundColor: buttonColors.systemGrey200,
              color: buttonColors.systemGrey600,
              borderColor: buttonColors.systemGrey200,
              cursor: "not-allowed",
            },
          },
        },
        {
          props: { variant: "dark" },
          style: {
            backgroundColor: buttonColors.systemBlack900,
            color: "#FFFFFF",
            borderRadius: "2px",
            padding: "10px 12px",
            fontSize: "16px",
            fontWeight: 400,
            fontFamily: "PUBLIC SANS",
            textTransform: "none",
            minHeight: "40px",
            lineHeight: "0",
            border: `1px solid ${buttonColors.systemGrey200}`,

            ":hover": {
              backgroundColor: buttonColors.light,
              color: buttonColors.systemBlack900,
              borderColor: buttonColors.light,
            },

            "&.Mui-disabled": {
              backgroundColor: buttonColors.systemGrey200,
              color: buttonColors.systemGrey600,
              borderColor: buttonColors.systemGrey200,
              cursor: "not-allowed",
            },
          },
        },
        {
          props: { variant: "underline" },
          style: {
            backgroundColor: "transparent",
            color: "#FFFFFF",
            fontSize: "16px",
            fontWeight: 400,
            fontFamily: "PUBLIC SANS",
            textTransform: "none",
            minHeight: "0px",
            lineHeight: "0",

            ":hover": {
              textDecoration: "underline",
            },

            "&.Mui-disabled": {
              color: buttonColors.systemGrey600,
              cursor: "not-allowed",
            },
          },
        },
        {
          props: { variant: "transparent" },
          style: {
            backgroundColor: "transparent",
            color: "#FFFFFF",
            borderRadius: "2px",
            padding: "10px 12px",
            fontSize: "16px",
            fontWeight: 400,
            fontFamily: "PUBLIC SANS",
            textTransform: "none",
            minHeight: "40px",
            lineHeight: "0",
            border: `1px solid ${buttonColors.systemGrey200}`,

            ":hover": {
              backgroundColor: buttonColors.light,
              color: buttonColors.systemBlack200,
              borderColor: buttonColors.light,
            },

            "&.Mui-disabled": {
              backgroundColor: buttonColors.systemGrey200,
              color: buttonColors.systemBlack200,
              borderColor: "transparent",
              cursor: "not-allowed",
            },
          },
        },
        {
          props: { variant: "gray-900" },
          style: {
            backgroundColor: buttonColors.systemCoolGray900,
            color: buttonColors.light,
            borderRadius: "2px",
            padding: "10px 12px",
            fontSize: "16px",
            fontWeight: 400,
            fontFamily: "PUBLIC SANS",
            textTransform: "none",
            minHeight: "40px",
            lineHeight: "0",
            border: `1px solid #B0B0B0`,

            ":hover": {
              backgroundColor: buttonColors.systemCoolGray900,
              borderColor: buttonColors.light,
            },

            "&.Mui-disabled": {
              backgroundColor: "#B0B0B0",
              color: buttonColors.systemBlack200,
              borderColor: "transparent",
              cursor: "not-allowed",
            },
          },
        },

        {
          props: { variant: "icon" },
          style: {
            backgroundColor: "transparent",
            color: "#FFFFFF",
            border: "none",
            padding: "10px 12px !important",
            fontSize: "16px",
            fontWeight: 400,
            fontFamily: "PUBLIC SANS",
            textTransform: "none",
            minHeight: "10px !important",
            minWidth: "10px !important",
            lineHeight: "0",

            "& .MuiButton-startIcon": {
              margin: "0",
            },

            ":hover": {
              backgroundColor: buttonColors.systemBlack300,
            },
          },
        },
        {
          props: { variant: "rounded" },
          style: {
            backgroundColor: buttonColors.systemBlack900,
            border: `1px solid ${buttonColors.coolGray}`,
            color: buttonColors.light,
            borderRadius: "9999px",
            padding: "px",
            fontSize: "16px",
            fontWeight: 400,
            fontFamily: "PUBLIC SANS",
            textTransform: "none",
            minHeight: "30px",
            lineHeight: "0",

            ":hover": {
              backgroundColor: buttonColors.coolGray,
            },
          },
        },
      ],
    },
  },
});

interface StyledButtonProps extends Omit<ButtonProps, "variant"> {
  variant?:
    | "primary"
    | "secondary"
    | "mint"
    | "dark"
    | "transparent"
    | "gray-900"
    | "underline"
    | "icon"
    | "rounded";
  padding?: string;
  fontSize?: string;
  fontWeight?: number;
  children?: ReactNode;
}

export const StyledButton = ({
  children,
  variant = "primary",
  padding = "12px 16px",
  fontSize = "16px",
  fontWeight = 400,
  className,
  ...props
}: StyledButtonProps) => (
  <ThemeProvider theme={buttonTheme}>
    <Button
      suppressHydrationWarning
      variant={variant}
      sx={{
        padding,
        ...(fontSize && { fontSize }),
        ...(fontWeight && { fontWeight }),
      }}
      className={cn("group", className)}
      {...props}
    >
      {children}
    </Button>
  </ThemeProvider>
);
