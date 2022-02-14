import { FC } from "react";
import { Form, Button, Input } from "antd";

interface Props {
  handleCreateNewSeries: (parentId: string, total: number) => void;
  parentId?: string;
}

export const NewSeriesForm: FC<Props> = ({
  handleCreateNewSeries,
  parentId,
}) => {
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 20 }}
        onFinish={({ total }) => handleCreateNewSeries(parentId || `1`, total)}
        autoComplete="off"
      >
        <Form.Item
          label="Total"
          name="total"
          rules={[{ required: true, message: "Please Add a Name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
          style={{ textAlign: "right" }}
        >
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
