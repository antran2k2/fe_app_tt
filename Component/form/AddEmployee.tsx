import { useState, useEffect } from "react";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import axios from "axios";
import { Department } from "../../model/department";
import { Employee } from "../../model/employee";
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

interface PropsAdd {
  addEmployee: (employee: any) => any;
  listDepartment: Department[];
  open: boolean;
  handleCancel: any;
}

const AddEmployee = ({
  addEmployee,
  listDepartment,
  open,
  handleCancel,
}: PropsAdd) => {
  const [form] = Form.useForm();
  const handleSubmit = async (values: any) => {
    const request = {
      name: values.name,
      cccd: values.cccd,
      department: values.idDepartment.value,
      username: values.username,
      password: values.password,
    };

    await addEmployee(request);
  };
  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  return (
    <div>
      <Modal
        title="Thêm mới nhân viên"
        open={open}
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
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="idDepartment"
            label="Phòng ban"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              labelInValue
              //   defaultValue={{ value: "lucy", label: "Lucy (101)" }}
              style={{ width: 120 }}
              options={listDepartment.map((departmnet) => ({
                label: departmnet.name,
                value: departmnet.id,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddEmployee;
