import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { fetchProducts } from "@/lib/api/fakeStoreApi";
import { useProductsStore } from "@/lib/store/productsStore";

export function useProductsQuery() {
  const hydrateFromApi = useProductsStore((s) => s.hydrateFromApi);

  const query = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (query.data) hydrateFromApi(query.data);
  }, [query.data, hydrateFromApi]);

  return query;
}
