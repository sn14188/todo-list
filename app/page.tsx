"use client";
import { useEffect, useState } from "react";
import type { Item } from "@/types/item";
import CheckList from "@/components/CheckList";
import "@/styles/home.css";
import "@/styles/button.css";
import { addItem, fetchItems, toggleComplete } from "@/utils/api";

export default function Home() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchItems().then((data) => setItems(data));
  }, []);

  const handleAddItem = async () => {
    const name = input.trim();
    if (!name) return;

    const newItem = await addItem({ name });
    setItems((prev) => [newItem, ...prev]);
    setInput("");
  };

  const toggleItem = async (id: number) => {
    const target = items.find((item) => item.id === id);
    if (!target) return;

    const next = !target.isCompleted;

    // update ui first
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCompleted: next } : item,
      ),
    );

    // update server
    const updated = await toggleComplete(id, { isCompleted: next });
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCompleted: updated.isCompleted } : item,
      ),
    );
  };

  return (
    <div className="content">
      <div className="search-add-wrap">
        <input
          className="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일을 입력해주세요"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddItem();
            }
          }}
        />
        <button className="button add" type="button" onClick={handleAddItem}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 8L14 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 14L8 2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="add-button-text">추가하기</span>
        </button>
      </div>

      <div className="check-lists">
        <div className="check-list">
          <CheckList
            titleImage="/todo.png"
            emptyImage="/todo-large.png"
            emptyText={`할 일이 없어요.\nTODO를 새롭게 추가해주세요!`}
            items={items.filter((it) => !it.isCompleted)}
            toggleItem={toggleItem}
          />
        </div>

        <div className="check-list">
          <CheckList
            titleImage="/done.png"
            emptyImage="/done-large.png"
            emptyText={`아직 다 한 일이 없어요.\n해야 할 일을 체크해보세요!`}
            items={items.filter((it) => it.isCompleted)}
            toggleItem={toggleItem}
          />
        </div>
      </div>
    </div>
  );
}
