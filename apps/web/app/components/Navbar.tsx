"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar({ activeSlide = 0 }: { activeSlide?: number }) {
  const isPinkBg = activeSlide === 1 || activeSlide === 2;
  const router = useRouter();

  const handleClick = () => {
    router.push("/sign-in");
  };

  return (
    <nav
      className={`navbar-container ${isPinkBg ? "pink-bg" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 150,
        padding: "0 32px",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "transparent",
        transition: "all 0.3s ease",
      }}
    >
      <Link
        href="/"
        style={{ display: "flex", alignItems: "center", gap: "12px" }}
      >
        <span className="stylized-name">CreatorsRewards</span>
      </Link>

      <Link
        href="/sign-in"
        className="btn-ghost nav-btn"
        style={{
          padding: "10px 24px",
          fontSize: "14px",
          borderRadius: "100px",
          borderColor: isPinkBg ? "#fff" : "var(--cr-pink)",
          color: isPinkBg ? "#fff" : "var(--cr-pink)",
          borderWidth: "2px",
        }}
        onClick={handleClick}
      >
        Sign In
      </Link>
    </nav>
  );
}
