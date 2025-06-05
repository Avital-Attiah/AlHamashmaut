
import { addtodo, deletetodo, updatetodo, getTodos } from '../service/todoData.js'
import { getSearch } from './searches.js'
const isOwn = (id, user) => {
    return id == user.id;
}
export class todo {
    getAll = async (req, res) => {
        const useridFromQuery = req.query.userId;
        console.log(
            useridFromQuery
        );
        if (!isOwn(useridFromQuery, req.user))
            throw new Error('על המשימות להיות בהתאמה למשתמש');
        const { sql, params } = getSearch(req)
        try {
            console.log(useridFromQuery);
            if (!useridFromQuery) {
                throw new Error('על המשימות להיות בהתאמה למשתמש')
            }
            let todos = await getTodos(sql, params);
            console.log('get');
            res.status(200).json(todos);

        }
        catch (error) {
            console.error('ישנה בעיה בקבלת הנתונים:', error.message);
            res.status(500).json(error.message);
        }
    }

    update = async (req, res) => {
        try {
            let id = req.params.id;
            if (!isOwn(req.body.user_id, req.user))
                throw new Error('על המשימות להיות בהתאמה למשתמש');
            if(!req.body||!req.body.title||!req.body.user_id){
                 throw new Error('הנתונים לא  מספקים.');
            }
            let response = await updatetodo(id, req.body);
            console.log('עודכן בהצלחה');
            res.status(200).json('פרטי המשימה עודכנו בהצלחה');
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    add = async (req, res) => {
        try {

            let newtodo = req.body;
            if (!isOwn(newtodo.user_id, req.user))
                throw new Error('על המשימות להיות בהתאמה למשתמש');
            if (newtodo == null || !newtodo.title||!newtodo.user_id)
                throw new Error('נתוני  המשימה  בלתי אפשריים');
            let todoId = await addtodo(newtodo);
            newtodo = { ...newtodo, id: todoId }
            console.log(newtodo);
            res.json([newtodo]); // מגדיר גם את הסטטוס וגם התוכן כ־JSON

        } catch (error) {
            res.status(500).json(error.message);

        }
    }
    delete = async (req, res) => {
        try {
            let todoToDelete = req.params.id;
            let response = await deletetodo(todoToDelete);
            if (response) {
                console.log('נמחק בהצלחה');
                res.status(200).json("המשימה נמחק בהצלחה");
            } else {
                res.status(404).json(" ההמשימה לא נמצא");
            }
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

}