import { useEffect, useState } from "react";
import TableEmployee from "../../../../Component/table/TableEmployee";
import WithAdmin from "../../../../hoc/withAdmin";
import AdminLayout from "../../../../layout/AdminLayout";
import { Employee } from "../../../../model/employee";
import { useSelector } from "react-redux";
import AddEmployee from "../../../../Component/form/AddEmployee";
import { Department } from "../../../../model/department";
import { Button } from "antd";
import axiosInstance from "@/pages/api/axiosInstance";

const Employee = () => {
  const { token, id, username, roles } = useSelector(
    (state: any) => state.auth
  );
  const [data, setData] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [openAdd, setOpenAdd] = useState(false);

  const handleCancelAdd = () => {
    setOpenAdd(false);
  };
  const addEmployee = async (employee: any) => {
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/employee/add`,
        employee,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setData([...data, response.data]);
      setOpenAdd(false);
      return response.data;
    } catch (error: any) {
      alert(error.response.data);
      console.log(error);
    }
  };
  useEffect(() => {
    axiosInstance
      .get(`${process.env.NEXT_PUBLIC_API_HOST}/api/employee`, {
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
  useEffect(() => {
    axiosInstance
      .get(`${process.env.NEXT_PUBLIC_API_HOST}/api/department/getList`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        setDepartments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleDelete = (id: number) => {
    axiosInstance
      .delete(`${process.env.NEXT_PUBLIC_API_HOST}/api/employee/${id}`, {
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
  return (
    <AdminLayout selectMenu="employee">
      <TableEmployee data={data} handleDelete={handleDelete}></TableEmployee>
      <Button
        type="primary"
        style={{ backgroundColor: "green" }}
        onClick={() => setOpenAdd(true)}
      >
        Thêm nhân viên
      </Button>
      <AddEmployee
        open={openAdd}
        listDepartment={departments}
        addEmployee={addEmployee}
        handleCancel={handleCancelAdd}
      ></AddEmployee>
    </AdminLayout>
  );
};
export default WithAdmin(Employee);
