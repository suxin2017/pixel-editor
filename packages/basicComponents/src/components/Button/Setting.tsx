import { observer } from "mobx-react-lite";
import { AddStore, IAddStoreProps } from "./store";
import { ISettingComponent } from "@toy20/store";
import { Col, Input, Row, Form } from "antd";

let ButtonSetting: ISettingComponent<IAddStoreProps, AddStore> = ({
  props,
  store,
}) => {
  return (
    <Form>
      <Form.Item label="内容">
        <Input
          value={props.value}
          onChange={(e) => {
            props.value = e.target.value;
          }}
        ></Input>
      </Form.Item>
      <Form.Item label="背景颜色">
        <Input
          type="color"
          value={props.style?.background}
          onChange={(e) => {
            console.log(props.style);
            if (props.style) {
              props.style.background = e.target.value;
            }
          }}
        ></Input>
      </Form.Item>
    </Form>
  );
};

ButtonSetting = observer(ButtonSetting);

export default ButtonSetting;
