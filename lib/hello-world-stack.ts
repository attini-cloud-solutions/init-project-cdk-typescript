import {Duration, Stack, StackProps, CfnOutput} from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import {Construct} from 'constructs';

export class HelloWorldStack extends Stack {

    static readonly topicName: string = "SnsTopicName";

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const queue: sqs.Queue = new sqs.Queue(this, 'HelloWorldQueue', {
            visibilityTimeout: Duration.seconds(300)
        });

        const topic: sns.Topic = new sns.Topic(this, 'HelloWorldTopic');

        topic.addSubscription(new subs.SqsSubscription(queue));

        new CfnOutput(this, HelloWorldStack.topicName,
            {
                value: topic.topicName
            }
        );
    }
}
