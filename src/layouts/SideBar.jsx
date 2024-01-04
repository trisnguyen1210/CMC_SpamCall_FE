import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import "./style.css";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Test Block Call", "sub1", <MailOutlined />, [
    getItem("Run File", "/"),
    getItem("Results Logs", "/results"),
  ]),
  getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
  ]),
  getItem("Navigation Three", "sub4", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
];

const SideBar = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    navigate(e.keyPath[0]);
  };
  return (
    <>
      <div className="layouts_sidebar">
        <Menu
          className="layout_sidebar_menu"
          onClick={onClick}
          style={{
            width: 256,
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
        <div className="layouts_outlet">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default SideBar;
