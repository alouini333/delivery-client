import React, { useEffect, useState } from "react";
import { Col, Typography, Table, Space, Tag } from "antd";
import { connect } from "react-redux";
import { getOrders, getOrder } from "../../state/actions";
import CustomModal from "../../components/Modal";

const Orders = ({ history, getOrders, getOrder, cart, user }) => {
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Sub total",
      dataIndex: "sub_total",
      key: "sub_total",
    },
    {
      title: "Delivery fees",
      dataIndex: "delivery_fees",
      key: "delivery_fees",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Ordered on",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Payment method",
      dataIndex: "method",
      key: "method",
      render: (text, record) => {
        let display = "";
        switch (text) {
          case "card":
            return <Tag color="gold">'Credit card'</Tag>;
          case "cash":
            return <Tag color="green">'Cash'</Tag>;
          case "bitcoin":
            return <Tag color="orange">Bitcoin</Tag>;
          default:
            return <Tag color="red">Error</Tag>;
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => showModal(record.id)}>Details</a>
        </Space>
      ),
    },
  ];

  const { Title } = Typography;
  useEffect(() => {
    getOrders();
  }, [getOrders]);
  const [visible, setVisible] = useState(false);

  const showModal = (id) => {
    getOrder(id);
    setVisible(!visible);
  };
  var orders = cart ? cart.orders : [];
  return (
    <div className="auth-container">
      <Col className="auth-form">
        <Title level={2}>Orders</Title>
        <Table dataSource={orders} columns={columns} />
      </Col>
      <CustomModal
        visible={visible}
        setVisible={setVisible}
        order={cart ? cart.order : null}
      />
    </div>
  );
};

const mapStateToProps = ({ cart, user }) => ({
  cart,
  user,
});

const mapDispatchToPros = (dispatch) => ({
  getOrders: () => dispatch(getOrders()),
  getOrder: (id) => dispatch(getOrder(id)),
});
export default connect(mapStateToProps, mapDispatchToPros)(Orders);
