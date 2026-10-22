"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/scans", label: "Scans" },
  { href: "/settings", label: "Settings" },
];

// Center links; highlights the current page. Client-only because it reads the URL.
export function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="hidden items-center gap-6 md:flex">
      {links.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-sm text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500 ${
              isActive ? "text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}