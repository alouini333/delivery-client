import React from "react";
import { Form, Input, Button, Col, Typography } from "antd";
import { MailFilled, LockFilled } from "@ant-design/icons";
import { connect } from "react-redux";
import { loginUser } from "../../state/actions";

const LoginForm = ({ history, login, user }) => {
  const { Title } = Typography;
  const onFinish = (values) => {
    login(values);
    history.push("/");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="auth-container">
      <Col span={8} className="auth-form">
        <Title level={2}>Sign In</Title>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your login!" }]}>
            <Input placeholder="Email" prefix={<MailFilled />} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
            ]}>
            <Input
              placeholder="Password"
              prefix={<LockFilled />}
              type="password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToPros = (dispatch) => ({
  login: (credentials) => dispatch(loginUser(credentials)),
});
export default connect(mapStateToProps, mapDispatchToPros)(LoginForm);
