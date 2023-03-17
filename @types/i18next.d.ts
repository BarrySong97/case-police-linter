import { resources } from "../src/i18n/config";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: typeof resources["en"];
  }
}
