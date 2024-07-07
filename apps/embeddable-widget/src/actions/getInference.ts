"use server";

import axios from "axios";

const MINDEE_PRODUCT_URLS = {
  invoice: "https://api.mindee.net/v1/products/mindee/invoices/v4/predict",
};

export default async function getInferenceAction({ data }: { data: FormData }) {
  try {
    const response = await axios(MINDEE_PRODUCT_URLS.invoice, {
      method: "POST",
      headers: {
        Authorization: "Token 334ef3464c1c2ff489f1f1d00cde7b54",
      },
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
