import axios from 'axios';

// הגדרת כתובת ה-API כ-bride default
const apiUrl = "http://localhost:5129";
axios.defaults.baseURL = apiUrl; // הגדרת baseURL לכל הקריאות ב-axios

// הוספת interceptor לתפוס שגיאות ולרשום ללוג
axios.interceptors.response.use(
  response => response, // החזר את התגובה כרגיל אם אין שגיאה
  error => {
    console.error("API Error: ", error.response ? error.response.data : error.message); // רישום השגיאה בלוג
    return Promise.reject(error); // השלכת השגיאה
  }
);

export default {
  // קריאה לקבלת רשימת משימות
  getTasks: async () => {
    try {
      const result = await axios.get("/items");
      return result.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error; // זורק שגיאה אם יש בעיה
    }
  },

  // הוספת משימה
  addTask: async (name) => {
    try {
      const result = await axios.post("/items", { name });
      return result.data;
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  },

  // סימון משימה כהושלמה
  setCompleted: async (id, isComplete) => {
    try {
      // שלח 0 או 1, בהתאם לערך של isComplete
      const result = await axios.put(`/items/${id}`, {
        IsComplete: isComplete ? 1 : 0 // אם isComplete הוא true, שלח 1, אחרת שלח 0
      });
      return result.data;
    } catch (error) {
      console.error("Error updating task:", error.response ? error.response.data : error.message);
      throw error;
    }
  },
  
  // מחיקת משימה
  deleteTask: async (id) => {
    try {
      const result = await axios.delete(`/items/${id}`);
      return result.data;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  },
};
