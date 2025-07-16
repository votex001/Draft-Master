import { Draft } from "@/models/drafts.model";
import { makeId } from "./service";
import { querySort } from "@/store/drafts.list.store";
const STORAGE_KEY = "drafts";
export const draftsListService = { onQuery, saveDraft };

async function onQuery(filter: querySort) {
  try {
    const drafts = await loadDrafts();
    drafts.sort((a, b) => {
      const valueA = a[filter.column];
      const valueB = b[filter.column];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return valueA.localeCompare(valueB) * filter.dir;
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
        return (valueA - valueB) * -filter.dir;
      }

      return 0;
    });
    return drafts;
  } catch (err) {
    throw err;
  }
}

async function saveDraft(draft: Draft) {
  try {
    draft.lastEdit = new Date().getTime();
    if (draft.id) {
      // put
      const drafts = loadDrafts();
      if (!drafts) {
        throw "Cannot get drafts";
      }
      const updatedDraftList = drafts.map((d) =>
        d.id === draft.id ? draft : d
      );
      _saveDrafts(updatedDraftList);
      return updatedDraftList;
    } else {
      // post
      draft.id = makeId();
      const drafts = loadDrafts();
      drafts.push(draft);
      _saveDrafts(drafts);
      return drafts;
    }
  } catch (err) {
    throw err;
  }
}

function loadDrafts(): Draft[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function _saveDrafts(drafts: Draft[]) {
  drafts && localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
}
