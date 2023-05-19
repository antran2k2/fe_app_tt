import { Space, Table, Input, Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import confirm from "antd/es/modal/confirm";
import { Department } from "../../model/department";
import { ColumnsType } from "antd/es/table";
import EditDepartment from "../form/EditDepartment";
import { Vehicle } from "../../model/vehicle";

interface TableDepartmentProps {
  data: Department[];
  handleDelete: (id: number) => void;
  editDepartment: (department: Department) => any;
}

const TableDepartment = ({
  data,
  handleDelete,
  editDepartment,
}: TableDepartmentProps) => {
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState<Department>();
  const [openEdit, setOpenEdit] = useState(false);
  const handleCancelEdit = (e: any) => {
    // console.log(e);
    setOpenEdit(false);
  };
  const handleEdit = (vehicle: Department) => {
    setTarget(vehicle);
    setOpenEdit(true);
  };
  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const showConfirm = (record: Department) => {
    setTarget(record);
    setOpen(true);
  };

  const columns: ColumnsType<Department> = [
    {
      title: "Tên phòng ban",
      dataIndex: "name",
      key: "name",
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
      onFilter: (value: string | number | boolean, record: Department) =>
        record.name.toLowerCase().includes(value.toString().toLowerCase()),
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
      title: "Vị trí",
      dataIndex: "vi_tri",
      key: "vi_tri",
    },
    {
      title: "Số lượng nhân viên",
      dataIndex: "listEmployee",
      key: "numEmployee",
      render: (_: any, { listEmployee }: any) => (
        <p>{listEmployee ? listEmployee.length : 0}</p>
      ),
      sorter: (a: Department, b: Department) =>
        (a.listEmployee?.length ?? 0) - (b.listEmployee?.length ?? 0),
    },

    {
      title: "Action",
      key: "action",
      render: (text: any, record: Department) => (
        <div>
          <Button type="ghost" onClick={() => showConfirm(record)}>
            Delete
          </Button>
          <Button type="primary" onClick={() => handleEdit(record)}>
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
        <p>Bạn chắc chắn xoá {target?.name}</p>
      </Modal>
      <EditDepartment
        handleCancel={handleCancelEdit}
        openEdit={openEdit}
        editDepartment={editDepartment}
        department={target}
      />
    </>
  );
};
export default TableDepartment;
