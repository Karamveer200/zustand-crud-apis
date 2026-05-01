import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProduct } from "@/lib/api/fakeStoreApi";
import type { ProductsSnapshot } from "@/lib/store/productsStore";
import { useProductsStore } from "@/lib/store/productsStore";

export function useDeleteProductMutation() {
  const queryClient = useQueryClient();
  const removeProduct = useProductsStore((s) => s.removeProduct);
  const restoreSnapshot = useProductsStore((s) => s.restoreSnapshot);

  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const state = useProductsStore.getState();

      const snapshot: ProductsSnapshot = {
        productsById: { ...state.productsById },
        orderedIds: [...state.orderedIds],
      };

      removeProduct(id);
      return { snapshot };
    },
    onError: (_err, _id, context) => {
      if (context?.snapshot) restoreSnapshot(context.snapshot);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
