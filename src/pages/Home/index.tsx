import { abbreviates, brands, general, products, softwares } from "../../data";
import { useEffect, useRef, useState } from "react";
import { useLocalStorageState } from "ahooks";
import "./index.css";
import { useTranslation } from "react-i18next";

type Props = {};

const regex = /\b[a-z]+\b(?!:\/\/)/gi;
type resultItem = {
  right: string;
  wrong: string;
};
export default function Home({}: Props) {
  const editableDiv = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const [inputHtml, setInputHtml] = useLocalStorageState<string | undefined>(
    "inputHtml",
    {
      defaultValue:
        "<span class='marked-text' ><span class='marked-text-with-line-through'>github</span><span class='right-text'>GitHub</span></span>",
    }
  );

  useEffect(() => {
    if (editableDiv.current) {
      editableDiv.current.focus();
      if (inputHtml) {
        editableDiv.current.innerHTML = inputHtml;
        if (editableDiv.current) {
          const range = document.createRange();
          range.selectNodeContents(editableDiv.current);
          range.collapse(false);
          const sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
        }
      }
    }
  }, []);

  function handleInput(event: React.FormEvent<HTMLDivElement>): void {
    const text = event.currentTarget.innerHTML;
    const words = event.currentTarget.innerText.match(regex);

    const matches = [
      ...abbreviates,
      ...brands,
      ...general,
      ...products,
      ...softwares,
    ];

    const result: resultItem[] = [];
    let markedText = text;
    words?.forEach((string) => {
      matches?.forEach((word) => {
        const alreadyMarked = result.find(
          (item) => item.right === word && item.wrong === string
        );
        if (
          !alreadyMarked &&
          string !== word &&
          string.toLowerCase() === word.toLowerCase()
        ) {
          markedText = markedText?.replace(
            string,
            `<span class='marked-text' ><span class='marked-text-with-line-through'>${string}</span><span class='right-text'>${word}</span></span>`
          );
          result.push({
            right: word,
            wrong: string,
          });
        }
      });
    });
    if (markedText !== text) {
      event.currentTarget.innerHTML = markedText;
      if (editableDiv.current) {
        const range = document.createRange();
        range.selectNodeContents(editableDiv.current);
        range.collapse(false);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
    setInputHtml(markedText);
  }

  return (
    <div className="flex h-full ">
      <div className="flex-1 flex flex-col h-full">
        <div
          className="hero-word mb-10 font-display text-3xl md:text-4xl font-extrabold sm:text-4xl lg:text-[length:34px] lg:leading-[56px] xl:text-7xl"
          // style={{ width: 500 }}
        >
          {t("home.hero.part1")}{" "}
          <span style={{ color: "var(--semi-color-primary)" }}>
            {t("home.hero.part2")}
          </span>{" "}
          {t("home.hero.part3")}{" "}
          <span style={{ color: "var(--semi-color-danger)" }}>
            {t("home.hero.part4")}
          </span>{" "}
          {t("home.hero.part5")}
        </div>
        <div className="case flex mb-4 flex-1 justify-center items-center">
          <div className="flex-1">
            <div
              className="mb-2 text-center font-display text-xl font-extrabold"
              style={{ color: "var(--semi-color-danger)" }}
            >
              {t("home.case.bad")}
            </div>
            <div className="caseItem font-bold text-black">
              <ul>
                <li>Github</li>
                <li>Typescript</li>
                <li>MacOS</li>
              </ul>
            </div>
          </div>
          <div className="flex-1">
            <div
              style={{ color: "var(--semi-color-primary)" }}
              className="mb-2  text-xl font-extrabold text-center"
            >
              {t("home.case.good")}
            </div>
            <div className="caseItem font-bold text-black">
              <ul>
                <li>GitHub</li>
                <li>TypeScript</li>
                <li>macOS</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-2xl text-center flex-1 flex items-center justify-center flex-col">
          <div>
            Copy your text or Resume into editor and see the how many case error
            you have?
          </div>
          <div>Don't let the case police arrest you~🤣</div>
        </div>
      </div>
      <div
        contentEditable="true"
        ref={editableDiv}
        className="h-full overflow-auto home-editor flex-1 bg-white"
        onInput={handleInput}
      ></div>
    </div>
  );
}
