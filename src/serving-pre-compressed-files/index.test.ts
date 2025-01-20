import { handler } from "./index";
import { CloudFrontRequestEvent, CloudFrontRequest, Context } from "aws-lambda";

function executeHandler(request: Partial<CloudFrontRequest>) {
  return handler(
    {
      Records: [
        {
          cf: {
            request: {
              clientIp: "test",
              method: "GET",
              uri: "/",
              querystring: "",
              headers: {},
              ...request,
            },
            config: {
              distributionDomainName: "test",
              distributionId: "test",
              eventType: "origin-request",
              requestId: "test",
            },
          },
        },
      ],
    },
    {
      awsRequestId: "test",
      callbackWaitsForEmptyEventLoop: true,
      logGroupName: "test",
      logStreamName: "test",
      functionName: "test",
      memoryLimitInMB: "test",
      functionVersion: "test",
      invokedFunctionArn: "test",
      getRemainingTimeInMillis: () => 1000,
      done: () => {},
      fail: () => {},
      succeed: () => {},
    },
    () => {},
  );
}

describe("handler", () => {
  it("Serve index.html without compression", async () => {
    const request: Partial<CloudFrontRequest> = {
      uri: "/original-file",
    };

    const result = (await executeHandler(request)) as CloudFrontRequest;
    expect(result.uri).toBe("/original-file/index.html");
  });

  it("Serve index.html with gz compression", async () => {
    const request: Partial<CloudFrontRequest> = {
      uri: "/original-file",
      headers: {
        "accept-encoding": [{ key: "", value: "gzip" }],
      },
    };

    const result = (await executeHandler(request)) as CloudFrontRequest;
    expect(result.uri).toBe("/original-file/index.html.gz");
  });
  it("Serve index.html with gz compression", async () => {
    const request: Partial<CloudFrontRequest> = {
      uri: "/original-file",
      headers: {
        "accept-encoding": [{ key: "", value: "gzip, br" }],
      },
    };

    const result = (await executeHandler(request)) as CloudFrontRequest;
    expect(result.uri).toBe("/original-file/index.html.br");
  });

  it("Serve index.html with br compression", async () => {
    const request: Partial<CloudFrontRequest> = {
      uri: "/original-file/a.json",
      headers: {
        "accept-encoding": [{ key: "", value: "gzip, br" }],
      },
    };

    const result = (await executeHandler(request)) as CloudFrontRequest;
    expect(result.uri).toBe("/original-file/a.json.br");
  });

  it("Serve as requested", async () => {
    const request: Partial<CloudFrontRequest> = {
      uri: "/original-file/a.gz",
      headers: {
        "accept-encoding": [{ key: "", value: "gzip, br" }],
      },
    };

    const result = (await executeHandler(request)) as CloudFrontRequest;
    expect(result.uri).toBe("/original-file/a.gz");
  });
});
