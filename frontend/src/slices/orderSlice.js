import { ORDER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const orderSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDER_URL}/addorder`,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
      }),
    }),
  }),
});

export const { useAddOrderMutation, useGetOrderByIdQuery } = orderSlice;
