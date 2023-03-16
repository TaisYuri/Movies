export interface ICardPerson {
    id: string;
    name: string;
    profile_path: string;
    character: string;
    onPress?: () => void;
  }