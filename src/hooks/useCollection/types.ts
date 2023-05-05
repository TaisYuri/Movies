export interface ICollectionSchema {
    id: string;
    parts: collectionItems[];
  }

export interface collectionItems{
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
} 