export interface Self {
  href: string;
}

export interface AnimalEntity2 {
  href: string;
}

export interface Links {
  self: Self;
  animalEntity: AnimalEntity2;
}

export interface AnimalEntity {
  id:number;
  name: string;
  animalType: string;
  age: number;
  description: string;
  _links: Links;
}

export interface Embedded {
  animalEntities: AnimalEntity[];
}

export interface First {
  href: string;
}

export interface SelfPage {
  href: string;
}

export interface Next {
  href: string;
}

export interface Last {
  href: string;
}

export interface Profile {
  href: string;
}

export interface PagingLinks {
  first: First;
  self: SelfPage;
  next: Next;
  last: Last;
  profile: Profile;
}

export interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface RootObject {
  _embedded: Embedded;
  _links: PagingLinks;
  page: Page;
}



