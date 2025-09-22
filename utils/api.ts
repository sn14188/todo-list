import { CreateItemDto, Item, ToggleCompleteDto } from "@/types/item";

const api = process.env.NEXT_PUBLIC_API;
const tenantId = process.env.NEXT_PUBLIC_TENANT_ID!;

const fetchItems = async (): Promise<Item[]> => {
  const res = await fetch(`${api}/${tenantId}/items`);

  if (!res.ok) throw new Error("failed to fetch items");

  return res.json();
};

const addItem = async (dto: CreateItemDto): Promise<Item> => {
  const res = await fetch(`${api}/${tenantId}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });

  if (!res.ok) throw new Error("failed to add item");

  return res.json();
};

const toggleComplete = async (
  id: number,
  dto: ToggleCompleteDto,
): Promise<Item> => {
  const res = await fetch(`${api}/${tenantId}/items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });

  if (!res.ok) throw new Error("failed to toggle complete");

  return res.json();
};

export { fetchItems, addItem, toggleComplete };
