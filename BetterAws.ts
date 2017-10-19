import { Db } from './Db';

export class BetterAws extends Db {
  constructor(
    readonly userSetup: any,
    awsResources: any,
    dbResources: any
  ) {
    super(awsResources, dbResources);
  }

  doCommonAwsOperations(): any {
    this.ensureAwsResources();

    this.awsClient.lookAtService();
  }

  ensureAwsResources(): any {
    if (!this.isAwsSetup()) {
      this.setupAwsResources();
    }
    // and maybe some more things
  }

  private isAwsSetup(): boolean {
    return false;
  }
}
