import { useState, useEffect } from "react";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import axios from "axios";
import { Vehicle } from "../../model/vehicle";
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
  editVehicle: (vehicle: Vehicle) => any;
  vehicle?: Vehicle;
  openEdit: boolean;
  handleCancel: any;
  cccd?: string;
}

const EditVehicle = ({
  editVehicle,
  vehicle,
  openEdit,
  handleCancel,
  cccd,
}: PropsEdit) => {
  const [form] = Form.useForm();
  const handleSubmit = async (values: any) => {
    const vehicleEdit: Vehicle = {
      id: vehicle?.id,
      bienSo: values.bienSo,
      hangXe: values.hangXe,
      cccd: vehicle?.cccd,
      // ...
    };
    console.log(vehicleEdit);

    const data = await editVehicle(vehicleEdit);

    // onAddUser(data); // gọi callback để cập nhật danh sách user sau khi thêm mới thành công
    form.resetFields(); // reset form sau khi submit thành công
    handleCancel();
  };
  useEffect(() => {
    if (openEdit) {
      form.setFieldValue("bienSo", vehicle?.bienSo);
      form.setFieldValue("hangXe", vehicle?.hangXe);
      form.setFieldValue("cccd", vehicle?.cccd);
    }
  }, [openEdit]);

  return (
    <div>
      <Modal
        title="Chỉnh sửa phương tiện"
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
            name="bienSo"
            label="Biển số"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder={vehicle?.bienSo} />
          </Form.Item>
          <Form.Item
            name="hangXe"
            label="Hãng xe"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder={vehicle?.hangXe} />
          </Form.Item>
          <Form.Item
            name="cccd"
            label="CCCD"
            initialValue={cccd}
            rules={[
              {
                pattern: /^(?:\d{9}|\d{12})$/,
                required: true,
                message: "Nhập đúng 9 hoặc 12 chữ số",
              },
            ]}
          >
            <Input placeholder={vehicle?.cccd} disabled={cccd ? true : false} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditVehicle;
