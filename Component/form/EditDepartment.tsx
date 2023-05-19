import { useState, useEffect } from "react";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import axios from "axios";
import { Department } from "../../model/department";
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

interface PropsEdit {
  editDepartment: (department: Department) => any;
  department?: Department;
  openEdit: boolean;
  handleCancel: any;
}

const EditDepartment = ({
  editDepartment,
  department,
  openEdit,
  handleCancel,
}: PropsEdit) => {
  const [form] = Form.useForm();
  const handleSubmit = async (values: any) => {
    const departmentEdit: Department = {
      id: department?.id,
      name: values.name,
      vi_tri: values.vi_tri,
      // ...
    };
    const data = await editDepartment(departmentEdit);

    // onAddUser(data); // gọi callback để cập nhật danh sách user sau khi thêm mới thành công
    form.resetFields(); // reset form sau khi submit thành công
    handleCancel();
  };
  useEffect(() => {
    if (openEdit) {
      form.setFieldValue("name", department?.name);
      form.setFieldValue("vi_tri", department?.vi_tri);
    }
  }, [openEdit]);

  return (
    <div>
      <Modal
        title="Chỉnh sửa phòng ban"
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
          initialValues={department}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
            initialValue={department?.name}
          >
            <Input placeholder={department?.name} />
          </Form.Item>
          <Form.Item
            name="vi_tri"
            label="Vị trí"
            rules={[
              {
                required: true,
              },
            ]}
            initialValue={department?.vi_tri}
          >
            <Input placeholder={department?.vi_tri} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditDepartment;
