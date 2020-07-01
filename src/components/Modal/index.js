import React from 'react';
import { Modal, Typography, Descriptions, Table } from 'antd';
import { connect } from 'react-redux';

const CustomModal = ({ visible, setVisible, order, config }) => {
  const EURO_DOLLAR_RATE = 1.12;
  const { Title } = Typography;
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Unit price',
      dataIndex: 'unit_price',
      key: 'unit_price'
    },
    {
      title: 'Total price',
      dataIndex: 'total_price',
      key: 'total_price'
    }
  ];
  return (
    <Modal
      title="Order details"
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
    >
      {order && (
        <>
          <Descriptions title="Customer details" layout="vertical">
            <Descriptions.Item
              label="Full name"
              span={2}
            >{`${order.name} ${order.last_name}`}</Descriptions.Item>
            <Descriptions.Item
              label="Telephone"
              span={2}
            >{`${order.phone}`}</Descriptions.Item>
            <Descriptions.Item label="Subtotal" span={1}>
              {`${order.sub_total} € (${(
                order.sub_total * EURO_DOLLAR_RATE
              ).toFixed(2)} $)`}
            </Descriptions.Item>
            <Descriptions.Item label="Delivery Fees" span={1}>
              {`${config.delivery_fees} € (${(
                config.delivery_fees * EURO_DOLLAR_RATE
              ).toFixed(2)} $)`}
            </Descriptions.Item>
            <Descriptions.Item label="Total" span={2}>{`${order.total} € (${(
              order.total * EURO_DOLLAR_RATE
            ).toFixed(2)} $)`}</Descriptions.Item>
            <Descriptions.Item label="Address" span={2}>
              {`${order.address}`}
            </Descriptions.Item>
            <Descriptions.Item label="Post Code" span={1}>
              {`${order.post_code}`}
            </Descriptions.Item>
            <Descriptions.Item label="Floor" span={2}>
              {`${order.floor !== null ? order.floor : ''} `}
            </Descriptions.Item>
            <Descriptions.Item label="City" span={1}>
              {`${order.city}`}
            </Descriptions.Item>
            <Descriptions.Item label="Additional Notes" span={3}>
              {`${
                order.additional_notes !== null ? order.additional_notes : ' '
              }`}
            </Descriptions.Item>
          </Descriptions>
          <Title level={4}>Items (All prices are in Euros)</Title>
          {order.lines && (
            <Table
              columns={columns}
              pagination={false}
              dataSource={order.lines}
            />
          )}
        </>
      )}
    </Modal>
  );
};

const mapStateToProps = ({ config }) => ({
  config
});
export default connect(mapStateToProps)(CustomModal);
