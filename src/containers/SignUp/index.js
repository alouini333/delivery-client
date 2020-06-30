import React from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Col,
  Typography,
  notification,
} from "antd";
import {
  MailFilled,
  LockFilled,
  PhoneFilled,
  EditFilled,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { signup } from "../../state/actions";

const SignUpForm = ({ history, signup }) => {
  const { Title } = Typography;
  const { Option } = Select;
  const onFinish = (values) => {
    signup(values)
      .then((res) => history.push("/"))
      .catch((err) => {
        let message = "";
        console.log(err.response.data);
        console.log(err.response.data.errors);
        if (err.response.status === 422) {
          const firstKey = Object.keys(err.response.data.errors);
          message = err.response.data.errors[firstKey];
        } else {
          message = "Error while signup";
        }
        notification.error({
          message: `Error`,
          description: `${message}`,
          placement: "topRight",
        });
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="auth-container">
      <Col span={8} className="auth-form">
        <Title level={2}>Sign Up</Title>
        <Form
          name="signup"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input your first name" },
            ]}>
            <Input placeholder="First name" prefix={<EditFilled />} />
          </Form.Item>

          <Form.Item
            name="last_name"
            rules={[
              { required: true, message: "Please input your last name" },
            ]}>
            <Input placeholder="Last name" prefix={<EditFilled />} />
          </Form.Item>

          <Form.Item
            name="gender"
            rules={[{ required: true, message: "Please input your gender" }]}>
            <Select placeholder="Gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email" }]}>
            <Input placeholder="Email" prefix={<MailFilled />} type="email" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Please input your phone" }]}>
            <Input placeholder="Phone" prefix={<PhoneFilled />} type="tel" />
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

          <Form.Item
            name="password_confirmation"
            rules={[
              { required: true, message: "Please input your password!" },
            ]}>
            <Input
              placeholder="Password confirmation"
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
  signup: (payload) => dispatch(signup(payload)),
});

export default connect(mapStateToProps, mapDispatchToPros)(SignUpForm);
