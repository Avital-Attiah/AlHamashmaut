

const baseUrl = "http://localhost:8080/";

// פונקציה להוספת נתונים
// async function addData(endpoint, data) {
//   try {

//     const token = getToken();
//     const response = await fetch(`${baseUrl}${endpoint}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`
//       },
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) {
//       const errText = await response.json();
//       throw new Error(errText || 'שגיאה כללית');

//     }
//     return await response.json();
//   } catch (error) {
//     throw error;
//   }
// }

// // פונקציה גנרית לעדכון נתונים
// async function updateData(endpoint, data) {
//   try {
//     console.log(endpoint);
//     const token = getToken();
//     console.log(token);
//     const response = await fetch(`${baseUrl}${endpoint}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) {
//       const errText = await response.json();
//       throw new Error(errText || 'שגיאה כללית');

//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error updating data:", error);
//     throw error;
//   }
// }

// פונקציה להוספת נתונים שתומכת גם ב-FormData
async function addData(endpoint, data, isFormData = false) {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        "Authorization": `Bearer ${token}`
      },
      body: isFormData ? data : JSON.stringify(data),
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

// אותו דבר ל-update
async function updateData(endpoint, data, isFormData = false) {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "PUT",
      headers: {
        ...(isFormData ? {} : { "Content-Type": isFormData ? "multipart/form-data" :"application/json"  }),
        'Authorization': `Bearer ${token}`
      },
      body: isFormData ? data : JSON.stringify(data),
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
    const token = getToken()||null;
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
  return JSON.parse(localStorage.getItem("currentUser"))||null
  
  ;
}
function getToken() {
  return localStorage.getItem("token")||null;
}

export const login = async (table = "users/login", data) => {
  console.log(JSON.stringify(data));

  const response = await fetch(`${baseUrl}${table}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data), // ✅ מחרוזת חוקית, לא מערך
  });

  if (!response.ok) {
    throw new Error('לא נמצא משתמש עם הנתונים שסיפקת');
  }

  const responseData = await response.json(); // ✅ קריאת גוף התשובה

  localStorage.setItem("currentUser", JSON.stringify(responseData.user));
  localStorage.setItem("token", responseData.token);

  return true;
};


export const newUser = async (table, data) => {
  console.log(JSON.stringify(data));

  const response = await fetch(`${baseUrl}${table}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data), // ✅ תיקון — לא מערך
  });

  let responseData;
  try {
    responseData = await response.json();
  } catch (e) {
    throw new Error("לא התקבלה תשובה תקינה מהשרת");
  }

  if (!response.ok) {
    // נניח שהשרת מחזיר { message: "משהו" }
    throw new Error(responseData.message || 'שגיאה כללית');
  }

  if (!responseData.user || !responseData.token) {
    throw new Error("פרטי המשתמש שהוחזרו אינם תקינים");
  }

  localStorage.setItem("currentUser", JSON.stringify(responseData.user));
  localStorage.setItem("token", responseData.token);

  return true;
};

export { addData, updateData, deleteData, getCurrentUser, getData };
