import React, { useState } from "react";
import { List, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../../App.less";
import Counter from "../Counter";

const MenuItem = ({ product, addTocart }) => {
  const [count, setCount] = useState(1);
  return (
    <List.Item
      key={product.id}
      actions={[
        <Counter quantity={count} setQuantity={setCount} />,
        <Button onClick={() => addTocart(product, count)} type="text">
          <PlusOutlined /> Add to cart
        </Button>,
      ]}>
      <List.Item.Meta
        title={product.name}
        description={
          product.ingredient_names !== null
            ? product.ingredient_names
            : product.description
        }
      />
      {product.price} €
    </List.Item>
  );
};

export default MenuItem;
