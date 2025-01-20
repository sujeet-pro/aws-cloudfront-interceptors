import { CloudFrontHeaders } from "aws-lambda";

export function getHeaderValueFromCloudfrontHeaders(
  headers: CloudFrontHeaders,
  headerName: string,
): string {
  try {
    const header = headers?.[headerName.toLowerCase()];
    return header?.[0]?.value ?? "";
  } catch (err) {
    console.error(`Error getting header ${headerName}`, err);
    return "";
  }
}
