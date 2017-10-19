import { Aws } from './Aws';
import { BetterAws } from './BetterAws';
import { Db } from './Db';

export class Application {
  constructor(
    readonly applicationConfig: any,
    readonly db: Db,
    readonly aws: Aws,
    readonly betterAws: BetterAws,
  ) {}

  doApplicationThings() {
    this.betterAws.doCommonAwsOperations();
    const user = this.db.getDatabaseUser();

    const data = this.aws.awsClient.createUser(user);

    this.db.getDatabase().saveAwsData(data);
  }
}
