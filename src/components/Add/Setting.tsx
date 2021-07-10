import React from "react";
import logo from "./logo.svg";
import { observer } from "mobx-react-lite";
import { action, autorun, makeObservable, observable } from "mobx";
import { ComponentStore } from "../../packages/render/store/Component";
import { AddStore, IAddStoreProps } from "./store";
import { ISettingComponent } from "../../packages/editor/componentList";

let ButtonSetting: ISettingComponent<IAddStoreProps, AddStore> = ({
  props,
  store,
}) => {
  return (
    <div>
      <input
        value={props.value}
        onChange={(e) => {
          props.value = e.target.value;
        }}
      ></input>

      <input
        value={props.nest.value}
        onChange={(e) => {
          props.nest.value = e.target.value;
        }}
      ></input>
    </div>
  );
};

ButtonSetting = observer(ButtonSetting);

export default ButtonSetting;
