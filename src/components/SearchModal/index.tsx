import { IconSearch } from "@douyinfe/semi-icons";
import { AutoComplete, Modal, Tag } from "@douyinfe/semi-ui";
import { Input } from "@douyinfe/semi-ui/lib/es/input";
import { ModalReactProps } from "@douyinfe/semi-ui/lib/es/modal";
import { TagColor } from "@douyinfe/semi-ui/lib/es/tag";
import React, { useState } from "react";
import { findMatchedArrays, SearchItem } from "../../data";
import { colors } from "../../pages/Index";

type Props = ModalReactProps & {};

export default function SearchModal(props: Props) {
  const [data, setData] = useState<SearchItem[]>([]);

  const search = (value: string) => {
    let result: SearchItem[] = [];
    if (value) {
      result = findMatchedArrays(value).map((v) => ({
        ...v,
        value: v.items,
      }));
    } else {
      result = [];
    }

    setData(result);
  };

  return (
    <Modal title="基本对话框" {...props} closeOnEsc={true}>
      <div className="px-4 py-8 ">
        <Input
          onChange={(e) => {
            search(e);
          }}
          prefix={<IconSearch />}
          style={{ width: "100%" }}
        ></Input>
        <div
          className="mt-2 overflow-auto flex justify-center"
          style={{ height: 500 }}
        >
          {data.map((v, i) => {
            return (
              <div className="mr-2 flex-1">
                <Tag
                  color={colors[i] as TagColor}
                  className="mb-1"
                  type="light"
                >
                  {v.label}
                </Tag>
                <div className="ml-1">
                  {v.items.map((item) => {
                    return <div>{item} </div>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
