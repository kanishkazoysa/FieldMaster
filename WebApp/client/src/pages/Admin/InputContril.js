import React, { useState, useEffect } from "react";
import { styles } from "./InputControlStyles";
import { Button, Form, Input, Select, List, message } from "antd";
import AxiosInstance from "../../AxiosInstance";

const InputControl = () => {
  const [form] = Form.useForm();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get("/api/auth/mapTemplate/getPlants");
      setPlants(response.data);
    } catch (error) {
      console.error("Failed to fetch plants:", error);
      message.error("Failed to fetch plants");
    }
    setLoading(false);
  };

  const onFinish = async (values) => {
    try {
      await AxiosInstance.post("/api/auth/mapTemplate/addPlant", values);
      message.success("Plant added successfully");
      form.resetFields();
      fetchPlants();
    } catch (error) {
      console.error("Failed to add plant:", error);
      message.error("Failed to add plant");
    }
  };

  const handleDelete = async (id) => {
    try {
      await AxiosInstance.delete(`/api/auth/mapTemplate/deletePlant/${id}`);
      message.success("Plant deleted successfully");
      fetchPlants();
    } catch (error) {
      console.error("Failed to delete plant:", error);
      message.error("Failed to delete plant");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.header}>
        <h5 style={styles.headertxt}>Manage Input Types</h5>
      </div>

      <div style={styles.container}>
        <div style={styles.leftColumn}>
          <div style={styles.leftHeader}>
            <h6>Add New Data</h6>
          </div>
          <div>
            <p style={styles.formheader}>Add new types</p>
          </div>
          <div style={styles.form}>
            <Form form={form} onFinish={onFinish}>
              <Form.Item name="Type" label="Type">
                <Select placeholder="Select Type">
                  <Select.Option value="Plants">Plants</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="Name" label="Name">
                <Input placeholder="Enter Name" />
              </Form.Item>
              <Form.Item>
                <Button
                  style={styles.submitBtn}
                  type="primary"
                  htmlType="submit"
                >
                  Add
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        <div style={styles.rightColumn}>
          <div style={styles.rightInnerLeft}>
            <div style={styles.InnerHeader}>
              <h6>Plant List</h6>
            </div>
            <div style={styles.plantListWrapper}>
              <List
                loading={loading}
                itemLayout="horizontal"
                dataSource={plants}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button onClick={() => handleDelete(item._id)} danger>Remove</Button>
                    ]}
                  >
                    <List.Item.Meta
                      title={item.Name}
                      style={styles.plantNameMeta}
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
          <div style={styles.rightInnerRight}></div>
          <div style={styles.rightInnerRight}></div>
        </div>
      </div>
    </div>
  );
};

export default InputControl;