import { computed } from "vue";
import { currentLang } from "./lang-service";
import SideBar from "@/components/shared/SideBar.vue";

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

const translation = translateFnc();
export const draftTranslate = computed(
  () => translation[currentLang.value]
).value;

function translateFnc() {
  return {
    en: {
      header: {
        ...header.en,
      },
      sideBar: {
        ...sideBar.en,
      },
    },
    he: {
      header: {
        ...header.he,
      },
      sideBar: {
        ...sideBar.he,
      },
    },
  };
}
