import { BetterAws } from './BetterAws';

export class Application extends BetterAws {
  constructor(
    readonly applicationConfig: any,
    userSetup: any,
    awsResources: any,
    dbResources: any
  ) {
    super(userSetup, awsResources, dbResources);
  }

  doApplicationThings() {
    const user = this.getDatabaseUser();

    const data = this.aws.createUser(user);

    this.getDatabase().saveAwsData(data);
  }
}
