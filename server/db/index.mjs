import { createPool } from "mariadb";

const pool = createPool({
  host: "localhost", // get these from  env vars
  user: "root",
  password: "123qaz",
  database: "bankDb",
});

class DB {
  constructor() {
    this.pool = pool;
    this.connectToDb();
  }
  async connectToDb() {
    try {
      return await this.pool.getConnection();
    } catch (err) {
      throw new Error(err);
    }
  }
}

class GetUser extends DB {
  constructor() {
    super();
  }

  async getUser(id, type) {
    const con = await this.connectToDb();
    let data;
    try {
      data = await con.query(`SELECT * FROM ${type}s WHERE id=${id}`);
      if (data) {
        return data;
      } else {
        throw new Error();
      }
    } catch (err) {
      throw new Error("Error happen during query to server");
    } finally {
      if (con) {
        con.end();
      }
    }
  }
}

export default GetUser;
