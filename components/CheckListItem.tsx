import React from "react";
import CheckIcon from "./CheckIcon";
import Link from "next/link";

type Props = {
  id: number;
  name: string;
  isCompleted: boolean;
  toggleItem: (id: number) => void;
};

const CheckListItem = ({ id, name, isCompleted, toggleItem }: Props) => {
  return (
    <li className={`check-list-item ${isCompleted ? "completed" : ""}`}>
      <button className="check-icon" onClick={() => toggleItem(id)}>
        <CheckIcon checked={isCompleted} />
      </button>
      <Link href={`/items/${id}`}>{name}</Link>
    </li>
  );
};

export default CheckListItem;
