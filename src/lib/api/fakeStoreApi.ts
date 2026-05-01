import type { NewProductPayload, Product } from "@/types/product";

const BASE = "https://fakestoreapi.com";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE}/products`);
  if (!res.ok) throw new Error("Failed to load products");
  return res.json() as Promise<Product[]>;
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${BASE}/products/categories`);
  if (!res.ok) throw new Error("Failed to load categories");
  return res.json() as Promise<string[]>;
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${BASE}/products/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete product");
}

export async function createProduct(
  payload: NewProductPayload,
): Promise<Product> {
  const res = await fetch(`${BASE}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to add product");
  return res.json() as Promise<Product>;
}
