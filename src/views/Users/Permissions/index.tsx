import { v4 } from "uuid";

const PERMISSIONS: {
  [key: string]: string;
} = {
  USER_MANAGEMENT: "auth-admin",
  RPP: "auth-rpp",
  EMAIL: "auth-email",
  INVENTORY: "auth-inventory",
  FILE: "auth-file-upload",
};

const roles = [
  {
    id: v4(),
    name: "Admin",
    permissions: Object.keys(PERMISSIONS).map((key) => PERMISSIONS[key]),
  },
  {
    id: v4(),
    name: "Red Poppy Pets",
    permissions: [PERMISSIONS.RPP, PERMISSIONS.FILE, PERMISSIONS.EMAIL],
  },

  {
    id: v4(),
    name: "Inventory User",
    permissions: [PERMISSIONS.INVENTORY, PERMISSIONS.FILE],
  },
  {
    id: v4(),
    name: "Marketing",
    permissions: [PERMISSIONS.EMAIL],
  },
];

export const Permissions = () => {
  console.log(roles);
  return (
    <>
      <h1>Roles Matrix Concept</h1>
      <table>
        <tr>
          <td style={{ width: "200px" }}></td>
          {roles.map((r) => (
            <td style={{ width: "150px" }}>{r.name}</td>
          ))}
        </tr>
        {Object.keys(PERMISSIONS).map((perm) => (
          <tr>
            <td>{perm}</td>
            {roles.map((role) => (
              <td>
                {role.permissions.includes(PERMISSIONS[perm]) ? "Y" : "N"}
              </td>
            ))}
          </tr>
        ))}
      </table>
      {/* {roles.map((role) => (
        <>
          {role.name}
          <br />
        </>
      ))} */}
    </>
  );
};
