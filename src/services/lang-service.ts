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
      home: {
        h1: "Welcome to DraftMaster.",
        p: "The ultimate tool for creating metal list drawings and calculating sheet sizes. Start your project today!",
        btn: "Go to Drawings",
      },
      sideBar: {
        customers: "customers",
        metals: "metals",
      },
    },
    he: {
      drawings: "טיוטות",
      settings: "הגדרות",
      home: {
        h1: "ברוכים הבאים ל-DraftMaster.",
        p: "הכלי האולטימטיבי ליצירת שרטוטי רשימת מתכת וחישוב גדלי גיליון. התחל את הפרויקט שלך עוד היום!",
        btn: "עבור לשרטוטים",
      },
      sideBar: {
        customers: "לקוחות",
        metals: "מתכות",
      },
    },
  };
}
