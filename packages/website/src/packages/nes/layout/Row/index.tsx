import classNames from "classnames";
import React from "react";
import { prefix } from "../..";
import "./index.sass";

interface IRowProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  gutter?: number | [number, number];
  wrapper?: boolean;
  justify?: React.CSSProperties["justifyContent"];
}

export const Row: React.FC<IRowProps> = (props) => {
  let children = props.children;
  if (props.gutter) {
    children = React.Children.map(props.children, (child: any) => {
      return React.cloneElement(child, {
        ...child.props,
        style: {
          ...child.props?.style,
          paddingLeft:
            typeof props.gutter === "number" ? props.gutter : props.gutter?.[0],
          paddingRight:
            typeof props.gutter === "number" ? props.gutter : props.gutter?.[0],
          paddingTop:
            typeof props.gutter === "number" ? undefined : props.gutter?.[1],
          paddingBottom:
            typeof props.gutter === "number" ? undefined : props.gutter?.[1],
        },
      });
    });
  }

  const gutterStyle = props.gutter
    ? {
        marginLeft: Array.isArray(props.gutter)
          ? -props.gutter[0]
          : -props.gutter,
        marginRight: Array.isArray(props.gutter)
          ? -props.gutter[0]
          : -props.gutter,
        marginTop: Array.isArray(props.gutter) ? -props.gutter[1] : undefined,
        marginBottom: Array.isArray(props.gutter)
          ? -props.gutter[1]
          : undefined,
      }
    : undefined;
  const { gutter, wrapper, justify, ...domProps } = props;
  return (
    <div
      {...domProps}
      className={classNames(prefix("row"))}
      style={{
        ...gutterStyle,
        ...domProps.style,
        flexWrap: props.wrapper ? "wrap" : "nowrap",
        justifyContent: props.justify,
      }}
    >
      {children}
    </div>
  );
};
