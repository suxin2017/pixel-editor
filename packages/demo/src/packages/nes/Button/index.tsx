import classNames from "classnames";
import React from "react";

interface IButtonProps
  extends Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "type"
  > {
  type?: "primary" | "success" | "warning" | "error" | "disabled";
  htmlType?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >["type"];
}

export const Button: React.FC<IButtonProps> = (props) => {
  return (
    <button
      {...props}
      type={props.htmlType}
      className={classNames("nes-btn", {
        [`is-${props.type}`]: true,
      })}
    >
      {props.children}
    </button>
  );
};
