import React from "react";
import { Result, Button } from "antd";
import { connect } from "react-redux";

const Success = ({ history, user }) => {
  return (
    <Result
      status="success"
      title="Order registered"
      subTitle="Your order has been registered. We won't let you wait for too long."
      extra={
        <>
          <Button type="primary" onClick={() => history.push("/")}>
            Back Home
          </Button>
          {user && (
            <Button type="info" onClick={() => history.push("/orders")}>
              Check orders
            </Button>
          )}
        </>
      }
    />
  );
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, null)(Success);
