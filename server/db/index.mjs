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

// TODO in future i hash password (sign up) in the client...

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
      if (data && data.length === 0) {
        return { status: false, msg: "such user is not exist " };
      }
      return { status: true, msg: "successfully find that user", data: data };
    } catch (err) {
      return { status: false, msg: "error during query to Db" };
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
      if (data && data.length === 0) {
        return { status: false, msg: "such user is not exist " };
      }
      return { status: true, msg: "successfully find that user", data: data };
    } catch (err) {
      return { status: false, msg: "error during query to Db", error: true };
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
      if (data && data.length === 0) {
        return { status: false, msg: "cant found anything" };
      }
      return { status: true, msg: "founded", data: data };
    } catch (err) {
      return {
        status: false,
        msg: "error during perform action (getUserList)",
      };
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
    const customQuery = this.chooseQueryType(type, data);
    let query, values;
    if (customQuery.status == null) {
      [query, values] = customQuery;
    } else {
      return customQuery;
    }

    const con = await this.connectToDb();
    try {
      let data = await con.query(query, values);
      return { status: true, msg: "successfully insert new user to DB" };
    } catch (err) {
      console.log(err);
      return {
        status: false,
        msg: "error during performing action (adding new user)  ",
      };
    } finally {
      if (con) {
        con.end();
      }
    }
  }

  chooseQueryType(type, data) {
    if (type === "manager" || type === "employee") {
      return this.makeQueryForBankers(type, data);
    } else if (type === "customer") {
      return this.makeQueryForCustomer(data);
    }
  }

  makeQueryForBankers(type, data) {
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
      console.log(err);
      return {
        status: false,
        msg: "error during pars data (addUser-manager/employee)",
      };
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
      console.log(err);
      return {
        status: false,
        msg: "error during pars data (addUser-customer)",
      };
    }
  }
}

class MakeTransaction extends DB {
  constructor() {
    super();
  }

  async performTransaction(data) {
    let con;
    try {
      let auth = await this.authenticateAccounts(data);
      if (auth.status === false) {
        return auth;
      }
      con = await this.connectToDb();
      let [originCache, destinationCache] = auth;
      await con.query(
        `UPDATE customers SET amount = ${originCache - data.amount} WHERE id=${
          data.originAccount
        }`
      );
      await con.query(
        `UPDATE customers SET amount = ${
          destinationCache + data.amount
        } WHERE id=${data.destinationAccount}`
      );
      return { status: true, msg: "Transaction successfully performed" };
    } catch (err) {
      console.log(err);
      return { status: false, msg: "internal Error during perform operation" };
    } finally {
      if (con) {
        con.end();
      }
    }
  }

  async authenticateAccounts(data) {
    try {
      let getUser = new GetUser();
      let origin = await getUser.getUser(data.originAccount, "customer");
      let distinction = await getUser.getUser(
        data.destinationAccount,
        "customer"
      );

      if (!origin.status) {
        return origin;
      }
      if (!distinction.status) {
        return distinction;
      }

      if (origin.data[0].amount < data.amount) {
        return { status: false, msg: "origin has not have enough money" };
      }

      return [origin.data[0].amount, distinction.data[0].amount];
    } catch (err) {
      console.log(err);
      return {
        status: false,
        msg: "error during authenticate users for perform operation",
      };
    }
  }
}

class BlockAccount extends DB {
  constructor() {
    super();
  }

  async blockAccount(type, id, isBlocked) {
    //? this method do block or unblock ! because functionality is same but
    //? difference is that block set 1 and unblock set 0 to DB
    const con = await this.connectToDb();
    try {
      const query = `UPDATE ${type}s SET block = ${
        isBlocked ? 0 : 1
      } WHERE id=${id}`;

      const data = await con.query(query);
      return {
        status: true,
        msg: `successfully ${isBlocked ? "unBlocked" : "blocked"} this account`,
      };
    } catch (err) {
      return { status: false, msg: "error during perform action (block)" };
    } finally {
      if (con) {
        con.end();
      }
    }
  }
}

export { GetUser, GetUserList, AddUser, MakeTransaction, BlockAccount };
