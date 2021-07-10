import classNames from "classnames";
import React from "react";
import { prefix } from "../..";
import "./index.sass";
interface IColProps {
  span?: number;
  flex?: string | number;
  style?: React.CSSProperties
}

export const Col: React.FC<IColProps> = (props) => {
  return (
    <div
      className={classNames(
        prefix("col"),
        props.span && {
          [prefix(`col-${props.span}`)]: true,
        }
      )}
      style={{
        ...props.style,
        flex: props.flex,

      }}
    >
      {props.children}
    </div>
  );
};
