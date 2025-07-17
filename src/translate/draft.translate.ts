import { computed } from "vue";
import { currentLang } from "./lang-service";

const translation = translateFnc();
export const draftTranslate = computed(
  () => translation[currentLang.value]
).value;

function translateFnc() {
  return {
    en: {
      header: {
        back: "Go Back",
        save: "Save",
        saveConfirm: "Do you want to rename this Draft?",
        goBackConfirm: "Do you want to quit without saving?",
        cancel: "Cancel",
      },
    },
    he: {
      header: {
        back: "לחזור אחורה",
        save: "שמור",
        saveConfirm: "האם ברצונך לשנות את שם הטיוטה הזו?",
        goBackConfirm: "האם ברצונך להפסיק בלי לשמור?",
        cancel: "בטל",
      },
    },
  };
}
