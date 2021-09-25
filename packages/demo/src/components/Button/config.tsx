import { IEditorComponent } from "editor";
import ButtonSetting from "./Setting";
import { IAddStoreProps, AddStore } from "./store";
import { Button } from './view';

const componentConfig: IEditorComponent<IAddStoreProps, AddStore> = {
	name: "button",
	icon: (
	  <img src="https://img.icons8.com/ios/50/000000/button2.png" alt="ignore" />
	),
	store: AddStore,
	component: Button,
	initProps: {
	  value: "立即下载",
	  style: {
		background: "#fff",
	  },
	},
	settingComponent: ButtonSetting,
  };
  
export { componentConfig };