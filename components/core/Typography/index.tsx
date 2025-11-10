import { ReactElement } from "react";
import { Box, BoxProps, ValidTags } from "../Box";
import { cn } from "@/utils/classnames";

type Props<T extends ValidTags = "p"> = {
  align?: "text-left" | "text-center" | "text-right";
  font?: "font-v3" | "font-v3-en";
} & BoxProps<T> &
  JSX.IntrinsicElements[T];

export function Typography<T extends ValidTags = "p">({
  backgroundColor,
  color,
  align,
  className,
  tag,
  children,
  font = "font-v3",
  ...props
}: Props<T>): ReactElement {
  const boxTag = tag || ("p" as T);

  return (
    <Box<T>
      tag={boxTag}
      className={cn(font, color, backgroundColor, align, className)}
      {...props}
    >
      {children}
    </Box>
  );
}
