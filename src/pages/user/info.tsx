import { useState, useEffect } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Modal } from "antd";
import axios from "axios";
import Table, { ColumnsType } from "antd/es/table";
import { Vehicle } from "../../../model/vehicle";
import UserLayout from "../../../layout/UserLayout";
import { useSelector } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import { Employee } from "../../../model/employee";
import WithUser from "../../../hoc/withUser";
import dayjs from "dayjs";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
const columns: ColumnsType<Vehicle> = [
  {
    title: "Biển số",
    dataIndex: "bienSo",
    key: "bienSo",
  },
  {
    title: "Hãng xe",
    dataIndex: "hangXe",
    key: "hangXe",
  },
];
const UserInfo = () => {
  const { token, id, username, roles } = useSelector(
    (state: any) => state.auth
  );
  const [form] = Form.useForm();

  const [employee, setEmployee] = useState<Employee>();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/employee/info`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setEmployee(response.data);
      setForm(response.data); // Call setForm inside the fetchData function
    } catch (error) {
      console.log(error);
    }
  };

  const setForm = (employee: Employee) => {
    form.setFieldValue("name", employee?.name);
    form.setFieldValue("cccd", employee?.cccd);
    form.setFieldValue("email", employee?.email);
    form.setFieldValue("chucVu", employee?.chucVu);
    form.setFieldValue("department", employee.department);
    form.setFieldValue(
      "dob",
      employee?.dob && dayjs(employee?.dob, "YYYY-MM-DD")
    );
  };
  const editEmployee = async (employee: any) => {
    try {
      const response = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/employee/${employee.id}`,
        employee,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      // setData([...data, response.data]);
      const updatedEmployee = response.data;
      console.log(updatedEmployee);

      setEmployee(updatedEmployee);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (values: any) => {
    const employeeEdit = {
      id: employee?.id,
      name: values.name,
      chucVu: values.chucVu,
      cccd: values.cccd,
      dob: `${values.dob.$y}-${(values.dob.$M + 1)
        .toString()
        .padStart(2, "0")}-${values.dob.$D.toString().padStart(2, "0")}`,
      email: values.email,
      // ...
    };

    await editEmployee(employeeEdit);
    alert("Cập nhật thành công");
  };
  return (
    <UserLayout selectMenu="info">
      <div>
        <h3>Thông tin của nhân viên</h3>
        <Form
          className="form"
          form={form}
          {...layout}
          name="nest-messages"
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cccd"
            label="CCCD"
            rules={[
              {
                pattern: /^(?:\d{9}|\d{12})$/,
                required: true,
                message: "Nhập đúng 9 hoặc 12 chữ số",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="department" label="Phòng ban" rules={[{}]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="chucVu" label="Chức vụ" rules={[{}]}>
            <Input />
          </Form.Item>
          <Form.Item name="dob" label="Ngày sinh">
            <DatePicker format={"DD-MM-YYYY"} />
          </Form.Item>
        </Form>
        <Button key="submit" type="primary" onClick={form.submit}>
          Cập nhật thông tin
        </Button>
        ,
      </div>
    </UserLayout>
  );
};

export default WithUser(UserInfo);
