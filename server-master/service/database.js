import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();

const pool=mysql.createPool({
    host:process.env.mysql_HOST,
    user:process.env.mysql_user,
    password:process.env.mysql_password,
    database:process.env.mysql_database
}).promise();

export default pool;
//מחזירה את המשך השאילתה לסינון ואת הפרמטרים בהתאמה
 
// const executeQuery = async (query) => {
//     try {
//     let pool = await connectToDatabase();
//     let result = await pool.request()
//     .query(query);
    
//     console.log('Query result:', result);
//     console.log('Query result:', result.recordset); //
//     return result.recordsets
//     } catch (err) {
//     console.error('Query failed! Error:', err);
//     } finally {
//     sql.close();
// async function getUsers (){
// return await pool.query(" select * from users")
// }
// async function getUserById(id) {
//     const [rows] = await pool.query(
//       'SELECT * FROM users WHERE id = ?',
//       [id]
//     );
//     return rows;
//  }
 
// const connectToDatabase = async () => {
//     try {
//     // Create a connection pool
//     let pool = await sql.connect(config);
//     console.log('Connected to the database!');
//     return pool;}
//     catch (err) {
//         console.error('Database connection failed! Error:', err);
//         throw err;
//     }
//    }


    

//  const users=await pool.query(" select * from users");
//  async function createNote(title, content) {
//     await pool.query(``
//     INSERT INTO  users (title, content)
//     VALUES (?, ?)
//     `, [title, content]`)}


// console.log(users);

