import { ref } from "vue";
import { useStore } from "vuex";

type Dir = 1 | -1;

export function useItemStoreControls<T>(options: {
  loadAction: string;
  editAction?: string;
  saveAction?: string;
  deleteAction?: string;
}) {
  const store = useStore();

  const selectedItem = ref<string | null>(null);
  const isUnchangeable = ref(false);
  const dir = ref<Dir>(1);
  const items = ref<T[] | []>([]);
  const filter = ref<{ dir: 1 | -1; name: string }>({ dir: 1, name: "" });

  const onSelect = (item: any | null) => {
    selectedItem.value = item;
    isUnchangeable.value = !!item?.isUnchangeable;
  };

  const onQuery = (query?: { dir: 1 | -1; name: string }) => {
    if (query) filter.value = query;
    store.dispatch(options.loadAction, query);
  };

  const onAdd = (item: any) => {
    store.dispatch(options.saveAction, item);
  };

  const onDelete = (id: string) => {
    store.dispatch(options.deleteAction, id);
  };

  const onEdit = (item) => {
    store.dispatch(options.editAction, item);
    onQuery();
  };

  return {
    items,
    selectedItem,
    isUnchangeable,
    dir,
    filter,
    onSelect,
    onQuery,
    onAdd,
    onDelete,
    onEdit,
  };
}
