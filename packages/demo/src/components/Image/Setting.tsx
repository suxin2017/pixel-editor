import { observer } from "mobx-react-lite";
import { ImageStore, IImageStoreProps } from "./store";
import { ISettingComponent } from "store";
import { Form, Input } from 'antd';

let ButtonSetting: ISettingComponent<IImageStoreProps, ImageStore> = ({
  props,
  store,
}) => {
  return (
    <Form layout="vertical">
      <Form.Item label="图片链接">
        <Input
          value={props.src}
          onChange={(e) => {
            props.src = e.target.value;
          }}
        ></Input>
      </Form.Item>
    </Form>
  );
};

ButtonSetting = observer(ButtonSetting);

export default ButtonSetting;
