import { USER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    // signup: builder.mutation({
    //   query: (data) => ({
    //     url: `${USER_URL}/signUp`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    userLogout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useUserLogoutMutation } =
  userApiSlice;
