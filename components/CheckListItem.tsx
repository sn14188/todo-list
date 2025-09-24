import React from "react";
import Link from "next/link";
import { Toggle } from "@/components/ui/toggle";

type Props = {
  id: number;
  name: string;
  isCompleted: boolean;
  toggleItem: (id: number) => void;
};

const CheckListItem = ({ id, name, isCompleted, toggleItem }: Props) => {
  return (
    <li className={`check-list-item ${isCompleted ? "completed" : ""}`}>
      <Toggle pressed={isCompleted} onPressedChange={() => toggleItem(id)} />
      <Link href={`/items/${id}`}>{name}</Link>
    </li>
  );
};

export default CheckListItem;
