import { ref } from "vue";

const currentLang = ref(checkCurrentLang());

export const langService = {
  currentLang,
  checkCurrentLang,
  changeLang,
  translate: translate(),
};

function checkCurrentLang(): "en" | "he" {
  const lang = localStorage.getItem("lang");
  if (!lang || lang === "en") return "en";
  if (lang === "he") return "he";

  localStorage.removeItem("lang");
  return "en";
}

function changeLang(lang: "en" | "he") {
  localStorage.setItem("lang", lang);
  currentLang.value = lang;
}

function translate() {
  return {
    en: {
      drawings: "drawings",
      settings: "settings",
      search: "Search",
      home: {
        h1: "Welcome to DraftMaster.",
        p: "The ultimate tool for creating metal list drawings and calculating sheet sizes. Start your project today!",
        btn: "Go to Drawings",
      },
      settingsPage: {
        customers: "customers",
        metals: "metals",
        types: "types",
      },
      customersOutput: {
        p1: "On the Customers settings page, you can perform the following actions:",
        ul: [
          {
            bold: "Add a new customer:",
            regular:
              'Click the "Add" button, enter the customer`s name, and add their details.',
          },
          {
            bold: "Edit or delete a customer:",
            regular:
              'Click on the customer`s name to modify their details, including the name, metal and bending prices, or select "Delete" to remove them from the list.',
          },
          {
            bold: "Edit metal and bending prices:",
            regular:
              "When editing a customer, you can change the prices for metal and bending in their data table.",
          },
        ],
      },
      metalsOutput: {
        p1: "The Metal Settings Page allows you to manage different types of metals used in calculations. You can add new metal types and remove existing ones.",
        ul: [
          {
            bold: "Adding a Metal:",
            regular:
              'Click the "Add Metal" button, enter the metal name and click "Save" to add it to the list.',
          },
          {
            bold: "Deleting a Metal:",
            regular:
              'Locate the metal in the list, click the "Delete" button, confirm the action, and the metal will be permanently removed.',
          },
        ],
      },
    },
    he: {
      drawings: "טיוטות",
      settings: "הגדרות",
      search: "חיפוש",
      home: {
        h1: "ברוכים הבאים ל-DraftMaster.",
        p: "הכלי האולטימטיבי ליצירת שרטוטי רשימת מתכת וחישוב גדלי גיליון. התחל את הפרויקט שלך עוד היום!",
        btn: "עבור לשרטוטים",
      },
      settingsPage: {
        customers: "לקוחות",
        metals: "מתכות",
        types: "סוגים",
      },
      customersOutput: {
        p1: "בדף הגדרות לקוחות, תוכל לבצע את הפעולות הבאות:",
        ul: [
          {
            bold: "הוסף לקוח חדש:",
            regular: 'לחץ על כפתור "הוסף", הזן את שם הלקוח והוסף את פרטיו.',
          },
          {
            bold: "ערוך או מחיקה של לקוח:",
            regular:
              'לחץ על שם הלקוח כדי לשנות את פרטיו, כולל השם, מחירי המתכת והכיפוף, או בחר "מחק" כדי להסיר אותם מהרשימה.',
          },
          {
            bold: "עריכת מחירי מתכת וכיפוף:",
            regular:
              "בעת עריכת לקוח, ניתן לשנות את המחירים של מתכת וכיפוף בטבלת הנתונים שלו.",
          },
        ],
      },
      metalsOutput: {
        p1: "דף הגדרות המתכת מאפשר לך לנהל סוגים שונים של מתכות המשמשות בחישובים. ניתן להוסיף סוגי מתכת חדשים ולהסיר את הקיימים:",
        ul: [
          {
            bold: "הוספת מתכת:",
            regular:
              'לחץ על כפתור "הוסף מתכת", הזן את שם המתכת ולחץ על "שמור" כדי להוסיף אותה לרשימה.',
          },
          {
            bold: "מחיקת מתכת:",
            regular:
              'אתר את המתכת ברשימה, לחץ על כפתור "מחק", אשר את הפעולה, והמתכת תוסר לצמיתות.',
          },
        ],
      },
    },
  };
}
