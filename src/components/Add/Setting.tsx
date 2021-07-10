import { observer } from "mobx-react-lite";
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
