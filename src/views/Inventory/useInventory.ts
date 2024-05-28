import { useQuery } from "react-query";
import { get, post } from "views/Inventory/inventoryService";

export const useInventoryGet = (userId?: string) => {
  return userId
    ? useQuery("getInventory", () => get(userId))
    : { isLoadng: false, data: {} };
};
