export interface ICardPerson {
  id: string;
  name: string;
  profilePath: string;
  character: string;
  onPress?: () => void;
}
