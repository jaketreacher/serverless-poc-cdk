#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { ServiceStack } from "./lib/stacks/service-stack";

const app = new cdk.App();
new ServiceStack(app, "ServiceStack");

app.synth();
