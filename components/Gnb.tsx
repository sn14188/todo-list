import React from "react";
import Link from "next/link";
import Image from "next/image";

const Gnb = () => {
  return (
    <header
      className="flex h-[60px] w-full items-center border-b bg-white"
      style={{ borderColor: "var(--slate-200)" }}
    >
      <Link href="/">
        <Image
          src="/logo-small.png"
          alt=""
          width={75}
          height={40}
          className="small"
        />

        <Image
          src="/logo-large.png"
          alt=""
          width={160}
          height={40}
          className="large"
        />
      </Link>
    </header>
  );
};

export default Gnb;
