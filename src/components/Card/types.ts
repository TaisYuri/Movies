export interface ICard {
    uri: string;
    title: string;
    vote?: string;
    release?: string;
    onPress?: ()=> void;
  }