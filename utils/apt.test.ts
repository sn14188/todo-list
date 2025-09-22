import { Item } from "@/types/item";
import { addItem, fetchItems, toggleComplete } from "./api";

describe("test fetchItems", () => {
  test("fetchItems returns items on success", async () => {
    const mockItems: Item[] = [
      { tenantId: "tenantId", name: "비타민 챙겨먹기", isCompleted: false },
      { tenantId: "tenantId", name: "맥주 챙겨먹기", isCompleted: false },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockItems),
    });

    const result = await fetchItems();
    expect(result).toEqual(mockItems);
    expect(result[0].name).toBe("비타민 챙겨먹기");
  });

  test("fetchItems throws error on failure", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn(),
    });

    await expect(fetchItems()).rejects.toThrow("");
  });
});

describe("test addItem", () => {
  test("addItem returns new item on success", async () => {
    const newItem: Item = {
      tenantId: "tenantId",
      name: "소주 챙겨먹기",
      isCompleted: false,
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(newItem),
    });

    const result = await addItem({ name: "temp" });
    expect(result).toEqual(newItem);
    expect(result.name).toBe("소주 챙겨먹기");
  });

  test("addItem throws error on failure", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn(),
    });

    await expect(addItem({ name: "temp" })).rejects.toThrow("");
  });
});

describe("test toggleComplete", () => {
  test("toggleComplete returns updated item on success", async () => {
    const updatedItem: Item = {
      id: 1,
      tenantId: "tenantId",
      name: "테스트 항목",
      isCompleted: false,
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(updatedItem),
    });

    const result = await toggleComplete(1, { isCompleted: true });
    expect(result).toEqual(updatedItem);
    expect(result.isCompleted).toBe(false);
  });

  test("toggleComplete throws error on failure", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn(),
    });

    await expect(toggleComplete(1, { isCompleted: true })).rejects.toThrow("");
  });
});
