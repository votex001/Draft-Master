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
    store.dispatch(options.loadAction, query);
  };

  const onAdd = (item: any) => {
    store.dispatch(options.saveAction, item);
  };
  const getById = (id: string) => {
    store.dispatch(options.getById, id);
  };

  const onDelete = (id: string) => {
    store.dispatch(options.deleteAction, id);
  };

  const onEdit = (item) => {
    store.dispatch(options.editAction, item);
    onQuery();
  };

  return {
    onQuery,
    onAdd,
    getById,
    onDelete,
    onEdit,
  };
}
