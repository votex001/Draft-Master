import { ref } from "vue";
import { useStore } from "vuex";

export function useItemStoreControls<T>(options: {
  loadAction: string;
  editAction?: string;
  saveAction?: string;
  deleteAction?: string;
}) {
  const store = useStore();
  const filter = ref<any>({});

  const onQuery = async (query?: any) => {
    if (query) filter.value = query;
    await store.dispatch(options.loadAction, query);
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
    onQuery,
    onAdd,
    onDelete,
    onEdit,
  };
}
