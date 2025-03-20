import { addProduct } from "../../../backend/controllers/product.controller";
import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      providesTags: ["Product"] /* Assign Product tag to cache the data */,
      keepUnusedDataFor: 30,
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
      }),
      keepUnusedDataFor: 30,
    }),
    addProduct: builder.mutation({
      query: () => ({
        url: PRODUCT_URL,
        method: "POST",
      }),
      invalidatesTags: [
        "Product",
      ] /* Invalidates the Product tag which results in the refetch of data */,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
} = productSlice;
