import React, { useEffect, useState } from "react";
import Layout from "../compenents/layouts/Layout";
import { Form, Input, InputNumber, message, Modal, Select, Table, DatePicker } from "antd";
import 'antd/dist/reset.css'; // For Ant Design v5 and up
import {
  AreaChartOutlined,
  UnorderedListOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./HomePage.css";
import axios from "axios";
import Spinner from "../compenents/layouts/Spinner";
import moment from "moment";
import Analytics from "../compenents/layouts/Analytics";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [ViewData, setViewData] = useState("table");
  const [Editable, setEditable] = useState(null);
  const token = localStorage.getItem("token");

  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?._id) {
        message.error("Please log in again to continue");
        return;
      }

      setLoading(true);
      const res = await axios.post(
        "/transactions/get-transaction",
        {
          frequency,
          selectedDate,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactions(res.data.map((item) => ({ ...item, key: item._id })));
    } catch (error) {
      message.error(error.response?.data?.message || "Something went wrong while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frequency, selectedDate, type]);

  const handleDelete = async(record)=>{
    try {
      setLoading(true);
      await axios.post("/transactions/delete-transaction",
        {
          transactionId:record._id
        },
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      message.success("transaction Deleted");
      await getAllTransactions();
    } catch (error) {
      console.log(error);
      message.error(error.response?.data?.message || 'unable to delete');
    } finally {
      setLoading(false);
    }
  }

  //all columns
  const columns = [
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "refrence",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Action",
      render: (text, record) => {
        return(
          <div className="action-cell">
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined className="mx-2" onClick={()=>handleDelete(record)}/>
        </div>
        )
      },
    },
  ];

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?._id) {
        message.error("Please log in again to continue");
        return;
      }
      setLoading(true);
      if(Editable){
        await axios.post("/transactions/edit-transaction", {
        payload:{
          ...values,
        },
        transactionId:Editable._id
      },
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Transaction Updated successfully");
      setShowModal(false);
      setEditable(null); 
      await getAllTransactions();
      }else{
        await axios.post("/transactions/add-transaction", {
        ...values,
      },
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Transaction added successfully");
      setShowModal(false);
      setEditable(null); 
      await getAllTransactions();
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {Loading && <Spinner />}
      <div className="filters">
        <div className="filter-item">
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(value) => setFrequency(value)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>
        <div className="filter-item">
          <h6>Select Type</h6>
          <Select value={type} onChange={(value) => setType(value)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedDate(values)}
            />
          )}
        </div>
        <div className="switch-icon filter-item">
          <UnorderedListOutlined
            className={`mx-2 ${
              ViewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              ViewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("analytics")}
          />
        </div>
        <div className="filters-action">
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add new
          </button>
        </div>
      </div>
      <div className="content dashboard-content">
        {ViewData === "table" ? (
          <div className="transactions-table">
            <Table columns={columns} dataSource={transactions} scroll={{ x: 720 }} />
          </div>
        ) : (
          <Analytics alltransactions={transactions} />
        )}
      </div>
      <Modal
        title={Editable?'Edit Table':'Add transaction'}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit} initialValues={Editable}>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Amount is required" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Type" name="type" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="salary">salary</Select.Option>
              <Select.Option value="tip">tip</Select.Option>
              <Select.Option value="project">project</Select.Option>
              <Select.Option value="food">food</Select.Option>
              <Select.Option value="movie">movie</Select.Option>
              <Select.Option value="bills">bills</Select.Option>
              <Select.Option value="medical">medical</Select.Option>
              <Select.Option value="tax">tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Date is required" }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            label="description"
            name="description"
            rules={[{ required: true }]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item label="refrence" name="refrence">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
