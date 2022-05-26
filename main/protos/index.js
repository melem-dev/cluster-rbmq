import Products from "../entities/Products.js";

export const protoProducts = [
  {
    queue: "new-products",
    cb: async ({ content }) => {
      const productDetails = JSON.parse(content.toString());
      await Products.save(productDetails);
    },
  },
];
