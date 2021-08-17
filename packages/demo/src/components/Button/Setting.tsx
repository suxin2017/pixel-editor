import { observer } from "mobx-react-lite";
import { AddStore, IAddStoreProps } from "./store";
import { ISettingComponent } from "../../../../editor/src/componentList";
import { Row } from "../../packages/nes/layout/Row";
import { Col } from "../../packages/nes/layout/Col";

let ButtonSetting: ISettingComponent<IAddStoreProps, AddStore> = ({
  props,
  store,
}) => {
  return (
    <Row gutter={[0, 8]} wrapper>
      <Col span={12}>
        <span>内容：</span>
        <input
          value={props.value}
          onChange={(e) => {
            props.value = e.target.value;
          }}
        ></input>
      </Col>
      <Col span={12}>
        <span>背景颜色 :</span>
        <input
          type="color"
          value={props.style?.background}
          onChange={(e) => {
            console.log(props.style);
            if (props.style) {
              props.style.background = e.target.value;
            }
          }}
        ></input>
      </Col>
    </Row>
  );
};

ButtonSetting = observer(ButtonSetting);

export default ButtonSetting;
