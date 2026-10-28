"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  label?: string;
  useHistory?: boolean;
  to?: string;
}

const BackButton = ({
  label = "Back",
  useHistory = false,
  to = "/",
}: BackButtonProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (useHistory) {
      e.preventDefault();
      router.back();
    }
  };

  return (
    <a
      href={useHistory ? "#" : to}
      onClick={handleClick}
      className="mb-10 inline-flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-(--text-secondary) no-underline transition-[color,transform] duration-200 hover:-translate-x-1 hover:text-cr-pink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cr-pink"
    >
      <ArrowLeft size={14} strokeWidth={2.5} />
      {label}
    </a>
  );
};

export default BackButton;
