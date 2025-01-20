import { CloudFrontRequest } from "aws-lambda";
import { getHeaderValueFromCloudfrontHeaders } from "../common/cloudfront-lambda-request.utils";

// Order of config matters! The first matching config will be used.
const compressionConfig = [
  {
    ext: ".br",
    encoding: "br",
  },
  {
    ext: ".gz",
    encoding: "gzip",
  },
];

export function getUriForCompressed(request: CloudFrontRequest): string {
  const uri = request.uri;
  const isAlreadyCompressedUri = compressionConfig.some((config) =>
    uri.endsWith(config.ext),
  );
  if (isAlreadyCompressedUri) {
    return uri;
  }

  const acceptEncoding = getHeaderValueFromCloudfrontHeaders(
    request.headers,
    "Accept-Encoding",
  );

  for (const config of compressionConfig) {
    if (acceptEncoding.includes(config.encoding)) {
      return uri + config.ext;
    }
  }
  return uri;
}
