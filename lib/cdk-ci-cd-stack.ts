import * as cdk from "aws-cdk-lib";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { pipelineStage } from "./PipelineStage";

export class CdkCiCdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "AwesomePipeline", {
      pipelineName: "AwesomePipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub("joshjewe/cdk-ci-cd", "cicd-practice"),
        installCommands: ['npm i -g npm@latest'],
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });

    const testStage = pipeline.addStage(
      new pipelineStage(this, "PipelineTestStage", {
        stageName: "test",
      })
    );
  }
}
