import { observer } from "mobx-react-lite";
import { ImageStore, IImageStoreProps } from "./store";
import { ISettingComponent } from "editor";

let ButtonSetting: ISettingComponent<IImageStoreProps, ImageStore> = ({
  props,
  store,
}) => {
  return (
    <div>
      <span>图片链接 :</span>
      <input
        value={props.src}
        onChange={(e) => {
          props.src = e.target.value;
        }}
      ></input>
    </div>
  );
};

ButtonSetting = observer(ButtonSetting);

export default ButtonSetting;
