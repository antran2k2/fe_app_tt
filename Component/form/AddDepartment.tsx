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

interface PropsAdd {
  addDepartment: (department: Department) => any;
}

const AddDepartment = ({ addDepartment }: PropsAdd) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const handleSubmit = async (values: any) => {
    const department: Department = {
      name: values.name,
      vi_tri: values.vi_tri,
      // ...
    };
    const data = await addDepartment(department);
    setOpen(false);

    // onAddUser(data); // gọi callback để cập nhật danh sách user sau khi thêm mới thành công
    form.resetFields(); // reset form sau khi submit thành công
  };
  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  const handleCancel = (e: any) => {
    // console.log(e);
    setOpen(false);
  };
  return (
    <div>
      <Button
        type="primary"
        style={{ backgroundColor: "green" }}
        onClick={() => setOpen(true)}
      >
        Thêm phòng ban
      </Button>
      <Modal
        title="Thêm mới phòng ban"
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
            name="vi_tri"
            label="Vị trí"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddDepartment;
