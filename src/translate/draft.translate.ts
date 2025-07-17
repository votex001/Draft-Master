import { computed } from "vue";
import { currentLang } from "./lang-service";

// components write here
const header = {
  en: {
    back: "Go Back",
    save: "Save",
    saveConfirm: "Do you want to rename this Draft?",
    goBackConfirm: "Do you want to quit without saving?",
    cancel: "Cancel",
  },
  he: {
    back: "לחזור אחורה",
    save: "שמור",
    saveConfirm: "האם ברצונך לשנות את שם הטיוטה הזו?",
    goBackConfirm: "האם ברצונך להפסיק בלי לשמור?",
    cancel: "בטל",
  },
};

const sideBar = {
  en: {
    metal: "Metal",
    type: "Type",
    metalPrice: "Metal Price",
    metalThickness: "Metal thickness",
    bendingFee: "Bending fee",
    width: "Width",
    amount: "Amount",
  },
  he: {
    metal: "מתכת",
    type: "סוג",
    metalPrice: "מחיר מתכת",
    metalThickness: "עובי מתכת",
    bendingFee: "עמלת כיפוף",
    width: "רוחב",
    amount: "כמות",
  },
};

const mainDraft = {
  en: {
    deployment: "Deployment",
    price: "Price",
    add: "Add",
    bending: "Bending",
  },
  he: { deployment: "פריסה", price: "מחיר", add: "הוסף", bending: "כיפוף" },
};

const draftFooter = {
  en: {
    totalArea: "Total Area",
    bendingFee: "Bending Fee",
    weightFee: "Weight Fee",
    totalPrice: "Total Price",
  },
  he: {
    totalArea: "שטח כולל",
    bendingFee: "עמלת כיפוף",
    weightFee: "עמלת משקל",
    totalPrice: "מחיר כולל",
  },
};

// exporting translate
const translation = translateFnc();
export const draftTranslate = computed(
  () => translation[currentLang.value]
).value;

// don't forget to add your translate here
function translateFnc() {
  return {
    en: {
      header: {
        ...header.en,
      },
      sideBar: {
        ...sideBar.en,
      },
      mainDraft: {
        ...mainDraft.en,
      },
      draftFooter: {
        ...draftFooter.en,
      },
    },
    he: {
      header: {
        ...header.he,
      },
      sideBar: {
        ...sideBar.he,
      },
      mainDraft: {
        ...mainDraft.he,
      },
      draftFooter: {
        ...draftFooter.he,
      },
    },
  };
}
