import { useEffect, useState } from "react";
import axios from "axios";

interface iItem {
  _id: string;
  title: string;
  link: string;
  price: string;
}

export const GearFinder = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios(
      "https://63cxsi7av7c4cmunrrml5wo2qy0msxtk.lambda-url.us-east-2.on.aws/"
    );
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data.map((item: iItem) => (
        <div key={item._id}>
          <a href={item.link} target="_blank">
            {item.title}
          </a>{" "}
          {item.price}
        </div>
      ))}
    </>
  );
};
