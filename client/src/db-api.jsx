
export async function userNameExist(userName, setError) {
    try {
         console.log("Trying to login with:", userName);
      const res = await fetch("http://localhost:8080/users/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: userName }),
      });
  
      const data = await res.json();
      return data.exists; // למשל true / false
    } catch (err) {
      console.error("Error checking userName", err);
      setError("שגיאה בשרת. נסה שוב.");
    }
  }
  

export async function userExist(userName, password, setError) {
    try {
      const res = await fetch("http://localhost:8080/users/logIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: userName, password }),
      });
  
      if (res.ok) {
        const user = await res.json();
        return [user]; // כדי שישאר מבנה כמו בקוד הקיים שלך
      } else {
        return null;
      }
    } catch (err) {
      console.error("Error logging in", err);
      setError("שגיאה בשרת. נסה שוב.");
    }
  }
  
  export async function fetchUserById(id, setError) {
    try {
      const res = await fetch(`http://localhost:8080/users/${id}`);
      if (!res.ok) throw new Error("משתמש לא נמצא");
      const user = await res.json();
      return user;
    } catch (err) {
      console.error("שגיאה בשליפת משתמש:", err);
      setError("שגיאה בקבלת נתוני המשתמש");
    }
  }
  