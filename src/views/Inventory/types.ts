export interface iMeta {
  [key: string]: string;
}

export interface iInventory {
  id: string;
  name?: string;
  description?: string;
  collection?: iInventory[];
  parentId?: string;
  imgUrl?: string;
  meta?: iMeta[];
}
