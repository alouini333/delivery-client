import React, { useEffect } from "react";
import { Col, Row, Typography, Affix, Anchor } from "antd";
import { map, isEmpty, filter, addIndex } from "ramda";
import { connect } from "react-redux";
import {
  loadProducts,
  addTocart,
  clearCart,
  deleteFromCart,
  modifyFromCart,
  loadPricing,
} from "../../state/actions";
import Card from "../../components/HorizontalCard";
import Cart from "../../components/Cart";

const Menu = ({
  history,
  loadProducts,
  addTocart,
  clearCart,
  deleteFromCart,
  modifyFromCart,
  loadPricing,
  menu,
  cart,
  config,
}) => {
  const { Title } = Typography;
  const { Link } = Anchor;
  var mapIndexed = addIndex(map);
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);
  const loadedPizzas =
    menu && !isEmpty(menu.products) ? menu.products[0].products : [];
  const loadedPasta =
    menu && !isEmpty(menu.products) ? menu.products[1].products : [];
  const loadedDrinks =
    menu && !isEmpty(menu.products) ? menu.products[2].products : [];
  return (
    <div className="auth-container">
      <Col className="auth-form">
        <Title level={2}>Menu</Title>
        <Anchor targetOffset={85} offsetTop={60}>
          <Row>
            <Col flex={3}>
              <Link href="#pizzas" title="Pizzas" />
            </Col>
            <Col flex={3}>
              <Link href="#pasta" title="Pasta" />
            </Col>
            <Col flex={3}>
              <Link href="#drinks" title="Drinks" />
            </Col>
          </Row>
        </Anchor>
        <Title level={3} id="pizzas">
          Pizzas
        </Title>
        <Row gutter={[16, 16]} align="center" justify="center">
          {loadedPizzas &&
            mapIndexed((card, index) => (
              <Col key={index} span={24}>
                <Card card={card} addTocart={addTocart} />
              </Col>
            ))(filter((pizza) => !isEmpty(pizza))(loadedPizzas))}
        </Row>
        <Title level={3} id="pasta">
          Pasta
        </Title>
        <Row gutter={[16, 16]} align="center" justify="center">
          {loadedPasta &&
            mapIndexed((card, index) => (
              <Col key={index} span={24}>
                <Card card={card} addTocart={addTocart} />
              </Col>
            ))(filter((burger) => !isEmpty(burger))(loadedPasta))}
        </Row>
        <Title level={3} id="drinks">
          Drinks
        </Title>
        <Row gutter={[16, 16]} align="center" justify="center">
          {loadedDrinks &&
            mapIndexed((card, index) => (
              <Col key={index} span={24}>
                <Card card={card} addTocart={addTocart} />
              </Col>
            ))(filter((drink) => !isEmpty(drink))(loadedDrinks))}
        </Row>
      </Col>
      <Affix offsetTop={64}>
        <Cart
          history={history}
          cart={cart}
          clearCart={clearCart}
          deleteFromCart={deleteFromCart}
          modifyFromCart={modifyFromCart}
          config={config}
          loadPricing={loadPricing}
        />
      </Affix>
    </div>
  );
};

const mapStateToProps = ({ menu, cart, config }) => ({
  menu,
  cart,
  config,
});

const mapDispatchToPros = (dispatch) => ({
  loadProducts: () => dispatch(loadProducts()),
  addTocart: (payload, quantity) => dispatch(addTocart(payload, quantity)),
  clearCart: () => dispatch(clearCart()),
  deleteFromCart: (id) => dispatch(deleteFromCart(id)),
  modifyFromCart: (payload) => dispatch(modifyFromCart(payload)),
  loadPricing: (payload) => dispatch(loadPricing(payload)),
});
export default connect(mapStateToProps, mapDispatchToPros)(Menu);
