import { Card } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";
import { useEditorContext } from "@toy20/store";

interface ISettingProps {}

let Setting: React.FC<ISettingProps> = (props) => {
  const editorStore = useEditorContext();
  const ComponentSetting = editorStore.getActiveSetting();
  console.log(ComponentSetting)
  return (
    <Card title="设置" style={{minWidth:320}}>
      {editorStore.activeComponent && ComponentSetting && (
        <ComponentSetting
          props={editorStore.activeComponent?.props}
          store={editorStore.activeComponent}
        />
      )}
    </Card>
  );
};
Setting = observer(Setting);

export { Setting };
