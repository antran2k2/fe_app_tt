import { useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
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
  addVehicle: (vehicle: any) => any;
  open: boolean;
  handleCancel: any;
  cccd?: string;
}

const AddVehicle = ({ addVehicle, open, handleCancel, cccd }: PropsAdd) => {
  const [form] = Form.useForm();
  const handleSubmit = async (values: any) => {
    const request = {
      bienSo: values.bienSo,
      cccd: values.cccd,
      hangXe: values.hangXe,
    };

    await addVehicle(request);
  };
  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  return (
    <div>
      <Modal
        title="Thêm mới phương tiện"
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
            name="bienSo"
            label="Biển số xe"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
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
            <Input />
          </Form.Item>
          <Form.Item
            name="cccd"
            label="CCCD chủ xe"
            rules={[
              {
                pattern: /^(?:\d{9}|\d{12})$/,
                required: true,
                message: "Nhập đúng 9 hoặc 12 chữ số",
              },
            ]}
            initialValue={cccd}
          >
            <Input disabled={cccd ? true : false} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddVehicle;
