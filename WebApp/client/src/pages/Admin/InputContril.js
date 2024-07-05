import React from "react";
import { styles } from "./InputControlStyles";
import { Button, Form, Input, Select } from "antd";

const InputControl = () => {
  return (
    <div>
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
            <Form>
              <Form.Item label="Type">
                <Select  placeholder="Select Type">
                  <Select.Option value="Plants">Plants</Select.Option>
                  <Select.Option value="Machines">Machines</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Name">
                <Input placeholder="Enter Name" />
              </Form.Item>
              <Form.Item>
                <Button style={styles.submitBtn} type="primary" htmlType="submit">
                  Add
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        <div style={styles.rightColumn}>
          <div style={styles.rightInnerLeft}>
            <div style={styles.InnerHeader}>
              <h6>Plants</h6>
            </div>
          </div>

          <div style={styles.rightInnerRight}>
            <div style={styles.InnerHeader}>
              <h6>Plants</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputControl;
