import TableDepartment from "../../../../Component/table/TableDepartment";
import WithAdmin from "../../../../hoc/withAdmin";
import AdminLayout from "../../../../layout/AdminLayout";
import { Department } from "../../../../model/department";
import { useEffect, useState } from "react";
import AddDepartment from "../../../../Component/form/AddDepartment";
import { useSelector } from "react-redux";
import axiosInstance from "@/pages/api/axiosInstance";
import EditDepartment from "../../../../Component/form/EditDepartment";

const Department = () => {
  const { token, id, username, roles } = useSelector(
    (state: any) => state.auth
  );
  const [data, setData] = useState<Department[]>([]);

  const addDepartment = async (department: Department) => {
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/department`,
        department,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setData([...data, response.data]);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const editDepartment = async (department: Department) => {
    try {
      const response = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/department/${department.id}`,
        department,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      // setData([...data, response.data]);
      const updatedDepartment = response.data;
      setData((prevData) =>
        prevData.map((item) =>
          item.id === updatedDepartment.id ? updatedDepartment : item
        )
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = (id: number) => {
    axiosInstance
      .delete(`${process.env.NEXT_PUBLIC_API_HOST}/api/department/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        // xóa dữ liệu thành công, cập nhật lại danh sách dữ liệu
        setData(data.filter((item) => item.id !== id));
      })
      .catch((error) => {
        // xóa dữ liệu không thành công, hiển thị thông báo lỗi
        console.error(error);
      });
  };
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
    <AdminLayout selectMenu="department">
      <TableDepartment
        editDepartment={editDepartment}
        data={data}
        handleDelete={handleDelete}
      />
      <AddDepartment addDepartment={addDepartment} />
    </AdminLayout>
  );
};
export default WithAdmin(Department);
