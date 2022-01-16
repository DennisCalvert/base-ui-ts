import { type } from "os";

interface iMeta {
  [key: string]: string | number;
}

interface iCollectionItem {
  id: string;
  name: string;
  descirption?: string;
  imgUrl?: string;
  meta?: iMeta[];
}
interface iColection {
  id: string;
  name?: string;
  description?: string;
  items?: iCollectionItem[];
  meta?: iMeta[];
}

interface iLocation {
  id: string;
  geo?: { lat: string; long: string };
  name?: string;
  description?: string;
  collections?: iColection[];
  meta?: iMeta[];
}

interface iInventoryXXX {
  id: string;
  name?: string;
  description?: string;
  locations?: iLocation[];
  meta?: iMeta[];
}

interface iInventory {
  id: string;
  name?: string;
  description?: string;
  collection?: iInventory[];
  imgUrl?: string;
  meta?: iMeta[];
}

const dataXXX: any = {
  id: "5f0609c43425bd001737d38e",
  name: "My Stuff",
  locations: [
    {
      id: "1db3276d-f7de-4a0f-8c8f-9dbadf510ef7",
      name: "Home",
      collections: [
        {
          id: "1f07ea9d-20a6-476b-89e7-b78b6531ff91",
          name: "Cameras",
          items: [
            {
              id: "02bedc71-fbb0-4f35-89b6-336d7d0f190b",
              name: "Sony a7SIII",
              imgUrl:
                "https://denniscalvert.s3.amazonaws.com/5f0609c43425bd001737d38e/uploads/10644548623_f184c98e94_b.jpg",
            },
            {
              id: "02bedc71-fbb0-4f35-89b6-336d7d0f190b",
              name: "Sony a7RIII",
              imgUrl:
                "https://denniscalvert.s3.amazonaws.com/5f0609c43425bd001737d38e/uploads/10644548623_f184c98e94_b.jpg",
            },
            {
              id: "02bedc71-fbb0-4f35-89b6-336d7d0f190b",
              name: "Kodak Brownie",
              imgUrl:
                "https://denniscalvert.s3.amazonaws.com/5f0609c43425bd001737d38e/uploads/10644548623_f184c98e94_b.jpg",
            },
            {
              id: "02bedc71-fbb0-4f35-89b6-336d7d0f190b",
              name: "Canon 5",
              imgUrl:
                "https://denniscalvert.s3.amazonaws.com/5f0609c43425bd001737d38e/uploads/10644548623_f184c98e94_b.jpg",
            },
          ],
        },
        {
          id: "1f07ea9d-20a6-476b-89e7-b78b6531ff91",
          name: "Comic Books",
          items: [
            {
              id: "02bedc71-fbb0-4f35-89b6-336d7d0f190b",
              name: "Spider-Man",
              meta: [{ issue: 298 }],
              imgUrl:
                "https://denniscalvert.s3.us-east-2.amazonaws.com/5f0609c43425bd001737d38e/uploads/clean.jpg",
            },
            {
              id: "02bedc71-fbb0-4f35-89b6-336d7d0f190b",
              name: "Spider-Man",
              meta: [{ issue: 299 }],
              imgUrl:
                "https://denniscalvert.s3.us-east-2.amazonaws.com/5f0609c43425bd001737d38e/uploads/clean.jpg",
            },
            {
              id: "02bedc71-fbb0-4f35-89b6-336d7d0f190b",
              name: "Spider-Man",
              meta: [{ issue: 300 }],
              imgUrl:
                "https://denniscalvert.s3.us-east-2.amazonaws.com/5f0609c43425bd001737d38e/uploads/clean.jpg",
            },
            {
              id: "02bedc71-fbb0-4f35-89b6-336d7d0f190b",
              name: "Spider-Man",
              meta: [{ issue: 301 }],
              imgUrl:
                "https://denniscalvert.s3.us-east-2.amazonaws.com/5f0609c43425bd001737d38e/uploads/clean.jpg",
            },
          ],
        },
      ],
    },
  ],
};

const data: iInventory = {
  id: "5f0609c43425bd001737d38e",
  name: "My Stuff",
  collection: [
    {
      id: "1db3276d-f7de-4a0f-8c8f-9dbadf510ef7",
      name: "Home",
      collection: [
        {
          id: "1f07ea9d-20a6-476b-89e7-b78b6531ff91",
          name: "Cameras",
          collection: [
            {
              id: "02bedc71-fbb0-4f35-89b6-336d7d0f190b",
              name: "Sony a7SIII",
              imgUrl:
                "https://denniscalvert.s3.amazonaws.com/5f0609c43425bd001737d38e/uploads/10644548623_f184c98e94_b.jpg",
            },
            {
              id: "02bedc71-fbb0-4f35-89b6-336d7d0f190b",
              name: "Sony a7RIII",
              imgUrl:
                "https://denniscalvert.s3.amazonaws.com/5f0609c43425bd001737d38e/uploads/10644548623_f184c98e94_b.jpg",
            },
            {
              id: "02bedc71-fbb0-4f35-89b6-336d7d0f190b",
              name: "Kodak Brownie",
              imgUrl:
                "https://denniscalvert.s3.amazonaws.com/5f0609c43425bd001737d38e/uploads/10644548623_f184c98e94_b.jpg",
            },
            {
              id: "02bedc71-fbb0-4f35-89b6-336d7d0f190b",
              name: "Canon 5",
              imgUrl:
                "https://denniscalvert.s3.amazonaws.com/5f0609c43425bd001737d38e/uploads/10644548623_f184c98e94_b.jpg",
            },
          ],
        },
        {
          id: "1f07ea9d-20a6-476b-89e7-b78b6531ff91",
          name: "Comic Books",
          collection: [
            {
              id: "02bedc71-fbb0-4f35-89b6-336d7d0f190b",
              name: "Spider-Man",
              meta: [{ issue: 298 }],
              imgUrl:
                "https://denniscalvert.s3.us-east-2.amazonaws.com/5f0609c43425bd001737d38e/uploads/clean.jpg",
            },
            {
              id: "02bedc71-fbb0-4f35-89b6-336d7d0f190b",
              name: "Spider-Man",
              meta: [{ issue: 299 }],
              imgUrl:
                "https://denniscalvert.s3.us-east-2.amazonaws.com/5f0609c43425bd001737d38e/uploads/clean.jpg",
            },
            {
              id: "02bedc71-fbb0-4f35-89b6-336d7d0f190b",
              name: "Spider-Man",
              meta: [{ issue: 300 }],
              imgUrl:
                "https://denniscalvert.s3.us-east-2.amazonaws.com/5f0609c43425bd001737d38e/uploads/clean.jpg",
            },
            {
              id: "02bedc71-fbb0-4f35-89b6-336d7d0f190b",
              name: "Spider-Man",
              meta: [{ issue: 301 }],
              imgUrl:
                "https://denniscalvert.s3.us-east-2.amazonaws.com/5f0609c43425bd001737d38e/uploads/clean.jpg",
            },
          ],
        },
      ],
    },
  ],
};

const render: any = (data: any) => {
  return (
    <>
      <div>{data.name}</div>
      <div>{data.description}</div>
      <div>{data.collection && data.collection.map(render)}</div>
    </>
  );
};

export const Inventory = () => {
  const t = render(data);
  return t;
};
