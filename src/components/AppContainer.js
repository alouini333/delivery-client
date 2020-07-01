import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeUser, logout, getConfig } from "../state/actions";
import "../App.less";
import { changeToken } from "../state/actions/authentication";

const AppContainer = ({
  children,
  history,
  setUser,
  logout,
  getConfig,
  user,
  config,
  refreshToken,
}) => {
  const { Header, Content, Footer } = Layout;
  const { SubMenu, Item } = Menu;
  const onLogout = () => {
    logout();
    setUser(null);
    history.push("/");
  };
  useEffect(() => {
    const expires_in = localStorage.getItem("expires_in");
    if (expires_in !== null) {
      const date = new Date();
      const now = date.getTime();
      if (expires_in < now) {
        refreshToken();
      }
    }
    if (user === null) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [user, setUser, refreshToken]);
  useEffect(() => {
    getConfig();
  }, [getConfig]);
  return (
    <Layout className="App">
      <Header className="nav-bar">
        <img
          src={config ? config.logo : null}
          style={{ float: "left" }}
          onClick={() => history.push("/")}
          alt=""
        />
        {user === null && (
          <Menu theme="dark" mode="horizontal" style={{ float: "right" }}>
            <Item
              key="signup"
              onClick={() => history.push("/signup")}
              title="Signup">
              Sign Up
            </Item>
            <Item
              key="signin"
              onClick={() => history.push("/login")}
              title="Signup">
              Sign In
            </Item>
          </Menu>
        )}
        {user !== null && (
          <Menu theme="dark" mode="horizontal" style={{ float: "right" }}>
            <SubMenu
              key="app"
              title={`Hello, ${user.name}`}
              icon={<UserOutlined />}>
              <Item key="orders" onClick={() => history.push("/orders")}>
                My orders
              </Item>
              <Item key="signin" onClick={onLogout}>
                Logout
              </Item>
            </SubMenu>
          </Menu>
        )}
      </Header>
      <Content history={history} className="content">
        {children}
      </Content>
      <Footer>{config ? config.footer : "footer 2020"}</Footer>
    </Layout>
  );
};

const mapStateToProps = ({ user, config }) => ({
  user,
  config,
});

const mapDispatchToPros = (dispatch) => ({
  setUser: (user) => dispatch(changeUser(user)),
  logout: () => dispatch(logout()),
  getConfig: () => dispatch(getConfig()),
  refreshToken: () => dispatch(changeToken()),
});
export default connect(mapStateToProps, mapDispatchToPros)(AppContainer);
