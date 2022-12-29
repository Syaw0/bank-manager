import { createPool } from "mariadb";
import crypto from "crypto";
const pool = createPool({
  host: "localhost", // get these from  env vars
  user: "root",
  password: "123qaz",
  database: "bankDb",
});

class Hash {
  md5(data) {
    return crypto.createHash("md5").update(data).digest("hex");
  }
}
const hash = new Hash();

//‌ TODO in future i hash password (sign up) in the client...

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

  async getUserByCardId(cardId, type) {
    const con = await this.connectToDb();
    let data;
    try {
      data = await con.query(`SELECT * FROM ${type}s WHERE cardId=${cardId}`);
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

class GetUserList extends DB {
  constructor() {
    super();
  }

  async getUserList(type) {
    const con = await this.connectToDb();
    let data;
    try {
      data = await con.query(`SELECT * FROM ${type}`);
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

class AddUser extends DB {
  constructor() {
    super();
  }

  async addUser(type, data) {
    const [query, values] = this.chooseQueryType(type, data);
    const con = await this.connectToDb();
    try {
      console.log("lets query", query, values);
      let data = await con.query(query, values);
      console.log(data);
      if (data) {
        return data;
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log(err);
      throw new Error("Error happen during query to server");
    } finally {
      if (con) {
        con.end();
      }
    }
  }

  chooseQueryType(type, data) {
    if (type === "manager" || type === "employee") {
      return this.makeQueryForBankers(data);
    } else if (type === "customer") {
      return this.makeQueryForCustomer(data);
    } else {
      throw new Error();
    }
  }

  makeQueryForBankers(data) {
    try {
      const hashedPassword = hash.md5(data.password);
      let keyAccess = "";
      let valueQuestion = "";
      let valueAccess = [];
      data.accessibility.forEach((v) => {
        keyAccess += `, ${v}`;
        valueAccess.push(1);
        valueQuestion += ", ?";
      });
      let values = [
        data.name,
        data.familyName,
        data.tel,
        data.cardId,
        hashedPassword,
        ...valueAccess,
      ];
      const query = `INSERT INTO ${
        type === "manager" ? "managers" : "employees"
      } (name,familyName,tel,cardId,password ${keyAccess})  VALUES (?,?,?,?,? ${valueQuestion})`;

      return [query, values];
    } catch (err) {
      throw new Error();
    }
  }

  makeQueryForCustomer(data) {
    try {
      let values = [
        data.name,
        data.familyName,
        data.tel,
        data.cardId,
        data.amount,
      ];
      const query = `INSERT INTO customers (name,familyName,tel,cardId,amount)  VALUES (?,?,?,?,?)`;

      return [query, values];
    } catch (err) {
      throw new Error();
    }
  }
}

export { GetUser, GetUserList, AddUser };
