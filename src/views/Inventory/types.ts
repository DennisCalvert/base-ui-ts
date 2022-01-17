export interface iMeta {
  [key: string]: string | number;
}

export interface iInventory {
  id: string;
  name?: string;
  description?: string;
  collection?: iInventory[];
  parent?: string;
  imgUrl?: string;
  meta?: iMeta[];
}
