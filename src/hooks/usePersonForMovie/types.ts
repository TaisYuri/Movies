interface DirectorProps {
  id: string;
  name: string;
}

export interface PersonProps {
  id: string;
  name: string;
  profile_path: string;
  character: string;
}

export interface PersonsSchema{
  director: DirectorProps[];
  persons:PersonProps[];
}
