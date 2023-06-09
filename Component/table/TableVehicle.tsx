import { Space, Table, Input, Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import confirm from "antd/es/modal/confirm";
import { Department } from "../../model/department";
import { ColumnsType } from "antd/es/table";
import { Employee } from "../../model/employee";
import { Vehicle } from "../../model/vehicle";
import EditVehicle from "../form/EditVehicle";

interface TableVehicleProps {
  data: Vehicle[];
  handleDelete: (id: number) => void;
  editVehicle: (vehicle: Vehicle) => any;
  cccd?: string;
}

const TableVehicle = ({
  data,
  handleDelete,
  editVehicle,
  cccd,
}: TableVehicleProps) => {
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState<Vehicle>();

  const [openEdit, setOpenEdit] = useState(false);

  const handleCancelEdit = (e: any) => {
    // console.log(e);
    setOpenEdit(false);
  };
  const handleEdit = (vehicle: Vehicle) => {
    setTarget(vehicle);

    setOpenEdit(true);
  };
  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const showConfirm = (record: Vehicle) => {
    setTarget(record);
    setOpen(true);
  };

  const columns: ColumnsType<Vehicle> = [
    {
      title: "Biển số xe",
      dataIndex: "bienSo",
      key: "bienSo",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: any) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search name"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters()}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      // Thay đổi trạng thái của bộ lọc
      filterIcon: (filtered: any) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      // Lọc dữ liệu theo giá trị tìm kiếm

      onFilter: (value: string | number | boolean, record: Vehicle) =>
        record.bienSo.toLowerCase().includes(value.toString().toLowerCase()),
      // Sắp xếp dữ liệu khi sử dụng bộ lọc
      // onFilterDropdownVisibleChange: visible => {
      //     if (visible) {
      //         setTimeout(() => this.searchInput.select());
      //     }
      // },
      sorter: (a: Vehicle, b: Vehicle) => a.bienSo.localeCompare(b.bienSo),
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Hãng xe",
      dataIndex: "hangXe",
      key: "hangXe",
      render: (hang_xe: string) => <p>{hang_xe}</p>,
    },
    {
      title: "Chủ xe",
      dataIndex: "employee",
      key: "employee",
      sorter: (a: Vehicle, b: Vehicle) =>
        a.employee?.localeCompare(b.employee || "") || 1,
    },

    {
      title: "Action",
      key: "action",
      render: (text: any, record: Vehicle) => (
        <div>
          <Button key={1} type="ghost" onClick={() => showConfirm(record)}>
            Delete
          </Button>
          <Button key={2} type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
        </div>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} />;
      <Modal
        title="Xác nhận xoá"
        open={open}
        onOk={() => {
          handleDelete(target?.id || 1);
          setOpen(false);
        }}
        onCancel={hideModal}
        okText="OK"
        cancelText="Cancel"
      >
        <p>Bạn chắc chắn xoá xe có biển số {target?.bienSo}</p>
      </Modal>
      <EditVehicle
        vehicle={target}
        editVehicle={editVehicle}
        openEdit={openEdit}
        handleCancel={handleCancelEdit}
        cccd={cccd}
      />
    </>
  );
};
export default TableVehicle;
