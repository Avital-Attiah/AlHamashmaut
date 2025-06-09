// export const getSearch = (req) => {
//   const { search, id, userId, completed, _sort, _order } = req.query;

//   let conditions = [];
//   let params = [];

//   if (id) {
//     conditions.push('id = ?');
//     params.push(Number(id));
//   }

//   if (userId) {
//     conditions.push('user_id = ?');
//     params.push(Number(userId));
//   }

//   if (completed === 'true' || completed === 'false') {
//     conditions.push('completed = ?');
//     params.push(completed === 'true' ? 1 : 0);
//   }

//   if (search) {
//     conditions.push('title LIKE ?');
//     params.push(`%${search}%`);
//   }

//   let sql = '';

//   if (conditions.length > 0) {
//     sql += ' WHERE ' + conditions.join(' AND ');
//   }

//   if (_sort && _order) {
//     const allowedSorts = ['id', 'title', 'userId', 'completed'];
//     const allowedOrders = ['asc', 'desc'];

//     if (allowedSorts.includes(_sort) && allowedOrders.includes(_order.toLowerCase())) {
//       sql += ` ORDER BY ${_sort} ${_order.toUpperCase()}`;
//     }
//   }

//   return { sql, params };


// }
