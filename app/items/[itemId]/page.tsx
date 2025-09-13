"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import CheckIcon from "@/components/CheckIcon";
import type { Item } from "@/types/item";
import "@/styles/home.css";
import "@/styles/item.css";
import "@/styles/button.css";

const api = process.env.NEXT_PUBLIC_API;
const tenantId = process.env.NEXT_PUBLIC_TENANT_ID!;

const ItemPage = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const router = useRouter();

  const [item, setItem] = useState<Item | null>(null);
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const spanRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState(10);

  useEffect(() => {
    fetch(`${api}/${tenantId}/items/${itemId}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setName(data.name ?? "");
        setMemo(data.memo ?? "");
        setImageUrl(data.imageUrl ?? "");
      });
  }, [itemId]);

  useEffect(() => {
    if (spanRef.current) {
      const width = spanRef.current.scrollWidth;
      setInputWidth(width + 8);
    }
  }, [name]);

  const handleToggle = async () => {
    if (!item) return;
    const next = !item.isCompleted;

    setItem({ ...item, isCompleted: next });

    await fetch(`${api}/${tenantId}/items/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCompleted: next }),
    });
  };

  const handleImageUpload = async (file: File) => {
    const filename = file.name.split(".")[0];
    const isValidName = /^[a-zA-Z]+$/.test(filename);

    if (!isValidName) {
      alert("The file name must contain only English letters!");
      return;
    }

    const max_size = 2 * 1024 * 1024;
    if (file.size > max_size) {
      alert("The image size must be 2MB or less!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${api}/${tenantId}/images/upload`, {
      method: "POST",
      body: formData,
    });

    // if (res.ok) {
    //   console.log("file uploaded successfully");
    // } else {
    //   console.error("error uploading file");
    // }

    const data = await res.json();
    setImageUrl(data.url);
  };

  const handleSave = async () => {
    if (!item) return;

    await fetch(`${api}/${tenantId}/items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        memo,
        imageUrl,
      }),
    });

    setItem({ ...item, name, memo, imageUrl });
    router.push("/");
  };

  const handleDelete = async () => {
    await fetch(`${api}/${tenantId}/items/${itemId}`, { method: "DELETE" });
    router.push("/");
  };

  if (!item) return;

  return (
    <div className="content">
      <div className="check-list-detail">
        <button className="check-icon" onClick={handleToggle}>
          <CheckIcon checked={item.isCompleted} />
        </button>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="edit-name"
          style={{ width: inputWidth }}
        />
        <span ref={spanRef} className="name-measure">
          {name || " "}
        </span>
      </div>

      <div className="image-memo-wrap">
        <div className="image-card">
          {imageUrl ? (
            <Image src={imageUrl} alt="" fill style={{ objectFit: "cover" }} />
          ) : (
            <div className="image-empty">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M37.9466 5.3335H26.6666C14.8846 5.3335 5.33331 14.8848 5.33331 26.6668V37.9735C5.33331 49.7556 14.8846 59.3068 26.6666 59.3068H37.9466C49.7287 59.3068 59.28 49.7556 59.28 37.9735V26.6668C59.28 14.8848 49.7287 5.3335 37.9466 5.3335ZM21.6533 16.3202C24.5988 16.3202 26.9866 18.708 26.9866 21.6535C26.9866 24.599 24.5988 26.9868 21.6533 26.9868C18.7078 26.9868 16.32 24.599 16.32 21.6535C16.32 18.708 18.7078 16.3202 21.6533 16.3202ZM41.36 53.6535C48.9097 50.834 53.9231 43.6325 53.9466 35.5735L53.8666 30.9868C53.8666 29.8935 53.6533 27.8402 53.6533 27.8402H49.3066C39.2437 27.8707 30.0548 33.5634 25.5466 42.5602C22.2744 39.6349 18.0424 38.0124 13.6533 38.0002H10.4266C10.1886 44.1995 13.5557 49.9776 19.0666 52.8268C21.0367 53.8763 23.2345 54.4257 25.4666 54.4268H36.5866C38.2107 54.4501 39.8263 54.1883 41.36 53.6535Z"
                  fill="#E2E8F0"
                />
              </svg>
            </div>
          )}

          <label className="upload-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12L21 12"
                stroke="#64748B"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M12 21L12 3"
                stroke="#64748B"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
            />
          </label>
        </div>

        <div className="memo-card">
          <div className="memo-title">Memo</div>
          <div className="memo-area">
            <textarea value={memo} onChange={(e) => setMemo(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="button-wrap">
        <button className="button save" onClick={handleSave}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 7L6.5 11.5L14 4"
              stroke="#0F172A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          수정 완료
        </button>
        <button className="button delete" onClick={handleDelete}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4L12 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 4L4 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default ItemPage;
