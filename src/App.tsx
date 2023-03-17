import "./App.css";
import "./i18n/config";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layout, Nav, Select, Button, Input } from "@douyinfe/semi-ui";
import { HotKeys } from "react-hotkeys";
import {
  IconGithubLogo,
  IconHelpCircle,
  IconHome,
  IconLanguage,
  IconListView,
  IconSearch,
} from "@douyinfe/semi-icons";
import { useTranslation } from "react-i18next";
import FxemojiOncomingpolicecar from "./assets/icons/FxemojiOncomingpolicecar";
import SearchModal from "./components/SearchModal";
import { useBoolean } from "ahooks";
import { useEffect, useState } from "react";
const keyMap = {
  SEARCH: ["ctrl+k", "command+k"],
};
function App() {
  const { Header, Content } = Layout;
  const [state, { setTrue, setFalse }] = useBoolean(false);
  const [selectedKey, setSelectedKey] = useState(["/"]);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    // Google Analytics
    const { pathname } = location;
    setSelectedKey([pathname]);
  }, [location]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const handlers = {
    SEARCH: (e?: KeyboardEvent) => {
      e?.preventDefault();
      setTrue();
    },
  };
  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      <Layout className="h-screen">
        <Header style={{ backgroundColor: "var(--semi-color-bg-2)" }}>
          <div>
            <Nav
              mode="horizontal"
              selectedKeys={selectedKey}
              onSelect={(data) => {
                setSelectedKey([data.itemKey as string]);
                navigate(data.itemKey as string);
              }}
            >
              <Nav.Header>
                <div className="flex items-center">
                  <FxemojiOncomingpolicecar fontSize={24} className="mr-4" />
                  <div className="text-2xl font-bold flex ">
                    <div
                      // className="mr-1"
                      style={{
                        boxShadow: "0 1px 0 0 var(--semi-color-danger)",
                      }}
                    >
                      {t("header.title.part1")}
                    </div>
                    <div
                      style={{
                        boxShadow: "0 1px 0 0 var(--semi-color-primary)",
                      }}
                    >
                      {t("header.title.part2")}
                    </div>
                  </div>
                </div>
              </Nav.Header>
              <Nav.Item
                itemKey="/"
                text={t("header.home")}
                style={{ marginBottom: 0, marginRight: 10 }}
                icon={<IconHome size="large" />}
              />
              <Nav.Item
                itemKey="/index"
                text={t("header.index")}
                style={{ marginBottom: 0, marginRight: 10 }}
                icon={<IconListView size="large" />}
              />
              {/* <Nav.Item
                itemKey="/about"
                text={t("header.about")}
                style={{ marginBottom: 0, marginRight: 10 }}
                icon={<IconHelpCircle size="large" />}
              /> */}
              <Nav.Footer>
                <Button
                  theme="borderless"
                  type="tertiary"
                  onClick={() => {
                    window.open(
                      "https://github.com/BarrySong97?tab=repositories",
                      "_blank"
                    );
                  }}
                  style={{ marginRight: 10 }}
                  icon={<IconGithubLogo size="large" />}
                />
                <div
                  style={{ marginRight: 10 }}
                  className="cursor-pointer"
                  onClick={() => {}}
                >
                  <Input
                    disabled
                    className="pointer-events-none"
                    prefix={<IconSearch />}
                    placeholder={t("header.search")}
                  />
                </div>
                <Select
                  defaultValue="en"
                  onChange={(value) => changeLanguage(value as string)}
                  style={{ width: 200, marginRight: 10 }}
                  insetLabel={<IconLanguage />}
                >
                  <Select.Option value="zh">中文</Select.Option>
                  <Select.Option value="en">English</Select.Option>
                </Select>
              </Nav.Footer>
            </Nav>
          </div>
        </Header>
        <Content className="p-4" style={{ backgroundColor: "#fbfbfb" }}>
          <Outlet />
        </Content>
      </Layout>
      <SearchModal
        title={null}
        width={700}
        header={null}
        closeIcon={null}
        hasCancel={false}
        visible={state}
        onCancel={setFalse}
        onOk={setFalse}
        footer={false}
      />
    </HotKeys>
  );
}

export default App;
