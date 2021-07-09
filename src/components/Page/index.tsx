import React from "react";
import logo from "./logo.svg";
import { observer } from "mobx-react-lite";
import { action, makeObservable } from "mobx";
import { Component } from "../../packages/render/store/Component";

export class PageStore extends Component<{ value: number }> {
  constructor(initProps: {
    initProps: { value: number };
    name: string;
    children?: Component[];
  }) {
    super(initProps);
    makeObservable(this);
  }
  @action
  increment() {
    this.props.value++;
  }
}

let Page: React.FC<{
  props: { value: number };
  store: PageStore;
}> = ({ props, children, store }) => {
  React.useEffect(() => {
    setTimeout(() => {
      props.value = 123;
    }, 1000);
  }, []);

  return (
    <div>
      pages
      {children}
    </div>
  );
};
Page = observer(Page);

const config = {
  store: PageStore,
  initConfig: {
    name: "page",
    initProps: { value: 0 },
  },
};
export { Page, config };
