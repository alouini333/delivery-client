import React from "react";
import { Row, Col, Button } from "antd";

const Counter = ({ quantity, setQuantity }) => {
  const increment = () => {
    if (quantity > 0) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <Row gutter={8}>
      <Col>
        <Button
          size="small"
          shape="circle-outline"
          onClick={decrement}
          disabled={quantity <= 1}>
          -
        </Button>
      </Col>
      <Col>
        <h3>{quantity}</h3>
      </Col>
      <Col>
        <Button size="small" shape="circle-outline" onClick={increment}>
          +
        </Button>
      </Col>
    </Row>
  );
};

export default Counter;
