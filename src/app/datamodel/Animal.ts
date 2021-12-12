export interface Self {
  href: string;
}

export interface AnimalEntity2 {
  href: string;
}

export interface ActionEntity2 {
  href: string;
}

export interface Links {
  self: Self;
  animalEntity: AnimalEntity2;
  actionEntity: ActionEntity2;
}

export interface ActionEntity {
  id:number
  date: Date;
  description: string;
  actionType: string;
  animalId:number;
  issuerEmail: string;

}

export interface AnimalEntity {
  id:number;
  name: string;
  animalType: string;
  age: number;
  description: string;
  status:string;
  _links: Links;
}

export interface Embedded {
  animalEntities: AnimalEntity[];
  actionEntities: ActionEntity[];
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



