import React from 'react';
import { TagButton, TagText } from './styles';

interface ITag {
  label: string;
}

export function Tag({ label }: ITag): JSX.Element {
  return (
    <TagButton>
      <TagText>{label}</TagText>
    </TagButton>
  );
}
