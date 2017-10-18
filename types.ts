export interface Musician {
  id: string;
  name: string;
  age: number;
  bandId: string;
}

export interface Band {
  id: string;
  name: string;
}

export type StringMap = { [key: string]: any };
