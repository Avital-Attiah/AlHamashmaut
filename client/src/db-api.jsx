

const baseUrl = "http://localhost:8080/";

// פונקציה לניקוי הרשאות והפניה לדף התחברות
function handleUnauthorized() {
  alert("פג תוקף ההתחברות שלך. התחבר/י מחדש כדי להמשיך.");
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
  window.location.href = "/login";
}

// קבלת טוקן נוכחי
function getToken() {
  return localStorage.getItem("token") || null;
}

// קבלת משתמש נוכחי
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser")) || null;
}

// שליפת נתונים
async function getData(endpoint) {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 403) {
      handleUnauthorized();
      return;
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data || 'שגיאה כללית');
    }
    return data;
  } catch (error) {
    throw error;
  }
}

// הוספת נתונים
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

    if (response.status === 403) {
      handleUnauthorized();
      return;
    }

    if (!response.ok) {
      const errText = await response.json();
      throw new Error(errText || 'שגיאה כללית');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

// עדכון נתונים
async function updateData(endpoint, data, isFormData = false) {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "PUT",
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        'Authorization': `Bearer ${token}`
      },
      body: isFormData ? data : JSON.stringify(data),
    });

    if (response.status === 403) {
      handleUnauthorized();
      return;
    }

    if (!response.ok) {
      const errText = await response.json();
      throw new Error(errText || 'שגיאה כללית');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

// מחיקת נתונים
const deleteData = async (endpoint) => {
  try {
    const token = getToken();
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 403) {
      handleUnauthorized();
      return false;
    }

    return response.ok;
  } catch (error) {
    return false;
  }
};

// התחברות
export const login = async (table = "users/login", data) => {
  const response = await fetch(`${baseUrl}${table}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('לא נמצא משתמש עם הנתונים שסיפקת');
  }

  const responseData = await response.json();
  localStorage.setItem("currentUser", JSON.stringify(responseData.user));
  localStorage.setItem("token", responseData.token);

  return true;
};

// רישום משתמש
export const newUser = async (table, data) => {
  const response = await fetch(`${baseUrl}${table}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  let responseData;
  try {
    responseData = await response.json();
  } catch (e) {
    throw new Error("לא התקבלה תשובה תקינה מהשרת");
  }

  if (!response.ok) {
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
