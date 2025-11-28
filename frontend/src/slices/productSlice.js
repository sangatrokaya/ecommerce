import { addProduct } from "../../../backend/controllers/product.controller";
import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => {
        const params = {}; /* Build params object conditionally */

        params.pageNumber =
          pageNumber ||
          1; /* Always include pageNumber, default to 1 if not provided */

        // Only include keyword if it exists and is not empty
        if (keyword && keyword.trim() !== "") {
          params.keyword = keyword;
        }

        return {
          url: PRODUCT_URL,
          params,
        };
      },
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
      invalidatesTags: ["Product"],
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
    addReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data._id}/addreview`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/topproducts`,
      }),
      keepUnusedDataFor: 5,
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
  useAddReviewMutation,
  useGetTopProductsQuery,
} = productSlice;
