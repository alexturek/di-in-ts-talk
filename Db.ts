


export class Db {
  constructor(
    readonly dbResources: any
  ) {}

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
