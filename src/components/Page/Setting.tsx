import React from "react";
import { ContainerStore } from "./store";

const ButtonSetting: React.FC<{ props: ContainerStore["props"] }> = ({ props }) => {
  console.log(props);
  return <div>
    please select a component
  </div>;
};


export default ButtonSetting;
