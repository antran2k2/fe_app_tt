import { useState, useEffect } from "react";
import { Button, Form, Input, InputNumber, Modal, Table } from "antd";
import axios from "axios";
import { Department } from "../../model/department";
import { ColumnsType } from "antd/es/table";
import { Employee } from "../../model/employee";
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

interface PropsDetails {
  employee?: Employee;
  openDetail: boolean;
  handleCancel: any;
}

const DetailsEmployee = ({
  employee,
  openDetail,
  handleCancel,
}: PropsDetails) => {
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
  return (
    <div>
      <Modal
        title="Xem thông tin nhân viên"
        open={openDetail}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <p>
          Tên : <b>{employee?.name}</b>
        </p>
        <p>
          Username : <b>{employee?.username}</b>
        </p>
        <p>
          CCCD: <b>{employee?.cccd}</b>
        </p>
        <p>
          Chức vụ: <b>{employee?.chucVu}</b>
        </p>
        <p>
          Ngày sinh: <b>{employee?.dob}</b>
        </p>
        <Table
          columns={columns}
          dataSource={employee?.listVehicle || null || undefined}
        />
      </Modal>
    </div>
  );
};

export default DetailsEmployee;
