import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2';
import bcrypt from 'bcrypt';

// Create the connection to the database
export const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root',      
  password: 'Alex1405$',    
  database: 'UTRAVEL' 
});

// Simple query
connection.query('show tables', (err, results, fields) => {
  console.log(results); // Results contains rows returned by the server
  console.log(fields); // Fields contains extra metadata about results, if available
});

// Example with placeholders
connection.query('select 1 from dual where = ?', [1, 1], (err, results) => {
  console.log(results);
});

connection.end();

export class tourmodel {
  static async getalltours({ location }) {
    if (location) {
      const lowercaselocation = location.toLowerCase();
      // Get location ids from database table using genre names
      const [locations] = await connection.promise().query(
        `select id, name from location where lower(name) = ?;`,
        [lowercaselocation]
      );
      // No location found
      if (locations.length === 0) return [];

      // Get the id from the first genre result
      const [{ id }] = locations;
    }
    const [tours] = await connection.promise().query(
      `select src, text, label, price, location, bin_to_uuid(id) id from tours`
    );
    console.log(tours);
  }

  static async getbyid({ id }) {
    const [tours] = await connection.promise().query(
      `select src, text, label, price, location, bin_to_uuid(id) id from tours where id = uuid_to_bin(?);`,
      [id]
    );

    if (tours.length === 0) return null;
    return tours[0];
  }

  static async create({ input }) {
    const { src, text, label, price, location } = input;

    // Generate a UUID
    const [uuidResult] = await connection.promise().query('select uuid() uuid;');
    const [{ uuid }] = uuidResult;

    try {
      await connection.promise().query(
        `insert into tours (src, text, label, price, location) values (?, ?, ?, ?, ?);`,
        [src, text, label, price, location]
      );
    } catch (err) {
      console.log(`Error creating tour: ${err}`);
    }

    const [tours] = await connection.promise().query(
      `select src, text, label, price, location, bin_to_uuid(id) id from tours where id = uuid_to_bin(?);`,
      [uuid]
    );
    return tours[0];
  }

  static async delete({ id }) {
    try {
      await connection.promise().query(
        `delete from tours where id = uuid_to_bin(?);`,
        [id]
      );
    } catch (err) {
      console.log(`Error deleting tour: ${err}`);
      return false;
    }
    console.log('Deleted tour');
    return true;
  }

  static async update({ id, input }) {
    const { src, text, label, price, location } = input;

    try {
      await connection.promise().query(
        `update tours set src = ?, text = ?, label = ?, price = ?, location = ? where id = uuid_to_bin(?);`,
        [src, text, label, price, location, id]
      );
    } catch (err) {
      console.log(`Error updating tour: ${err}`);
      return null;
    }

    return this.getbyid({ id });
  }

}
  export class UserModel {
    static async createUser({ username, password, email }) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
  
      try {
        await connection.query(
          `INSERT INTO user (username, password, email) VALUES (?, ?, ?)`,
          [username, hash, email]
        );
        console.log('User created successfully');
      } catch (err) {
        console.log(`Error creating user: ${err}`);
      }
    }
}