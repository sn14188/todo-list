import React from "react";
import Image from "next/image";
import type { Item } from "@/types/item";
import CheckListItem from "./CheckListItem";
import "@/styles/home.css";

type Props = {
  titleImage: string;
  emptyImage: string;
  emptyText: string;
  items: Item[];
  toggleItem: (id: number) => void;
};

const CheckList = ({
  titleImage,
  emptyImage,
  emptyText,
  items,
  toggleItem,
}: Props) => {
  return (
    <div>
      <Image
        className="check-list-title"
        src={titleImage}
        alt=""
        width={101}
        height={36}
      />

      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <CheckListItem
              key={item.id}
              id={item.id!}
              name={item.name}
              isCompleted={item.isCompleted}
              toggleItem={toggleItem}
            />
          ))
        ) : (
          <div className="check-list-empty">
            <Image src={emptyImage} alt="" width={240} height={240} />
            <p style={{ textAlign: "center" }}>
              {emptyText.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default CheckList;
