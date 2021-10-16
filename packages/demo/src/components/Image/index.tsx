import { observer } from "mobx-react-lite";
import { ImageStore, IImageStoreProps } from "./store";
import ButtonSetting from "./Setting";
import { IEditorComponent,IComponent } from "store";

let Button: IComponent<IImageStoreProps, ImageStore> = ({
  props,
  children,
  store,
}) => {
  return (
    <div onClick={(e) => {}}>
      <img width={props.width}
        height={props.height}
        src={props.src}
        alt="img" />
    </div>
  );
};
Button = observer(Button);

const componentConfig: IEditorComponent<IImageStoreProps, ImageStore> = {
  name: "image",
  icon: (
    <img src="https://img.icons8.com/dotty/80/000000/image--v1.png" alt="icon" width={64}/>
  ),
  store: ImageStore,
  component: Button,
  initProps: {
    width: '100%',
    height: '100%',
    src: "https://img.88icon.com/download/jpg/20200819/2210309e15cb8b01fe45b3739e015cf7_512_398.jpg!88con",
  },
  settingComponent: ButtonSetting,
};

export default componentConfig;
