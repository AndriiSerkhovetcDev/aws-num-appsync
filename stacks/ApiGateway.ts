import { StackContext, Api as ApiGateway } from "sst/constructs";

export function ApiGatewayStack({ stack }: StackContext) {
  const apiGateway = new ApiGateway(stack, "ApiGateway", {
    routes: {
      "GET /getHistory": "packages/functions/src/getHistoryList.handler",
      "GET /getLastValue": "packages/functions/src/getLastValue.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: apiGateway.url,
  });
}
