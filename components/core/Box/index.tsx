import { cn } from "@/utils/classnames";
import { ComponentProps, ElementType, ReactElement } from "react";

export type ValidTags = keyof JSX.IntrinsicElements;

export interface BoxProps<T extends ValidTags = "div"> {
  tag?: T;
  customRef?: ComponentProps<T>["ref"];
  backgroundColor?: `bg-${string}`;
  borderColor?: `border-${string}`;
  boxShadow?: `shadow-${string}`;
  ref?: never;
}

export function Box<T extends ValidTags = "div">({
  backgroundColor,
  borderColor,
  boxShadow,
  className,
  tag,
  customRef,
  ...props
}: BoxProps<T> & JSX.IntrinsicElements[T]): ReactElement {
  const Tag = tag || ("div" as ElementType);
  return (
    <Tag
      {...props}
      ref={customRef}
      className={cn(backgroundColor, borderColor, boxShadow, className)}
    ></Tag>
  );
}
