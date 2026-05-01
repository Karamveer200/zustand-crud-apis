import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { Product } from "@/types/product";

export interface ProductsSnapshot {
  productsById: Record<number, Product>;
  orderedIds: number[];
}

interface ProductsStoreState extends ProductsSnapshot {
  hydrateFromApi: (products: Product[]) => void;
  removeProduct: (id: number) => void;
  restoreSnapshot: (snapshot: ProductsSnapshot) => void;
  upsertProduct: (product: Product) => void;
}

function buildIndex(products: Product[]): ProductsSnapshot {
  const productsById: Record<number, Product> = {};
  const orderedIds: number[] = [];
  for (const p of products) {
    productsById[p.id] = p;
    orderedIds.push(p.id);
  }
  return { productsById, orderedIds };
}

export const useProductsStore = create<ProductsStoreState>()(
  persist(
    (set) => ({
      productsById: {},
      orderedIds: [],

      hydrateFromApi: (products) => set(buildIndex(products)),

      removeProduct: (id) =>
        set((state) => {
          const nextById = { ...state.productsById };
          delete nextById[id];
          return {
            productsById: nextById,
            orderedIds: state.orderedIds.filter((x) => x !== id),
          };
        }),

      restoreSnapshot: (snapshot) => set(snapshot),

      upsertProduct: (product) =>
        set((state) => {
          const nextById = { ...state.productsById, [product.id]: product };
          const hasId = state.orderedIds.includes(product.id);
          return {
            productsById: nextById,
            orderedIds: hasId
              ? state.orderedIds
              : [...state.orderedIds, product.id],
          };
        }),
    }),
    {
      name: "dashboard-products",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        productsById: state.productsById,
        orderedIds: state.orderedIds,
      }),
    },
  ),
);

/** Subscribe only to a single product slice (stable reference when that row is unchanged). */
export function useProductById(id: number): Product | undefined {
  return useProductsStore((s) => s.productsById[id]);
}
