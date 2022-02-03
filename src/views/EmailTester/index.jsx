import { Button, Card } from "antd";

const MOCK_DATA = {
  _id: "USER_ID",
  data: [
    {
      name: "Transactional Email Test 001",
      template: "The body of the thing will go here",
    },
    {
      name: "Transactional Email Test 002",
      template: "The body of the thing will go here",
    },
  ],
};
export const EmailTester = () => {
  //   return <Textarea />;
  return (
    <div>
      <h1>Work In Progress</h1>
      {MOCK_DATA.data.map((email) => {
        return (
          <>
            <Card title={email.name}>
              <textarea
                style={{ border: "0", width: "500px", height: "100px" }}
                defaultValue={email.template}
              />
            </Card>
          </>
        );
      })}

      <Button>Save</Button>
    </div>
  );
};
