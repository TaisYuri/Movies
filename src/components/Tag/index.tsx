import React from "react";
import { TagButton, TagText } from "./styles";

type ITag ={
  label: string;
} 

export function Tag({label}: ITag) {
  return (
    <TagButton>
      <TagText>{label}</TagText>
    </TagButton>
  );
}

