import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2';

// Create the connection to the database
 export const connection = mysql.createConnection(process.env.DATABASE_URL);

// simple query
connection.query('show tables', (err, results, fields) => {
  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra metadata about results, if available
});

// Example with placeholders
connection.query('select 1 from dual where ? = ?', [1, 1], (err, results) => {
  console.log(results);
});

connection.end();

  export class TourModel {
    static async getAllTours( { location }) {                                                                                                               
      if (location) {
        const lowerCaseLocation =location.toLowerCase()
         // get location ids from database table using genre names
        
        const [locations] = await sequelize.query(
          `SELECT id, name FROM location WHERE LOWER(name) = ?;`, { replacements: [lowerCaseLocation], type: sequelize.QueryTypes.SELECT }
        )
        // no location found
        if (locations.length === 0) return []
        
         // get the id from the first genre result
        const [{id}] = locations
      }
      const Tours = await sequelize.query(
        `SELECT src , text, label, price, location BIN_TO_UUID(id) id FROM Tours`, { type: sequelize.QueryTypes.SELECT }
      )
      console.log(Tours)
    }
    static async getById ({id}) {
      const [Tours] =await sequelize.query(
        `SELECT src , text, label, price, location BIN_TO_UUID(id) id FROM Tours
        WHERE id = UUID_TO_BIN(?);`, [id], { type: sequelize.QueryTypes.SELECT })
      
      if (Tours.length === 0) return null
      return Tours[0]

    }
    static async create ({input}) { 
      const {
        src,
        text,
        label,
        price,
        location
      } = input

      // todo: crear la conexión de genre

      // crypto.randomUUID()

      const[ uuidResult ] = await connection.query("SELECT UUID() uuid;")
      const [{uuid}] = uuidResult

      try {
        await connection.query(
        `INSERT INTO Tours ( src ,text, label, price, location )
         VALUES (UUID_TO_BIN("${uuid}")?, ?, ?, ?, ?,?)`,
         [src ,text, label, price, location]  
      )
      } catch (err){console.log(`Error creating tour ${err}`)}
      
      const [Tours] = await connection.query(
        `SELECT src , text, label, price, location,
        BIN_TO_UUID(id) id FROM tours WHERE id = UUID_TO_BIN(?);` [uuid]
      )
      return Tours[0];
    }
    static async delete ({ id }) {
        try {
          await connection.query(
            `DELETE FROM Tours WHERE id = UUID_TO_BIN(?);`,
            [id]
          );
        } catch (err) {
          console.log(`Error deleting tour ${err}`);
          return false;
        }
        console.log('Deleted Tour');
        return true;
      }
    static async update ({ id, input }) {
        const { src, text, label, price, location } = input;
    
        try {
          await connection.query(
            `UPDATE Tours SET src = ?, text = ?, label = ?, price = ?, location = ? WHERE id = UUID_TO_BIN(?);`,
            [src, text, label, price, location, UUID_TO_BIN(id)]
          );
        } catch (err) {
          console.log(`Error updating tour ${err}`);
          return null;
        }
    
        return this.getById({ id });
      }
    }
  
