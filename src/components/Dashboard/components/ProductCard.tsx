import { StyledButton } from "@/components/shared/StyledButton/StyledButton";
import { useDeleteProductMutation } from "@/components/Dashboard/hooks/useDeleteProductMutation";
import { useProductById } from "@/lib/store/productsStore";
import { cn } from "@/lib/utils/utils";

type ProductCardProps = {
  productId: number;
};

export function ProductCard({ productId }: ProductCardProps) {
  const product = useProductById(productId);
  const deleteMutation = useDeleteProductMutation();

  if (!product) return null;

  const isDeletingThis =
    deleteMutation.isPending && deleteMutation.variables === productId;

  return (
    <article
      className={cn(
        "flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-lg border border-white/10 bg-white/5",
        "shadow-sm backdrop-blur-sm",
      )}
    >
      <div className="aspect-square w-full shrink-0 bg-white/90 p-4">
        <img
          src={product.image}
          alt=""
          className="h-[400px] w-full object-contain"
          loading="lazy"
        />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 min-h-11 text-sm font-medium leading-snug text-white">
          {product.title}
        </h3>
        <p className="shrink-0 text-xs capitalize leading-none text-white/50">
          {product.category}
        </p>
        <p className="shrink-0 text-lg font-semibold leading-none text-white">
          ${product.price.toFixed(2)}
        </p>
        <p className="min-h-10 shrink-0 text-xs leading-snug text-white/60">
          {product.rating != null ? (
            <>
              ★ {product.rating.rate}{" "}
              <span className="text-white/40">
                ({product.rating.count} reviews)
              </span>
            </>
          ) : null}
        </p>
        <StyledButton
          type="button"
          variant="secondary"
          className="mt-auto w-full shrink-0"
          disabled={isDeletingThis}
          onClick={() => deleteMutation.mutate(productId)}
        >
          {isDeletingThis ? "Deleting…" : "Delete"}
        </StyledButton>
      </div>
    </article>
  );
}
