import getInferenceAction from "@/actions/getInference";
import { MindeeProduct } from "@/types";

export async function POST(
  request: Request,
  { params }: { params: { product: MindeeProduct } }
) {
  const data = await request.formData();
  try {
    const result = await getInferenceAction({ data, product: params.product });
    return Response.json(result);
  } catch (error) {
    return Response.json(error, {
      status: 500,
    });
  }
}
