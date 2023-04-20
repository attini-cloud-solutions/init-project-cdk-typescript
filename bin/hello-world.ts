#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import {HelloWorldStack} from '../lib/hello-world-stack';
import {AttiniRuntimeVariables} from '@attini/cdk';

const stackPrefix = process.env[AttiniRuntimeVariables.ENVIRONMENT] ?? 'dev';

const app: cdk.App = new cdk.App();

export const stackId = 'HelloWorldStack'

new HelloWorldStack(app, 'HelloWorldStack', {
    stackName: stackPrefix + "-hello-world-stack",
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
    }
});
