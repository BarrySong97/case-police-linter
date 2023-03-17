import copy from "copy-to-clipboard";
import type { TagColor } from "@douyinfe/semi-ui/lib/es/tag";
import { abbreviates, brands, general, products, softwares } from "../../data";
import { TabPane, Tabs, Tag } from "@douyinfe/semi-ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {};

export const colors = [
  "amber",
  "blue",
  "cyan",
  "grey",
  "indigo",
  "light-blue",
  "light-green",
  "lime",
  "orange",
  "pink",
  "purple",
  "red",
  "teal",
  "violet",
  "yellow",
  "white",
];
export default function Index({}: Props) {
  const [tabKey, setTabKey] = useState("brands");
  const { t } = useTranslation();

  const renderChip = (name: string, color: string, index: number) => {
    return (
      <div
        onClick={() => {
          copy(name);
        }}
        key={name + color + index}
        className="badge w-full cursor-pointer "
      >
        <Tag color={color as TagColor} type="solid" className="w-full">
          {name}
        </Tag>
      </div>
    );
  };

  const renderContainer = (arr: string[], color: string) => {
    return (
      <div
        className="grid gap-4 grid-cols-8 grid-rows-3"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        }}
      >
        {arr.map((brand, i) => renderChip(brand, color, i))}
      </div>
    );
  };

  const tabs = [
    {
      key: "brands",
      tab: t("index.brand"),
      content: renderContainer(brands, colors[0]),
    },
    {
      key: "general",
      tab: t("index.general"),
      content: renderContainer(general, colors[1]),
    },
    {
      key: "products",
      tab: t("index.product"),
      content: renderContainer(products, colors[2]),
    },
    {
      key: "softwares",
      tab: t("index.software"),
      content: renderContainer(softwares, colors[3]),
    },
    {
      key: "abbreviates",
      tab: t("index.abbreviation"),
      content: renderContainer(abbreviates, colors[4]),
    },
  ];

  return (
    <div>
      <Tabs activeKey={tabKey} type="button" onChange={(key) => setTabKey(key)}>
        {tabs.map((tab) => {
          return (
            <TabPane key={tab.key} tab={tab.tab} itemKey={tab.key}>
              {tab.content}
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
}
