"use server";

import axios, { Axios, AxiosError } from "axios";

const MINDEE_PRODUCT_URLS = {
  invoice: "https://api.mindee.net/v1/products/mindee/invoices/v4/predict",
};

export default async function getInferenceAction({ data }: { data: FormData }) {
  try {
    const response = await axios(MINDEE_PRODUCT_URLS.invoice, {
      headers: {
        Authorization: "Token 334ef3464c1c2ff489f1f1d00cde7b54",
        "Content-Type": "multipart/form-data",
      },
      data,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      console.error(error);
    }
  }
}
