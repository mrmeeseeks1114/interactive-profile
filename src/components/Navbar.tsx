import { Switch } from "antd";

import {
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";

interface NavbarProps {
  username: string;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Navbar({
  username,
  darkMode,
  setDarkMode,
}: NavbarProps) {
  return (
    <nav className="navbar">

      <div className="logo">
        MESEEKS.EXE
      </div>

      <div className="nav-right">

        <span className="username">
          @{username}
        </span>

        <Switch
          checked={darkMode}
          onChange={setDarkMode}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
        />

      </div>

    </nav>
  );
}