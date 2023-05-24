import { useEffect, useState } from "react";
import TableEmployee from "../../../../Component/table/TableEmployee";
import WithAdmin from "../../../../hoc/withAdmin";
import AdminLayout from "../../../../layout/AdminLayout";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { Vehicle } from "../../../../model/vehicle";
import AddVehicle from "../../../../Component/form/AddVehicle";
import TableVehicle from "../../../../Component/table/TableVehicle";
import axiosInstance from "@/pages/api/axiosInstance";

const HomeVehicle = () => {
  const { token, id, username, roles } = useSelector(
    (state: any) => state.auth
  );
  const [data, setData] = useState<Vehicle[]>([]);
  const [openAdd, setOpenAdd] = useState(false);

  const handleCancelAdd = () => {
    setOpenAdd(false);
  };
  const editVehicle = async (vehicle: Vehicle) => {
    try {
      const response = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/vehicle/${vehicle.id}`,
        vehicle,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      // setData([...data, response.data]);
      const updatedVehicle = response.data;
      console.log(updatedVehicle);

      setData((prevData) =>
        prevData.map((item) =>
          item.id === updatedVehicle.id ? updatedVehicle : item
        )
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const addVehicle = async (vehicle: any) => {
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/vehicle/add`,
        vehicle,
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
      .get(`${process.env.NEXT_PUBLIC_API_HOST}/api/vehicle`, {
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
  const handleDelete = (id: number) => {
    axiosInstance
      .delete(`${process.env.NEXT_PUBLIC_API_HOST}/api/vehicle/${id}`, {
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
    <AdminLayout selectMenu="vehicle">
      <TableVehicle
        data={data}
        handleDelete={handleDelete}
        editVehicle={editVehicle}
      ></TableVehicle>
      <Button
        type="primary"
        style={{ backgroundColor: "green" }}
        onClick={() => setOpenAdd(true)}
      >
        Thêm phương tiện mới
      </Button>
      <AddVehicle
        open={openAdd}
        addVehicle={addVehicle}
        handleCancel={handleCancelAdd}
      ></AddVehicle>
    </AdminLayout>
  );
};
export default WithAdmin(HomeVehicle);
