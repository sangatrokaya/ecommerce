import { addProduct } from "../../../backend/controllers/product.controller";
import { PRODUCT_URL, UPLOAD_URL } from "../constants";
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
      providesTags: (result, error, id) => [
        { type: "Product", id },
      ] /* Provide a tag for this specific product */,
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
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => {
        console.log(
          "Invalidating Product tag for ID: ",
          arg._id
        ); /* Log the ID being invalidate */
        return [{ type: "Product", id: arg._id }];
      },
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
} = productSlice;
