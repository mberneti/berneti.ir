import { ReactElement } from "react";
import { Box, BoxProps, ValidTags } from "../Box";
import { cn } from "@/utils/classnames";

export type FlexProps<T extends ValidTags = "div"> = {
  display?: "flex" | "inline-flex";
  spacing?:
    | "space-x-1 space-y-1"
    | "space-x-2 space-y-2"
    | "space-x-3 space-y-3"
    | "space-x-4 space-y-4"
    | "space-x-5 space-y-5"
    | "space-x-6 space-y-6";
  xSpacing?:
    | "space-x-1"
    | "space-x-2"
    | "space-x-3"
    | "space-x-4"
    | "space-x-5"
    | "space-x-6"
    | "space-x-7"
    | "space-x-8";
  ySpacing?:
    | "space-y-1"
    | "space-y-2"
    | "space-y-3"
    | "space-y-4"
    | "space-y-5"
    | "space-y-6"
    | "space-y-7"
    | "space-y-8"
    | "space-y-9"
    | "space-y-10";
  wrap?: "flex-wrap" | "flex-wrap-reverse" | "flex-nowrap";
  flexDirection?:
    | "flex-row"
    | "flex-row-reverse"
    | "flex-col"
    | "flex-col-reverse";
  justifyContent?:
    | "justify-normal"
    | "justify-start"
    | "justify-end"
    | "justify-center"
    | "justify-between"
    | "justify-around"
    | "justify-evenly"
    | "justify-stretch";
  alignItems?:
    | "items-start"
    | "items-end"
    | "items-center"
    | "items-baseline"
    | "items-stretch";
  alignContent?:
    | "content-normal"
    | "content-start"
    | "content-end"
    | "content-center"
    | "content-between"
    | "content-around"
    | "content-evenly"
    | "content-stretch";
} & BoxProps<T>;

export function Flex<T extends ValidTags = "div">({
  display = "flex",
  xSpacing,
  ySpacing,
  wrap,
  flexDirection,
  justifyContent,
  alignItems,
  tag,
  alignContent,
  className,
  children,
  ...props
}: FlexProps<T> & JSX.IntrinsicElements[T]): ReactElement {
  const boxTag = tag || ("div" as T);
  return (
    <Box<T>
      tag={boxTag}
      className={cn(
        display,
        xSpacing,
        ySpacing,
        wrap,
        flexDirection,
        justifyContent,
        alignItems,
        alignContent,
        {
          "space-y-reverse": flexDirection === "flex-col-reverse",
          "space-x-reverse":
            flexDirection !== "flex-row-reverse" &&
            flexDirection !== "flex-col" &&
            flexDirection !== "flex-col-reverse",
        },
        className
      )}
      {...props}
    >
      {children}
    </Box>
  );
}
