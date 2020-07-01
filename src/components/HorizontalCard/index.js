import React, { useState } from "react";
import { Card, Row, Col, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../../App.less";

const Counter = ({ count, setCount }) => {
  return (
    <Row gutter={8}>
      <Col>
        <Button
          size="small"
          shape="circle-outline"
          onClick={() => setCount(count - 1)}
          disabled={count <= 1}>
          -
        </Button>
      </Col>
      <Col>
        <h3>{count}</h3>
      </Col>
      <Col>
        <Button
          size="small"
          shape="circle-outline"
          onClick={() => setCount(count + 1)}>
          +
        </Button>
      </Col>
    </Row>
  );
};

const HorizontalCard = ({ card, addTocart }) => {
  const { Meta } = Card;
  const [count, setCount] = useState(1);
  return (
    <Card
      loading={!card}
      style={{ width: "100%" }}
      actions={[
        <span> {card ? Number(card.price * count).toFixed(3) : null} €</span>,
        <Counter count={count} setCount={setCount} />,
        <Button onClick={() => addTocart(card, count)} type="text">
          <PlusOutlined /> Add to cart
        </Button>,
      ]}>
      <Row gutter={[16, 16]} justify="space-between">
        <Col span={8}>
          <img alt={card ? card.name : null} src={card ? card.picture : null} />
        </Col>
        <Col span={16}>
          <Meta
            title={card ? card.name : null}
            description={
              card
                ? card.ingredient_names
                  ? card.ingredient_names
                  : card.description
                : null
            }
          />
        </Col>
      </Row>
    </Card>
  );
};

export default HorizontalCard;
