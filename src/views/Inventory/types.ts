export interface iMeta {
  [key: string]: string | number;
}

export interface iInventory {
  id: string;
  name?: string;
  description?: string;
  collection?: iInventory[];
  parentNode?: string;
  imgUrl?: string;
  meta?: iMeta[];
}
