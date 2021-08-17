import { observer } from "mobx-react-lite";
import React from "react";
import { useEditorContext } from "editor";

interface ISettingProps {}

let Setting: React.FC<ISettingProps> = (props) => {
  const editorStore = useEditorContext();
  const ComponentSetting = editorStore.getActiveSetting();
  console.log(ComponentSetting)
  return (
    <div className="nes-container with-title">
      setting 
      {editorStore.activeComponent && ComponentSetting && (
        <ComponentSetting
          props={editorStore.activeComponent?.props}
          store={editorStore.activeComponent}
        />
      )}
    </div>
  );
};
Setting = observer(Setting);

export { Setting };
