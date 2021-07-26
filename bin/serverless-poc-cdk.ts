#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ServerlessPocCdkStack } from '../lib/serverless-poc-cdk-stack';

const app = new cdk.App();
new ServerlessPocCdkStack(app, 'ServerlessPocCdkStack');
