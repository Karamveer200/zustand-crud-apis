import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createProduct } from "@/lib/api/fakeStoreApi";
import { useProductsStore } from "@/lib/store/productsStore";
import type { NewProductPayload } from "@/types/product";

export function useAddProductMutation() {
  const queryClient = useQueryClient();
  const upsertProduct = useProductsStore((s) => s.upsertProduct);

  return useMutation({
    mutationFn: (payload: NewProductPayload) => createProduct(payload),
    onSuccess: (created) => {
      upsertProduct(created);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
