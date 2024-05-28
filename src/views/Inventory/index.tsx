import { useCallback, useEffect, useState } from "react";
import { Button, Collapse, Drawer, Popover, Skeleton } from "antd";
import {
  EditOutlined,
  FileAddOutlined,
  DeleteOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { iInventory, iMeta } from "./types";
import { NewItemForm } from "./NewItemForm";
import { NewSeriesForm } from "./NewSeriesForm";
import { get, post } from "views/Inventory/inventoryService";
import { useParams } from "react-router-dom";
import { v4 as uuid4 } from "uuid";
import { InventoryImage } from "./shared";
import { data as testData } from "./flatData";
import { useInventoryGet } from "./useInventory";
import "./inventory.css";
const { Panel } = Collapse;

export const Inventory = () => {
  const [data, setData] = useState<iInventory[]>([
    { id: "parent", name: "Inventory Collection" },
  ]);
  const [isNewItemDrawerVisible, setNewItemDrawerVisible] = useState<boolean>();
  const [isNewSeriesDrawerVisible, setNewSeriesDrawerVisible] =
    useState<boolean>();
  const [selectedParentId, setSelectedParentId] = useState<string>();
  const [selectedData, setSelectedData] = useState<iInventory | undefined>();
  const [images, setImages] = useState<any>({});
  // const [isLoading, setLoading] = useState(true);

  const { userId } = useParams();
  // const { data, isLoading } = useInventoryGet(userId);

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
    // console.log(mutatedItem);
    const newInventoryState = data?.concat(mutatedItem);
    setData(newInventoryState);
    if (userId) post(userId, newInventoryState);
    setNewItemDrawerVisible(false);
  };

  const onUpdateItem = (mutatedItem: iInventory) => {
    // console.log(mutatedItem);
    const newInventoryState = data?.map((i) =>
      i.id === mutatedItem?.id ? mutatedItem : i
    );
    setData(newInventoryState);
    if (userId) post(userId, newInventoryState);
    setNewItemDrawerVisible(false);
  };

  const onDeleteItem = (id: string) => {
    const mutatedData = data?.filter((i) => i.id !== id);
    setData(mutatedData);
    if (userId) post(userId, mutatedData);
  };

  const onCreateSeries = (parentId: string, total: number) => {
    const newSeries: iInventory[] = [];
    for (let i = 0; i < total; i++) {
      newSeries.push({
        id: uuid4(),
        name: `${i + 1}`,
        parentId: parentId,
      });
    }
    const newInventoryState = data?.concat(newSeries);
    setData(newInventoryState);
    if (userId) post(userId, newInventoryState);
    setNewSeriesDrawerVisible(false);
  };

  const hideDrawer = () => setNewItemDrawerVisible(false);

  const hideNewSeriesDrawer = () => setNewSeriesDrawerVisible(false);

  const showNewItemDrawer = (
    parentId: string | undefined,
    data?: iInventory
  ) => {
    setSelectedParentId(parentId);
    setSelectedData(data);
    setNewItemDrawerVisible(true);
  };

  const showNewSeriesDrawer = (parentId?: string) => {
    setSelectedParentId(parentId);
    setNewSeriesDrawerVisible(true);
  };

  const render: any = (id: string) => {
    // console.log(data);
    // console.log(id);
    const item = data?.find((i) => i.id === id);
    // console.log(item);
    if (!item) return null;

    const children = data
      ?.filter((i) => i.parentId === id)
      .sort((a, b) => {
        const intA = parseInt(a.name || "");
        const intB = parseInt(b.name || "");

        if (isNaN(intA) || isNaN(intB)) {
          const nA = a.name?.toUpperCase() || 0;
          const nB = b.name?.toUpperCase() || 0;
          if (nA < nB) {
            return -1;
          }
          if (nA > nB) {
            return 1;
          }
          return 0;
        }

        return intA - intB;
      });

    // const collectionValue = children.reduce((a, b) => a + (b.value || 0) ), 0);
    // const childrenIds = children.map((i) => i.id);
    // .map((i) => i.id);

    // if (isLoading) {
    //   return <Skeleton />;
    // }

    return (
      <Panel
        showArrow={!!children?.length}
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
          <span className="actions-panel">
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
                showNewSeriesDrawer(item?.id);
              }}
              size="small"
              shape="circle"
            >
              <OrderedListOutlined />
            </Button>{" "}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                showNewItemDrawer(item?.parentId, item);
              }}
              size="small"
              shape="circle"
            >
              <EditOutlined />
            </Button>{" "}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                showNewItemDrawer(id);
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
                <Button onClick={() => onDeleteItem(id)} danger>
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
          </span>
        }
      >
        {/* {children.length > 0 && <>{children.length} Items in collection</>} */}
        {item?.description && (
          <div style={{ whiteSpace: "pre-line" }}>{item?.description}</div>
        )}
        {children && (
          <Collapse>{children?.map((item) => render(item.id))}</Collapse>
        )}
      </Panel>
    );
  };

  const parent = data?.find((i) => !i.hasOwnProperty("parentId"));
  return (
    <>
      <Collapse defaultActiveKey={[1, parent?.id || ""]}>
        {parent && render(parent.id)}
      </Collapse>
      <Drawer
        title="Manage Item"
        placement="right"
        onClose={hideDrawer}
        visible={isNewItemDrawerVisible}
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
      <Drawer
        title="Manage Item"
        placement="right"
        onClose={hideNewSeriesDrawer}
        visible={isNewSeriesDrawerVisible}
        size="large"
        destroyOnClose
      >
        <NewSeriesForm
          handleCreateNewSeries={onCreateSeries}
          parentId={selectedParentId}
        />
      </Drawer>
    </>
  );
};
