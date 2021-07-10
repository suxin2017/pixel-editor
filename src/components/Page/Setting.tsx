import React from "react";
import { AddStore } from "./store";

const ButtonSetting: React.FC<{ props: AddStore["props"] }> = ({ props }) => {
  console.log(props);
  return <div>
    place select a component
  </div>;
};


export default ButtonSetting;
