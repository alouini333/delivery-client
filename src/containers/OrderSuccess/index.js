import React from 'react';
import { Result, Button } from 'antd';

const Success = ({ history }) => {
  return (
    <Result
      status="success"
      title="Order registered"
      subTitle="Your order has been registered. We won't let you wait for too long."
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          Back Home
        </Button>
      }
    />
  );
};

export default Success;
