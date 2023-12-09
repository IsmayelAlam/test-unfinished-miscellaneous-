"use client";

import { LinkProps } from "@/utils/interfaces";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface L {
  link: LinkProps;
}

export default function NavLink({ link }: L) {
  const curPath = usePathname();

  return (
    <Link
      href={link.href}
      className={`text-zinc-600 hover:text-zinc-500 transition-colors ${
        curPath === link.href && "text-zinc-900 font-medium"
      }`}
    >
      {link.name}
    </Link>
  );
}
