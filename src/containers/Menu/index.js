import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  Affix,
  Anchor,
  Drawer,
  Button,
  Layout,
  List,
} from "antd";
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
import Item from "../../components/Item";

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
  const { Footer } = Layout;
  const [collapse, setCollapse] = useState(window.innerWidth >= 1000);
  const [visible, setVisible] = useState(false);
  const { Title } = Typography;
  const { Link } = Anchor;
  var mapIndexed = addIndex(map);
  useEffect(() => {
    const layoutWidth = () => {
      const shouldCollapse = window.innerWidth >= 1000;
      if (collapse !== shouldCollapse) setCollapse(!collapse);
    };
    window.addEventListener("resize", layoutWidth);
    return () => {
      window.removeEventListener("resize", layoutWidth);
    };
  }, [collapse]);

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
            collapse &&
            mapIndexed((card, index) => (
              <Col key={index} span={24}>
                <Card card={card} addTocart={addTocart} />
              </Col>
            ))(filter((pizza) => !isEmpty(pizza))(loadedPizzas))}
          {loadedPizzas && !collapse && (
            <List
              style={{
                textAlign: "left",
                width: "100%",
                paddingBottom: "20px",
              }}
              header={""}
              bordered
              dataSource={loadedPizzas}
              renderItem={(product) => (
                <Item product={product} addTocart={addTocart} />
              )}
            />
          )}
        </Row>
        <Title level={3} id="pasta">
          Pasta
        </Title>
        <Row gutter={[16, 16]} align="center" justify="center">
          {loadedPasta &&
            collapse &&
            mapIndexed((card, index) => (
              <Col key={index} span={24}>
                <Card card={card} addTocart={addTocart} />
              </Col>
            ))(filter((pasta) => !isEmpty(pasta))(loadedPasta))}
          {loadedPasta && !collapse && (
            <List
              style={{
                textAlign: "left",
                width: "100%",
                paddingBottom: "20px",
              }}
              header={""}
              bordered
              dataSource={loadedPasta}
              renderItem={(product) => (
                <Item product={product} addTocart={addTocart} />
              )}
            />
          )}
        </Row>
        <Title level={3} id="drinks">
          Drinks
        </Title>
        <Row gutter={[16, 16]} align="center" justify="center">
          {loadedDrinks &&
            collapse &&
            mapIndexed((card, index) => (
              <Col key={index} span={24}>
                <Card card={card} addTocart={addTocart} />
              </Col>
            ))(filter((drink) => !isEmpty(drink))(loadedDrinks))}
          {loadedDrinks && !collapse && (
            <List
              style={{
                textAlign: "left",
                width: "100%",
                paddingBottom: "20px",
              }}
              header={""}
              bordered
              dataSource={loadedDrinks}
              renderItem={(product) => (
                <Item product={product} addTocart={addTocart} />
              )}
            />
          )}
        </Row>
      </Col>
      {collapse ? (
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
      ) : (
        <>
          <Footer
            style={{
              position: "fixed",
              zIndex: 2,
              bottom: 0,
              left: 0,
              padding: 0,
              width: "100%",
              backgroundColor: "transparent",
            }}>
            <Affix offsetTop={450}>
              <Button
                type="primary"
                size="large"
                onClick={() => setVisible(!visible)}>
                Show cart ( {cart.items.length} elements )
              </Button>
            </Affix>
          </Footer>
          <Drawer
            width="80%"
            title="Cart"
            placement="right"
            closable={true}
            visible={visible}
            key="right"
            onClose={() => setVisible(false)}>
            <Cart
              history={history}
              cart={cart}
              clearCart={clearCart}
              deleteFromCart={deleteFromCart}
              modifyFromCart={modifyFromCart}
              config={config}
              loadPricing={loadPricing}
            />
          </Drawer>
        </>
      )}
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
