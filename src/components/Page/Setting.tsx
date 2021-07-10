import React from "react";
import logo from "./logo.svg";
import { observer } from "mobx-react-lite";
import { action, autorun, makeObservable, observable } from "mobx";
import { ComponentStore } from "../../packages/render/store/Component";
import { AddStore } from "./store";

const ButtonSetting: React.FC<{ props: AddStore["props"] }> = ({ props }) => {
  console.log(props);
  return <div>
    place select a component
  </div>;
};


export default ButtonSetting;
