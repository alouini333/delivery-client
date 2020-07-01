import React from "react";
import { Card, Row, Col, Button, notification } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Scrollbars } from "react-custom-scrollbars";
import { map, addIndex } from "ramda";
import "../../App.less";

const EURO_DOLLAR_RATE = 1.12;

const Counter = ({ item, modifyFromCart }) => {
  return (
    <Row>
      <Col>
        <Button
          shape="circle-outline"
          size="small"
          onClick={() => {
            item.quantity = item.quantity ? item.quantity - 1 : 1;
            modifyFromCart(item);
          }}
          disabled={item.quantity <= 1}>
          -
        </Button>
      </Col>
      <Col>
        <h3>{item.quantity}</h3>
      </Col>
      <Col>
        <Button
          shape="circle-outline"
          size="small"
          onClick={() => {
            item.quantity = item.quantity ? item.quantity + 1 : 1;
            modifyFromCart(item);
          }}>
          +
        </Button>
      </Col>
    </Row>
  );
};
const Content = ({
  history,
  price,
  cart,
  deleteFromCart,
  modifyFromCart,
  loadPricing,
}) => {
  var mapIndexed = addIndex(map);
  var items = cart ? cart.items : [];
  const getTotalPrice = (items) =>
    items
      .map((item) => item.price * item.quantity)
      .reduce((acc, value) => acc + value, 0);

  const totalPrice = getTotalPrice(items);
  price.subPrice = getTotalPrice(items);
  price.totalPrice = price.delivery + price.subPrice;
  price.totalDollar = (price.delivery + totalPrice) * EURO_DOLLAR_RATE;

  const openNotification = (placement) => {
    notification.error({
      message: `Error`,
      description:
        "You should put some items into the cart before proceeding to payment.",
      placement,
    });
  };

  const handleCheckout = (price) => {
    if (items.length !== 0) {
      loadPricing(price);
      history.push("/checkout");
    } else {
      openNotification("topLeft");
    }
  };
  return (
    <div>
      <Scrollbars style={{ height: "calc(50vh - 100px)" }}>
        {items &&
          mapIndexed((item, index) => (
            <div key={index}>
              <Row justify="space-between">
                <Col>{item.name}</Col>
                <Col>{Number(item.price * item.quantity).toFixed(2)}€</Col>
              </Row>
              <Row justify="space-between">
                <Col flex="2px">
                  <Button
                    type="text"
                    size="small"
                    onClick={() => deleteFromCart(item.id)}>
                    <CloseOutlined /> Remove
                  </Button>
                </Col>
                <Col>
                  <Counter item={item} modifyFromCart={modifyFromCart} />
                </Col>
              </Row>
            </div>
          ))(items)}
      </Scrollbars>
      <div style={{ height: "100px" }}>
        <Row justify="space-between">
          <Col>Total</Col>
          <Col>{Number(price.subPrice).toFixed(2)}€</Col>
        </Row>
        <Row justify="space-between">
          <Col>Delivery</Col>
          <Col>{Number(price.delivery).toFixed(2)}€</Col>
        </Row>
        <Row justify="space-between">
          <Col>Total</Col>
          <Col>{Number(price.totalPrice).toFixed(2)}€</Col>
        </Row>
        <Row justify="space-between">
          <Col></Col>
          <Col>{Number(price.totalDollar).toFixed(2)}$</Col>
        </Row>
      </div>
      <Button type="primary" block onClick={() => handleCheckout(price)}>
        Checkout
      </Button>
    </div>
  );
};
const CustomCart = ({
  history,
  cart,
  clearCart,
  deleteFromCart,
  modifyFromCart,
  loadPricing,
  config,
}) => {
  const price = { delivery: config ? config.delivery_fees : 5 };
  return (
    <Card
      hoverable
      title="Your cart"
      extra={
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a href="#" onClick={clearCart}>
          Clear all
        </a>
      }
      style={{ width: 400 }}
      className="side-card">
      <Content
        history={history}
        price={price}
        cart={cart}
        deleteFromCart={deleteFromCart}
        modifyFromCart={modifyFromCart}
        loadPricing={loadPricing}
      />
    </Card>
  );
};

export default CustomCart;
