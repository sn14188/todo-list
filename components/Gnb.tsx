import React from "react";
import Link from "next/link";
import "../app/globals.css";

const Gnb = () => {
  return (
    <header className="gnb">
      <Link href="/" className="gnb-logo">
        <picture>
          <source media="(max-width: 600px)" srcSet="/logo-small.png" />
          <img src="/logo-large.png" alt="" />
        </picture>
      </Link>
    </header>
  );
};

export default Gnb;
