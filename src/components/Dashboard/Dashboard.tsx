import { AddProductForm } from "@/components/Dashboard/components/AddProductForm";
import { ProductList } from "@/components/Dashboard/components/ProductList";
import { useProductsQuery } from "@/components/Dashboard/hooks/useProductsQuery";
import { useProductsStore } from "@/lib/store/productsStore";

const Dashboard = () => {
  const { isLoading, isError, error, refetch } = useProductsQuery();
  const hasCachedProducts = useProductsStore((s) => s.orderedIds.length > 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Products
        </h1>
        <p className="mt-1 text-sm text-white/50">
          Fake Store API — browse, add, and delete products. Deletes use an
          optimistic update with rollback on error.
        </p>
      </header>

      <div className="mb-10">
        <AddProductForm />
      </div>

      {isLoading && !hasCachedProducts ? (
        <p className="mb-6 text-sm text-white/60">Loading products…</p>
      ) : null}

      {isError ? (
        <div
          className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          role="alert"
        >
          <p>{error instanceof Error ? error.message : "Failed to load"}</p>
          <button
            type="button"
            className="mt-2 text-xs font-medium underline underline-offset-2 hover:text-white"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      ) : null}

      <ProductList />
    </div>
  );
};

export default Dashboard;
