import { useCallback, useEffect, useState } from "react";
import { Button, Collapse, Drawer, Popover } from "antd";
import {
  EditOutlined,
  FileAddOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { iInventory, iMeta } from "./types";
import { NewItemForm } from "./NewItemForm";
import { get, post } from "services/inventory";
import { useParams } from "react-router-dom";
import { InventoryImage } from "./shared";
const { Panel } = Collapse;

export const Inventory = () => {
  const [data, setData] = useState<iInventory[]>([
    { id: "parent", name: "Inventory Collection" },
  ]);
  const [isDrawerVisible, setDrawerVisible] = useState<boolean>();
  const [selectedParentId, setSelectedParentId] = useState<string>();
  const [selectedData, setSelectedData] = useState<iInventory | undefined>();
  const [images, setImages] = useState<any>({});
  // const [isLoading, setLoading] = useState(true);
  const { userId } = useParams();

  const fetchData = useCallback(async () => {
    if (userId) {
      const res = await get(userId);
      if (res && res.data) {
        setData(res.data);
      }
      if (res && res.images) {
        setImages(res.images);
      }
      // setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onAddItem = (mutatedItem: iInventory) => {
    const newInventoryState = data?.concat(mutatedItem);
    setData(newInventoryState);
    if (userId) post(userId, newInventoryState);
    setDrawerVisible(false);
  };

  const onUpdateItem = (mutatedItem: iInventory) => {
    const newInventoryState = data?.map((i) =>
      i.id === mutatedItem?.id ? mutatedItem : i
    );
    setData(newInventoryState);
    if (userId) post(userId, newInventoryState);
    setDrawerVisible(false);
  };

  const hideDrawer = () => setDrawerVisible(false);

  const showDrawer = (parentId: string | undefined, data?: iInventory) => {
    setSelectedParentId(parentId);
    setSelectedData(data);
    setDrawerVisible(true);
  };

  const onDeleteItem = (id: string) => {
    const mutatedData = data?.filter((i) => i.id !== id);
    setData(mutatedData);
    if (userId) post(userId, mutatedData);
  };

  const render: any = (id: string) => {
    const item = data?.find((i) => i.id === id);
    if (!item) return null;

    const children = data?.filter((i) => i.parentId === id).map((i) => i.id);

    return (
      <Panel
        // onClick={(event) => event.stopPropagation()}
        showArrow={children.length > 0}
        key={id}
        header={
          <>
            <InventoryImage
              {...images[item?.id]}
              alt={item?.name}
              style={{ width: "20px" }}
            />
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
              onClick={(e) => {
                e.stopPropagation();
                showDrawer(item?.parentId, item);
              }}
              size="small"
              shape="circle"
            >
              <EditOutlined />
            </Button>{" "}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                showDrawer(id);
              }}
              size="small"
              shape="circle"
            >
              <FileAddOutlined />
            </Button>{" "}
            <Popover
              trigger="click"
              title="This action can't be undone. Are you sure?"
              content={
                <Button
                  onClick={() => onDeleteItem(id)}
                  // disabled={isLoading}
                  danger
                >
                  Confirm
                </Button>
              }
            >
              <Button
                danger
                size="small"
                shape="circle"
                onClick={(e) => e.stopPropagation()}
              >
                <DeleteOutlined />
              </Button>
            </Popover>
          </>
        }
      >
        {/* <InventoryImage
          userId={userId}
          itemId={item?.id}
          alt={item?.name}
          style={{ display: "block", margin: "0 auto" }}
        /> */}
        {item?.description && (
          <div style={{ whiteSpace: "pre-line" }}>{item?.description}</div>
        )}
        {children && <Collapse>{children?.map(render)}</Collapse>}
      </Panel>
    );
  };

  const parent = data?.find((i) => !i.hasOwnProperty("parentId"));
  return (
    <>
      <Collapse defaultActiveKey={[parent?.id || ""]}>
        {parent && render(parent.id)}
      </Collapse>
      <Drawer
        title="Update User"
        placement="right"
        onClose={hideDrawer}
        visible={isDrawerVisible}
        size="large"
        destroyOnClose
      >
        <NewItemForm
          handleCreateNewItem={onAddItem}
          handleUpdateItem={onUpdateItem}
          parentId={selectedParentId}
          data={selectedData}
          images={images}
          fetchData={fetchData}
        />
      </Drawer>
    </>
  );
};
