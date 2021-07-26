import { Construct } from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigateway from "@aws-cdk/aws-apigateway";

export class RepeatParamService extends Construct {
  constructor(scope: Construct, id: string, api: apigateway.Resource) {
    super(scope, id);

    const repeatParamService = new lambda.Function(
      this,
      "RepeatParamFunction",
      {
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
      }
    );

    api
      .addResource("repeat")
      .addMethod("POST", new apigateway.LambdaIntegration(repeatParamService));
  }
}
