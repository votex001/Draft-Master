import { ref } from "vue";
import { useStore } from "vuex";

export function useItemStoreControls<T>(options: {
  loadAction: string;
  editAction?: string;
  saveAction?: string;
  deleteAction?: string;
  getById?: string;
}) {
  const store = useStore();
  const filter = ref<any>({});

  const onQuery = (query?: any) => {
    if (query) filter.value = query;
    return store.dispatch(options.loadAction, query);
  };

  const onAdd = (item: any) => {
    return store.dispatch(options.saveAction, item);
  };
  const getById = (id: string) => {
    return store.dispatch(options.getById, id);
  };

  const onDelete = (id: string) => {
    return store.dispatch(options.deleteAction, id);
  };

  const onEdit = async (item) => {
    const editedItem = await store.dispatch(options.editAction, item);
    onQuery();
    return editedItem;
  };

  return {
    onQuery,
    onAdd,
    getById,
    onDelete,
    onEdit,
  };
}
