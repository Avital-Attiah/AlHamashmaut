
// export async function userNameExist(userName, setError) {
//     try {
//          console.log("Trying to login with:", userName);
//       const res = await fetch("http://localhost:8080/users/check", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userName: userName }),
//       });
  
//       const data = await res.json();
//       return data.exists; // למשל true / false
//     } catch (err) {
//       console.error("Error checking userName", err);
//       setError("שגיאה בשרת. נסה שוב.");
//     }
//   }
  

// export async function userExist(userName, password, setError) {
//     try {
//       const res = await fetch("http://localhost:8080/users/logIn", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userName: userName, password }),
//       });
  
//       if (res.ok) {
//         const user = await res.json();
//         return [user]; // כדי שישאר מבנה כמו בקוד הקיים שלך
//       } else {
//         return null;
//       }
//     } catch (err) {
//       console.error("Error logging in", err);
//       setError("שגיאה בשרת. נסה שוב.");
//     }
//   }
  
//   export async function fetchUserById(id, setError) {
//     try {
//       const res = await fetch(`http://localhost:8080/users/${id}`);
//       if (!res.ok) throw new Error("משתמש לא נמצא");
//       const user = await res.json();
//       return user;
//     } catch (err) {
//       console.error("שגיאה בשליפת משתמש:", err);
//       setError("שגיאה בקבלת נתוני המשתמש");
//     }
//   }
  
const baseUrl = "http://localhost:8080/";

// פונקציה להוספת נתונים
async function addData(endpoint, data) {
  try {

    const token = getToken();
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errText = await response.json();
      throw new Error(errText || 'שגיאה כללית');

    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

// פונקציה גנרית לעדכון נתונים
async function updateData(endpoint, data) {
  try {
    console.log(endpoint);
    const token = getToken();
    console.log(token);
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errText = await response.json();
      throw new Error(errText || 'שגיאה כללית');

    }
    return await response.json();
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
}

// פונקציה גנרית למחיקת נתונים
const deleteData = async (endpoint) => {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      console.log('Item deleted successfully');
      return true; // חיווי על הצלחה
    } else {
      console.error('Failed to delete item');
      return false;
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    return false;
  }
};

const getData = async (endpoint) => {
  console.log('in get data');
  try {
    console.log(endpoint);
    const token = getToken();
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data || 'שגיאה כללית');
    }
    return data;
  } catch (error) {
    throw error; // תעביר את השגיאה הלאה ל-catch החיצוני
  }
};

// פונקציה להחזיר את המשתמש הנוכחי
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}
function getToken() {
  return localStorage.getItem("token");
}
export const login = async (table, data) => {
  console.log(JSON.stringify(data))
  const response = await fetch(`${baseUrl}${table}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: [JSON.stringify(data)],
  });
  console.log(response);  
  if (!response.ok) {
    throw new Error('לא נמצא משתשמש עם הנתונים שספקת'); 
  }
  return response;
};

export { addData, updateData, deleteData, getCurrentUser, getData };
