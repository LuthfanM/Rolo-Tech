export function formatUSD(n: number) {
  return `$${n.toLocaleString()}`;
}

export function resolvePrice({
  listPrice,
  price,
  discountPercent,
}: {
  listPrice?: number;
  price?: number;
  discountPercent?: number | null;
}) {
  if (price !== undefined) return { listPrice, price };
  if (listPrice !== undefined && discountPercent) {
    const computed = Math.round(listPrice * (1 - discountPercent / 100));
    return { listPrice, price: computed };
  }

  return { listPrice: undefined, price: price ?? 0 };
}

export function variantLabel(key: string) {
  switch (key) {
    case "steel":
      return "Stainless Steel";
    case "black":
      return "Truffle Black";
    default:
      return key;
  }
}
