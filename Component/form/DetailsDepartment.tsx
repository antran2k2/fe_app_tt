import { useState, useEffect } from "react";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import axios from "axios";
import { Department } from "../../model/department";
import Table, { ColumnsType } from "antd/es/table";
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

interface PropsDetails {
  department?: Department;
  openDetail: boolean;
  handleCancel: any;
}

const DetailsDepartment = ({
  department,
  openDetail,
  handleCancel,
}: PropsDetails) => {
  const columns: ColumnsType<Employee> = [
    {
      title: "Tên nhân viên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Chức vụ",
      dataIndex: "chucVu",
      key: "chucVu",
    },
  ];
  return (
    <div>
      <Modal
        title="Xem phòng ban"
        open={openDetail}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <p>
          Tên phòng ban: <b>{department?.name}</b>
        </p>
        <p>
          Vị trí: <b>{department?.vi_tri}</b>
        </p>
        <Table
          columns={columns}
          dataSource={department?.listEmployee || null || undefined}
        />
      </Modal>
    </div>
  );
};

export default DetailsDepartment;
