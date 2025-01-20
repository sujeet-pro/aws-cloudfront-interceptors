// Origin Request Interceptor Lamba@edge function

import { CloudFrontRequestHandler } from "aws-lambda";
import { getUriForCompressed } from "./uri-for-compressed";
import { updateUriForIndexHtml } from "./serve-index-html-for-path";

export const handler: CloudFrontRequestHandler = async (event) => {
  const request = event.Records[0].cf.request;
  request.uri = updateUriForIndexHtml(request.uri);
  request.uri = getUriForCompressed(request);

  return request;
};
