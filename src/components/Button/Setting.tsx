import { observer } from "mobx-react-lite";
import { AddStore, IAddStoreProps } from "./store";
import { ISettingComponent } from "../../packages/editor/componentList";
import { Row } from "../../packages/nes/layout/Row";

let ButtonSetting: ISettingComponent<IAddStoreProps, AddStore> = ({
  props,
  store,
}) => {
  return (
    <Row gutter={[0, 8]} wrapper>
      <div>
        内容：
        <input
          value={props.value}
          onChange={(e) => {
            props.value = e.target.value;
          }}
        ></input>
      </div>
      <div>
        嵌套内容：
        <input
          value={props.nest.value}
          onChange={(e) => {
            props.nest.value = e.target.value;
          }}
        ></input>
      </div>
      <div>
        背景颜色 :
        <input
          type="color"
          value={props.style?.background}
          onChange={(e) => {
            console.log(props.style)
            if (props.style) {
              props.style.background = e.target.value;
            }
          }}
        ></input>
      </div>
    </Row>
  );
};

ButtonSetting = observer(ButtonSetting);

export default ButtonSetting;
