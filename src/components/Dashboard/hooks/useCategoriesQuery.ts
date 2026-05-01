import { useQuery } from "@tanstack/react-query";

import { fetchCategories } from "@/lib/api/fakeStoreApi";

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 86_400_000,
  });
}
