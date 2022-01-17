import { iInventory } from "./types";

export const data: iInventory[] = [
  {
    id: "5f0609c43425bd001737d38e",
    name: "My Stuff",
  },
  {
    id: "1db3276d-f7de-4a0f-8c8f-9dbadf510ef7",
    parent: "5f0609c43425bd001737d38e",
    name: "Home",
    meta: [{ Address: "2480 Mohawk Dr, Birmingham, Al, 35217" }],
  },
  {
    id: "1f07ea9d-20a6-476b-89e7-b78b6531ff91",
    parent: "1db3276d-f7de-4a0f-8c8f-9dbadf510ef7",
    name: "Cameras",
  },
  {
    id: "02bedc71-fbb0-4f35-89b6-336d7d0f190b",
    parent: "1f07ea9d-20a6-476b-89e7-b78b6531ff91",
    name: "Sony a7SIII",
    imgUrl:
      "https://denniscalvert.s3.amazonaws.com/5f0609c43425bd001737d38e/uploads/a7siii.jpeg",
    description: `Optimized video, optimized sensitivity, optimized speed, the Sony a7S III raises the bar for what a full-frame mirrorless camera is capable of. A revised 12.1MP Exmor R BSI CMOS sensor and updated BIONZ XR image processor offer faster performance, improved noise reduction, and a wider dynamic range, along with UHD 4K 120p video recording and internal 10-bit 4:2:2 sampling.
<br />
              Video is the primary application of the a7S III, and improvements to the sensor and processor enable faster readout speeds and greatly reduced rolling shutter, along with high-bitrate internal recording, 16-bit raw output via the full-size HDMI port, and flexible control over motion with variable frame rate selection. The a7S III also does away with recording time limits and incorporates HLG for direct HDR production as well as S-Log2/S-Log3 gamma profiles for advanced HDR production with`,
  },
  {
    id: "0664d3eb-e414-4119-93a7-cdd7c6d9fe12",
    name: "Sony a7RIII",
    imgUrl:
      "https://denniscalvert.s3.amazonaws.com/5f0609c43425bd001737d38e/uploads/10644548623_f184c98e94_b.jpg",
  },
  {
    id: "aa94e080-bebf-4eee-85bb-68b08af931c9",
    name: "Kodak Brownie",
    imgUrl:
      "https://denniscalvert.s3.amazonaws.com/5f0609c43425bd001737d38e/uploads/10644548623_f184c98e94_b.jpg",
  },
  {
    id: "c282f8f4-18a0-42c1-9e62-a6fb4ddcff12",
    name: "Canon 5",
    imgUrl:
      "https://denniscalvert.s3.amazonaws.com/5f0609c43425bd001737d38e/uploads/10644548623_f184c98e94_b.jpg",
  },

  {
    id: "dfefca96-9294-40aa-bbc9-513b9b13ce33",
    parent: "1f07ea9d-20a6-476b-89e7-b78b6531ff91",
    name: "Comic Books",
  },
  {
    id: "ea79963d-9283-4a84-bbe1-0a8474d8d253",
    parent: "dfefca96-9294-40aa-bbc9-513b9b13ce33",
    name: "Spider-Man",
    meta: [{ "#": 298 }],
    imgUrl:
      "https://denniscalvert.s3.us-east-2.amazonaws.com/5f0609c43425bd001737d38e/uploads/clean.jpg",
  },
  {
    id: "12863545-dae5-4b59-b124-96c951d3ccc7",
    parent: "dfefca96-9294-40aa-bbc9-513b9b13ce33",
    name: "Spider-Man",
    meta: [{ "#": 299 }],
    imgUrl:
      "https://denniscalvert.s3.us-east-2.amazonaws.com/5f0609c43425bd001737d38e/uploads/clean.jpg",
  },
  {
    id: "0f6d50d3-b1c0-41a5-a2d6-82a99174d4c5",
    parent: "dfefca96-9294-40aa-bbc9-513b9b13ce33",
    name: "Spider-Man",
    meta: [{ "#": 300 }, { value: "1800" }],
    imgUrl:
      "https://denniscalvert.s3.us-east-2.amazonaws.com/5f0609c43425bd001737d38e/uploads/clean.jpg",
  },
  {
    id: "b52ec9d7-f76e-4d73-9d04-22eb6ad79055",
    parent: "dfefca96-9294-40aa-bbc9-513b9b13ce33",
    name: "Spider-Man",
    meta: [{ "#": 301 }],
    imgUrl:
      "https://denniscalvert.s3.us-east-2.amazonaws.com/5f0609c43425bd001737d38e/uploads/clean.jpg",
  },
];
