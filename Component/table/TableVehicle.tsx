import { Space, Table, Input, Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import confirm from "antd/es/modal/confirm";
import { Department } from "../../model/department";
import { ColumnsType } from "antd/es/table";
import { Employee } from "../../model/employee";
import { Vehicle } from "../../model/vehicle";

interface TableVehicleProps {
  data: Vehicle[];
  handleDelete: (id: number) => void;
}

const TableVehicle = ({ data, handleDelete }: TableVehicleProps) => {
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState<Vehicle>();
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

      onFilter: (value: any, record: Department) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
      // Sắp xếp dữ liệu khi sử dụng bộ lọc
      // onFilterDropdownVisibleChange: visible => {
      //     if (visible) {
      //         setTimeout(() => this.searchInput.select());
      //     }
      // },
      sorter: (a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name),
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
      sorter: (a: { numVehicle: number }, b: { numVehicle: number }) =>
        a.numVehicle - b.numVehicle,
    },

    {
      title: "Action",
      key: "action",
      render: (text: any, record: Vehicle) => (
        <div>
          <Button type="ghost" onClick={() => showConfirm(record)}>
            Delete
          </Button>
          <Button type="primary" onClick={() => showConfirm(record)}>
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
        <p>Bạn chắc chắn xoá xe có biển số {target?.bien_so}</p>
      </Modal>
    </>
  );
};
export default TableVehicle;
