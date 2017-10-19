import { Aws } from './Aws';

export class Db extends Aws {
  constructor(
    awsResources: any,
    readonly dbResources: any
  ) {
    super(awsResources);
  }

  getDatabase(): any {}

  doCommonDatabaseWork(): any {
    this.getDatabase();
    // now do stuff that is commonly done
  }

  getDatabaseUser(): any {
    this.doCommonDatabaseWork();
    const db = this.getDatabase();
    return db.getUsers();
  }
}
