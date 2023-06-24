interface DirectorProps {
  id: string;
  name: string;
  profilePath: string;
}

export interface PersonProps {
  id: string;
  name: string;
  profilePath: string;
  character: string;
}

export interface PersonsSchema {
  director: DirectorProps[];
  persons: PersonProps[];
}
