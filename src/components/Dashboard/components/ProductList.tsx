import { ProductCard } from "@/components/Dashboard/components/ProductCard";
import { useProductsStore } from "@/lib/store/productsStore";

export function ProductList() {
  const orderedIds = useProductsStore((s) => s.orderedIds);

  if (orderedIds.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-white/20 py-12 text-center text-sm text-white/50">
        No products loaded yet.
      </p>
    );
  }

  return (
    <ul className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {orderedIds.map((id) => (
        <li key={id} className="flex min-h-0 min-w-0">
          <ProductCard productId={id} />
        </li>
      ))}
    </ul>
  );
}
