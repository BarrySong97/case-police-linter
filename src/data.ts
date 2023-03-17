import Brand from "./dict/brands.json";
import General from "./dict/general.json";
import Product from "./dict/products.json";
import Software from "./dict/softwares.json";
import Abbreviates from "./dict/abbreviates.json";

const abbreviates = Object.keys(Abbreviates as Record<string, string>).map(
  (key) => {
    return (Abbreviates as Record<string, string>)[key];
  }
);

const brands = Object.keys(Brand as Record<string, string>).map((key) => {
  return (Brand as Record<string, string>)[key];
});

const products = Object.keys(Product as Record<string, string>).map((key) => {
  return (Product as Record<string, string>)[key];
});

const softwares = Object.keys(Software as Record<string, string>).map((key) => {
  return (Software as Record<string, string>)[key];
});

const general = Object.keys(General as Record<string, string>).map((key) => {
  return (General as Record<string, string>)[key];
});

export type SearchItem = {
  label: string;
  items: string[];
};

function findMatchedArrays(str: string): SearchItem[] {
  const arrays = [
    { name: "abbreviates", items: abbreviates },
    { name: "brands", items: brands },
    { name: "products", items: products },
    { name: "softwares", items: softwares },
    { name: "general", items: general },
  ];

  const result: SearchItem[] = [];

  for (let i = 0; i < arrays.length; i++) {
    const array = arrays[i];
    const items = [];
    for (let j = 0; j < array.items.length; j++) {
      const item = array.items[j];
      if (item.toLocaleLowerCase().includes(str.toLocaleLowerCase())) {
        items.push(item);
      }
    }
    if (items.length > 0) {
      result.push({
        label: array.name,
        items,
      });
    }
  }

  return result;
}
export { findMatchedArrays, brands, products, softwares, general, abbreviates };
