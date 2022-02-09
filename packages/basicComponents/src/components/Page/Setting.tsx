import React from "react";
import { ContainerStore } from "./store";

const ButtonSetting: React.FC<{ props: ContainerStore["props"] }> = ({ props }) => {
  return <div>
   这是一个容器节点
  </div>;
};


export default ButtonSetting;
