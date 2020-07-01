import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Col,
  Typography,
  Affix,
  Row,
  Select,
  notification,
  Drawer,
  Layout,
} from "antd";
import {
  MailOutlined,
  PhoneFilled,
  EditFilled,
  HomeOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { pick } from "ramda";
import {
  checkout,
  loadPricing,
  clearCart,
  deleteFromCart,
  modifyFromCart,
} from "../../state/actions";
import Cart from "../../components/Cart";

const CheckoutForm = ({
  history,
  checkout,
  cart,
  config,
  user,
  clearCart,
  deleteFromCart,
  modifyFromCart,
  loadPricing,
}) => {
  const { Footer } = Layout;
  const [collapse, setCollapse] = useState(window.innerWidth >= 1000);
  const [visible, setVisible] = useState(false);
  const { Title } = Typography;
  const { TextArea } = Input;
  const { Option } = Select;

  const [method, setMethod] = useState("cash");

  const onChange = (value) => setMethod(value);
  const openNotification = (placement) => {
    notification.error({
      message: `Error`,
      description:
        "You should put some items into the cart before proceeding to payment.",
      placement,
    });
  };
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
  const onFinish = (values) => {
    const items = cart.items.map((item) => pick(["id", "quantity"], item));
    if (items.length === 0) {
      openNotification("top-left");
    } else {
      values.items = items;
      values.method = method;
      checkout(values)
        .then(() => history.push("/success"))
        .catch((error) => {
          console.log(error);
          notification.error({
            message: `Error`,
            description: `Something went wrong during the checkout, please try later`,
            placement: "topRight",
          });
        });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="auth-container">
      <Col className="auth-form">
        <Title level={2}>Check out</Title>
        <Form
          name="checkout"
          initialValues={JSON.parse(localStorage.getItem("user"))}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Row gutter={16}>
            <Col span={24}>
              <Title level={4} className="align-left">
                How can we reach you?
              </Title>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Please input your first name" },
                ]}>
                <Input
                  size="large"
                  placeholder="First name"
                  prefix={<EditFilled />}
                />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: "Please input your phone" },
                ]}>
                <Input
                  size="large"
                  placeholder="Phone"
                  prefix={<PhoneFilled />}
                  type="tel"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="last_name"
                rules={[
                  { required: true, message: "Please input your last name" },
                ]}>
                <Input
                  size="large"
                  placeholder="Last name"
                  prefix={<EditFilled />}
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email" },
                ]}>
                <Input
                  size="large"
                  placeholder="Email"
                  prefix={<MailOutlined />}
                  type="tel"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Title level={4} className="align-left">
                Where do you want your order to be delivered?
              </Title>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}>
                <Input
                  size="large"
                  placeholder="Address"
                  prefix={<HomeOutlined />}
                />
              </Form.Item>
              <Form.Item
                name="floor"
                rules={[{ message: "Please input your floor!" }]}>
                <Input
                  size="large"
                  placeholder="Floor"
                  prefix={<HomeOutlined />}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="post_code"
                rules={[
                  {
                    required: true,
                    pattern: "^[0-9]{5}$",
                    message: "Please input the correct postcode!",
                  },
                ]}>
                <Input
                  size="large"
                  placeholder="Post Code #####"
                  prefix={<HomeOutlined />}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="city"
                rules={[
                  { required: true, message: "Please input your city!" },
                ]}>
                <Input
                  size="large"
                  placeholder="Your city"
                  prefix={<HomeOutlined />}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Title className="align-left" level={4}>
                How would you like to pay?
              </Title>
              <Select
                size="large"
                defaultValue="cash"
                showSearch
                style={{ width: "100%" }}
                onChange={onChange}
                placeholder="Select a payment method "
                optionFilterProp="methods"
                filterOption={(input, option) =>
                  option.methods.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                <Option value="cash">Cash</Option>
                <Option value="card">Credit card</Option>
                <Option value="bitcoin">Bitcoin</Option>
              </Select>
            </Col>
            <Col span={24}>
              <Form.Item style={{ marginTop: 25 }} name="additional_notes">
                <TextArea
                  placeholder="Additional notes"
                  prefix={<EditFilled />}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
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

const mapStateToProps = ({ cart, user }) => ({
  cart,
  user,
});

const mapDispatchToPros = (dispatch) => ({
  checkout: (payload) => dispatch(checkout(payload)),
  loadPricing: (payload) => dispatch(loadPricing(payload)),
  clearCart: () => dispatch(clearCart()),
  deleteFromCart: (id) => dispatch(deleteFromCart(id)),
  modifyFromCart: (payload) => dispatch(modifyFromCart(payload)),
});
export default connect(mapStateToProps, mapDispatchToPros)(CheckoutForm);
