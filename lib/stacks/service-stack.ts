import { Construct, Stack, StackProps } from "@aws-cdk/core";
import * as apigateway from "@aws-cdk/aws-apigateway";
import { HelloWorldService } from "../constructs/hello-world-service";
import { RepeatParamService } from "../constructs/repeat-param-service";

export interface ServiceResources {
  helloWorldService: HelloWorldService;
  repeatParamService: RepeatParamService;
}

export class ServiceStack extends Stack {
  readonly resources: ServiceResources;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, "API", {
      endpointConfiguration: {
        types: [apigateway.EndpointType.REGIONAL],
      },
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
      },
      deployOptions: {
        throttlingBurstLimit: 1,
        throttlingRateLimit: 1,
      },
    });

    const v1 = api.root.addResource("v1");
    const helloWorldService = new HelloWorldService(
      this,
      "HelloWorldService",
      v1
    );
    const repeatParamService = new RepeatParamService(
      this,
      "RepeatParamService",
      v1
    );

    this.resources = {
      helloWorldService,
      repeatParamService,
    };
  }
}
