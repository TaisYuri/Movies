import React from "react";
import { TouchableOpacity } from "react-native";
import { Title, Link, Container } from "./styles";

interface IHeaderType {
  title: string;
  textLink?: string;
  link?: () => void;
}

export function HeaderType({ title, link, textLink }: IHeaderType) {
  return (
    <Container>
      <Title>{title}</Title>
      <TouchableOpacity onPress={link}>
        <Link>{textLink}</Link>
      </TouchableOpacity>
    </Container>
  );
}


