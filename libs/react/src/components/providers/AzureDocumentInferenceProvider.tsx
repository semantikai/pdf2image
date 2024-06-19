interface Props {
  children: React.ReactNode;
  inferenceResponse: any;
}
export default function AzureDocumentInferenceProvider({
  children,
  inferenceResponse,
}: Props) {
  return <div>{children}</div>;
}
