import { useState } from "react";
import { Button, Collapse } from "antd";
import { data as mockData } from "./data";
import { iMeta } from "./types";

const { Panel } = Collapse;

export const Inventory = () => {
  const [data, setData] = useState(mockData);

  // const findItemNested = (arr, itemId, nestingKey) =>
  //   arr.reduce((a, item) => {
  //     if (a) return a;
  //     if (item.id === itemId) return item;
  //     if (item[nestingKey])
  //       return findItemNested(item[nestingKey], itemId, nestingKey);
  //   }, null);

  // console.log(mockData.flatten());
  const onAddItem = (itemId: string) => {};

  const render: any = (data: any) => {
    return (
      // <Collapse defaultActiveKey={['1']} ghost>
      <Panel
        header={
          <>
            {data.imgUrl && (
              <img
                src={data.imgUrl}
                alt={data.name}
                style={{ width: "20px" }}
              />
            )}
            &nbsp;
            {data.name}
          </>
        }
        key={data.id}
        extra={
          data.meta &&
          data.meta.map((m: iMeta) =>
            Object.keys(m).map((key) => (
              <>
                &nbsp; {key}:{m[key]}
              </>
            ))
          )
        }
      >
        {data.imgUrl && (
          <img src={data.imgUrl} alt={data.name} style={{ width: "100px" }} />
        )}
        {data.description && <div>{data.description}</div>}
        {data.collection && (
          <Collapse ghost>{data.collection.map(render)}</Collapse>
        )}
        {/* <Button onClick={() => onAddItem(data.id)}>Add Item</Button> */}
      </Panel>
      // </Collapse>
    );
  };

  return <Collapse ghost>{render(data)}</Collapse>;
};
