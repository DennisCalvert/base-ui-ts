import { useState } from "react";
import { Button, Collapse, Drawer } from "antd";
import {
  EditOutlined,
  FileAddOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { data as mockData } from "./flatData";
import { iInventory, iMeta } from "./types";
import { NewItemForm } from "./NewItemForm";
const { Panel } = Collapse;

const localData: iInventory[] =
  // @ts-ignore
  JSON.parse(window.localStorage.getItem("inventory")) || mockData;

export const Inventory = () => {
  const [data, setData] = useState(localData);
  const [isDrawerVisible, setDrawerVisible] = useState<boolean>();
  const [selectedParentId, setSelectedParentId] = useState<string>();
  const [selectedData, setSelectedData] = useState<iInventory | undefined>();

  const onAddItem = (mutatedItem: iInventory) => {
    const newInventoryState = data.concat(mutatedItem);
    setData(newInventoryState);
    setDrawerVisible(false);
    window.localStorage.setItem("inventory", JSON.stringify(newInventoryState));
  };

  const onUpdateItem = (mutatedItem: iInventory) => {
    const newInventoryState = data.map((i) =>
      i.id === mutatedItem?.id ? mutatedItem : i
    );
    setData(newInventoryState);
    setDrawerVisible(false);
    window.localStorage.setItem("inventory", JSON.stringify(newInventoryState));
  };

  const hideDrawer = () => setDrawerVisible(false);

  const showDrawer = (parentId: string | undefined, data?: iInventory) => {
    setSelectedParentId(parentId);
    setSelectedData(data);
    setDrawerVisible(true);
  };

  const onDeleteItem = (id: string) => {
    setData(data.filter((i) => i.id !== id));
  };

  const render: any = (id: string) => {
    const item = data.find((i) => i.id === id);
    if (!item) return null;

    const children = data.filter((i) => i.parentId === id).map((i) => i.id);

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
            &nbsp;
            <Button
              onClick={() => showDrawer(item?.parentId, item)}
              size="small"
              shape="circle"
            >
              <EditOutlined />
            </Button>{" "}
            <Button onClick={() => showDrawer(id)} size="small" shape="circle">
              <FileAddOutlined />
            </Button>{" "}
            <Button
              onClick={() => onDeleteItem(id)}
              size="small"
              shape="circle"
              danger
            >
              <DeleteOutlined />
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

  const parent = data.find((i) => !i.hasOwnProperty("parentId"));

  return (
    <>
      <Collapse defaultActiveKey={[parent?.id || ""]} ghost>
        {parent && render(parent.id)}
      </Collapse>
      <Drawer
        title="Update User"
        placement="right"
        onClose={hideDrawer}
        visible={isDrawerVisible}
        destroyOnClose
      >
        <NewItemForm
          handleCreateNewItem={onAddItem}
          handleUpdateItem={onUpdateItem}
          parentId={selectedParentId}
          data={selectedData}
        />
      </Drawer>
    </>
  );
};
