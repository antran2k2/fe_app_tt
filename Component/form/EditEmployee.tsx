import { useState, useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import axios from "axios";
import { Department } from "../../model/department";
import { Employee } from "../../model/employee";
import dayjs from "dayjs";
const layout = {
  labelCol: {
    span: 6,
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

interface PropsEdit {
  editEmployee: (employee: any) => any;
  employee?: Employee;
  openEdit: boolean;
  handleCancel: any;
  listDepartment: Department[];
}

const EditEmployee = ({
  editEmployee,
  employee,
  openEdit,
  handleCancel,
  listDepartment,
}: PropsEdit) => {
  const [form] = Form.useForm();
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
      department: { id: values.idDepartment?.value || 99 },
    };

    // console.log(JSON.stringify(employeeEdit));
    const data = await editEmployee(employeeEdit);

    form.resetFields(); // reset form sau khi submit thành công
    handleCancel();
  };
  useEffect(() => {
    if (openEdit) {
      form.setFieldValue("name", employee?.name);
      form.setFieldValue("cccd", employee?.cccd);
      form.setFieldValue("email", employee?.email);
      form.setFieldValue("chucVu", employee?.chucVu);
      form.setFieldValue(
        "dob",
        employee?.dob && dayjs(employee?.dob, "YYYY-MM-DD")
      );
      console.log(employee?.dob);
    }
  }, [openEdit]);

  return (
    <div>
      <Modal
        title="Chỉnh sửa thông tin nhân viên"
        open={openEdit}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={form.submit}>
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          className="form"
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
          <Form.Item name="idDepartment" label="Phòng ban" rules={[]}>
            <Select
              labelInValue
              //   defaultValue={{ value: "lucy", label: "Lucy (101)" }}
              style={{ width: 120 }}
              options={listDepartment?.map((departmnet) => ({
                label: departmnet.name,
                value: departmnet.id,
              }))}
              placeholder={employee?.department}
            />
          </Form.Item>
          <Form.Item name="chucVu" label="Chức vụ" rules={[{}]}>
            <Input />
          </Form.Item>
          <Form.Item name="dob" label="Ngày sinh">
            <DatePicker format={"DD-MM-YYYY"} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditEmployee;
