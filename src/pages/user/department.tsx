import { useEffect, useState } from "react";
import WithUser from "../../../hoc/withUser";
import UserLayout from "../../../layout/UserLayout";
import axiosInstance from "../api/axiosInstance";
import { useSelector } from "react-redux";
import { Department } from "../../../model/department";
import TableDepartment from "../../../Component/table/TableDepartment";

const Department1 = () => {
  const { token, id, username, roles } = useSelector(
    (state: any) => state.auth
  );
  const [data, setData] = useState<Department[]>([]);
  useEffect(() => {
    axiosInstance
      .get(`${process.env.NEXT_PUBLIC_API_HOST}/api/department/getList`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <UserLayout selectMenu="department">
      <TableDepartment
        data={data}
        handleDelete={function (id: number): void {
          throw new Error("Function not implemented.");
        }}
        editDepartment={function (department: Department) {
          throw new Error("Function not implemented.");
        }}
        admin={false}
      />
    </UserLayout>
  );
};
export default WithUser(Department1);
