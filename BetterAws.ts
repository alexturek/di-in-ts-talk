import { Aws } from './Aws';

export class BetterAws {
  constructor(
    readonly userSetup: any,
    readonly aws: Aws
  ) { }

  doCommonAwsOperations(): any {
    this.ensureAwsResources();

    this.aws.awsClient.lookAtService();
  }

  ensureAwsResources(): any {
    if (!this.isAwsSetup()) {
      this.aws.setupAwsResources();
    }
    // and maybe some more things
  }

  private isAwsSetup(): boolean {
    return false;
  }
}
