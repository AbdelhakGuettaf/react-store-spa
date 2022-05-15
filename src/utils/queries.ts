import { Field, Query } from "@tilework/opus";

export const CATEGORIES = new Query("categories", true).addField("name");
export const CURRENCIES = new Query("currencies", true).addFieldList([
  "label",
  "symbol",
]);
export const PDP_DATA = (productId: string) =>
  new Query("product")
    .addArgument("id", "String!", productId)
    .addFieldList(["description", "id", "category"])
    .addField(
      new Field("attributes", true)
        .addFieldList(["id", "name", "type"])
        .addField(
          new Field("items", true).addFieldList(["displayValue", "value", "id"])
        )
    );
export const PRODUCT_DATA_All = (productId: string) =>
  new Query("product")
    .addArgument("id", "String!", productId)
    .addField("name")
    .addField("gallery", true)
    .addFieldList(["name", "inStock", "id", "description", "brand", "category"])
    .addField(
      new Field("attributes", true)
        .addFieldList(["id", "name", "type"])
        .addField(
          new Field("items", true).addFieldList(["displayValue", "value", "id"])
        )
    )
    .addField(
      new Field("prices", true)
        .addField("amount")
        .addField(new Field("currency").addFieldList(["label", "symbol"]))
    );
export const PLP_PRODUCT_DATA = (cat: string) =>
  new Query(`category`)
    .addArgument("input", "CategoryInput", { title: `${cat}` })
    .addField(
      new Field("products", true)
        .addFieldList(["name", "brand", "gallery", "inStock", "id", "category"])
        .addField(
          new Field("prices", true)
            .addField("amount")
            .addField(new Field("currency").addFieldList(["label", "symbol"]))
        )
    );
