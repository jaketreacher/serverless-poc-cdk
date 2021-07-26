import { Construct } from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigateway from "@aws-cdk/aws-apigateway";

export class HelloWorldService extends Construct {
  constructor(scope: Construct, id: string, api: apigateway.Resource) {
    super(scope, id);

    const helloWorldLambda = new lambda.Function(this, "HelloWorldFunction", {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.handler",
      code: lambda.Code.fromInline(`
        exports.handler = () => {
          return {
            statusCode: 200
            body: "Hello World"
          }
        }
      `), // TODO
    });

    api
      .addResource("hello")
      .addMethod("GET", new apigateway.LambdaIntegration(helloWorldLambda));
  }
}
