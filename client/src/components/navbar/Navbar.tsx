import Link from "next/link";
import { NavLinks } from "./Navlinks";
import { Username } from "../Username";

// Placeholder until auth exists; swap for the real signed-in user later.
const currentUser = { email: "maria@upatras.gr" };

// Top bar: logo, links, signed-in user.
export function Navbar() {
  const initial = currentUser.email.charAt(0).toUpperCase();

  return (
    <nav className="flex items-center justify-between rounded-t-xl bg-zinc-900 px-6 py-3">
      <Link
        href="/dashboard"
        className="flex items-center gap-2.5 rounded-md text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500"
      >
        <ShieldIcon />
        <span className="text-[15px] font-semibold">Crimson Scan</span>
      </Link>

      <NavLinks />

      <Username />
    </nav>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-red-500"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9.5 12l1.8 1.8L15 10" />
    </svg>
  );
}