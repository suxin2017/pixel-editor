import React from "react";
import logo from "./logo.svg";
import { observer } from "mobx-react-lite";
import { action, autorun, makeObservable, observable } from "mobx";
import { Component } from "../../packages/render/store/Component";
import { AbstractHistory } from "../../packages/editor/history";

export class AddProps extends AbstractHistory<{ value: string }> {
  constructor(initProps: {
    initProps: { value: string };
    name: string;
    children?: Component[];
  }) {
    super(initProps);
    makeObservable(this);
    autorun(() => console.log(this.props.value));

  }

  @action
  increment() {
    this.props.value = "";
    this.push();
  }
}

let Add: React.FC<{
  props: { value: number };
  store: AddProps;
}> = ({ props, children, store }) => {
  React.useEffect(() => {
    setTimeout(() => {
      props.value = 123;
    }, 1000);
  }, []);

  return (
    <div onClick={(e) => {}}>
      <button
        onClick={() => {
          if (store.parent) {
            store.getParent<AddProps>()?.increment();
          }
        }}
      >
        chang parent value
      </button>
      <br />
      {props.value}
      <br />
      {children}
    </div>
  );
};
Add = observer(Add);

const config = {
  store: AddProps,
  initConfig: {
    name: "add",
    initProps: { value: "" },
  },
};
let Setting: React.FC<{ props: AddProps["props"] }> = ({ props }) => {
  return (
    <div>
      {props.value}
      <input
        value={props.value}
        onChange={(e) => {
          props.value = e.target.value;
        }}
      ></input>
    </div>
  );
};
Setting = observer(Setting);
export { Add, config, Setting };
