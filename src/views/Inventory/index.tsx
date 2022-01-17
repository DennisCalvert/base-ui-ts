import { useState } from "react";
import { Button, Collapse } from "antd";
import { data as mockData } from "./flatData";
import { iMeta } from "./types";

const { Panel } = Collapse;

export const Inventory = () => {
  const [data, setData] = useState(mockData);

  const onAddItem = (itemId: string) => {
    setData(
      data.concat([
        {
          name: "test",
          id: Date.now().toString(),
          parentNode: itemId,
        },
      ])
    );
  };

  const onDeleteItem = (id: string) => {
    setData(data.filter((i) => i.id !== id));
  };

  const render: any = (id: string) => {
    const item = data.find((i) => i.id === id);
    if (!item) return null;

    const children = data.filter((i) => i.parentNode === id).map((i) => i.id);

    return (
      <Panel
        key={id}
        header={
          <>
            {item?.imgUrl && (
              <img
                src={item?.imgUrl}
                alt={item?.name}
                style={{ width: "20px" }}
              />
            )}
            &nbsp;
            {item?.name}
          </>
        }
        extra={
          <>
            {item?.meta &&
              item?.meta.map((m: iMeta) =>
                Object.keys(m).map((key) => (
                  <span key={key}>
                    &nbsp; {key}:{m[key]}
                  </span>
                ))
              )}
            <Button onClick={() => onAddItem(id)} size="small" shape="circle">
              +
            </Button>{" "}
            <Button
              onClick={() => onDeleteItem(id)}
              size="small"
              shape="circle"
              danger
            >
              X
            </Button>
          </>
        }
      >
        {item?.imgUrl && (
          <img src={item?.imgUrl} alt={item?.name} style={{ width: "100px" }} />
        )}
        {item?.description && <div>{item?.description}</div>}
        {children && <Collapse ghost>{children?.map(render)}</Collapse>}
      </Panel>
    );
  };

  const parent = data.find((i) => !i.hasOwnProperty("parentNode"));

  return (
    <Collapse defaultActiveKey={[parent?.id || ""]} ghost>
      {parent && render(parent.id)}
    </Collapse>
  );
};
