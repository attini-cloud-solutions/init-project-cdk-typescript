#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {
    AttiniRunner,
    AttiniRunnerJob,
    DeploymentPlan,
    AttiniDeploymentPlanStack,
    AttiniCdk,
} from '@attini/cdk';
import {Construct} from 'constructs';
import {HelloWorldStack} from '../lib/hello-world-stack';
import {stackId} from '../bin/hello-world';

class DeploymentPlanAppStack extends AttiniDeploymentPlanStack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        let attiniRunner: AttiniRunner = new AttiniRunner(this, 'Runner', {
            runnerConfiguration: {
                idleTimeToLive: 3600 // the container will terminate after being idle for 1 hour
            }
        });

        const deployCdkStack: AttiniCdk = new AttiniCdk(this, 'DeployCdkApp', {
            path: './',
            buildCommands: 'npm install',
            runner: attiniRunner.runnerName,
            diff: {
                enabled: false
            }
        })

        let runScript: AttiniRunnerJob = new AttiniRunnerJob(this, 'RunScript', {
            runner: attiniRunner.runnerName,
            environment: {
                SNS_TOPIC: deployCdkStack.getOutput(stackId, HelloWorldStack.topicName),
            },
            commands: ['echo "My SNS topic is: $SNS_TOPIC"']
        });

        new DeploymentPlan(this, 'DemoDeploymentPlan', {
            definition: deployCdkStack.next(runScript)
        })
    }
}

const app: cdk.App = new cdk.App();
new DeploymentPlanAppStack(app, 'DeploymentPlanAppStack', {});