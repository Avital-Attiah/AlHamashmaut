import pool  from './database.js';



export const getTodos = async (whereClause = '', params = []) => {
  try {
    const baseQuery = 'SELECT * FROM todos';
    const fullQuery = whereClause ? `${baseQuery} ${whereClause}` : baseQuery;
    const [rows] = await pool.query(fullQuery, params);
    return rows;
  } catch (error) {
    console.error('SQL Error:', error);
    throw new Error('שגיאה בשאילתת נתונים');
  }
};
export const addtodo = async (todo) => {
  const { title, completed, user_id } = todo;
  console.log(todo);
  try {
    const [result] = await pool.query(
      'INSERT INTO todos (title,completed,user_id) VALUES (?,?,?)',
      [title,completed,user_id]
    );
    return result.insertId;
  } catch (error) {
    throw new Error('שגיאה בהוספת משימה');
  }
};


// פונקציה לעדכון משתמש לפי ID
export const updatetodo = async (id, todo) => {
  const { title, completed ,user_id} = todo;
console.log('updatetodo ')
  try {
    console.log(todo);
  const [result] = await pool.query(
  'UPDATE todos SET title = ?, completed = ? WHERE id = ?',
  [title, completed, id]
);

    return result;
  } catch (error) {
    throw new Error('שגיאה בעדכון נתונים');
  }
};

// פונקציה למחיקת משתמש לפי ID
export const deletetodo = async (id) => {
  try {
    const [result] = await pool.query('DELETE FROM todos WHERE id = ?', [id]);
    console.log(result.affectedRows > 0);
    return result.affectedRows > 0 ;
  } catch (error) {
    throw new Error('שגיאה במחיקת המשימה');
  }
};

