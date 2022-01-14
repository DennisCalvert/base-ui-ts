import { useCallback, useState, useEffect } from "react";
import { Spin } from "antd";
import { get } from "../../../services/user";
import { useParams } from "react-router-dom";

type UserType = {
  email: string;
  isAdmin: boolean;
  isActive: boolean;
  name: string;
  id: string;
  _id: string;
};

export const UserDetail = () => {
  const [user, setUser] = useState<UserType | undefined>();
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchData = useCallback(async () => {
    const res = await get(id);
    setUser(res);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) return <Spin />;

  return (
    <>
      <h1>USER DETAIL</h1>
      {user?.email}
      {user?.isAdmin}
    </>
  );
};
