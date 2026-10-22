import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/scans", label: "Scans" },
  { href: "/about", label: "About" },
];

// Top bar: logo, links, signed-in user.
export function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-red-900 px-6 py-3">
      <Link href="/" className="text-xl font-bold text-white">
        CrimsonScan
      </Link>

      <div className="flex">
        {links.map((link) => (
          <NavbarLink key={link.href} href={link.href}>
            {link.label}
          </NavbarLink>
        ))}
      </div>

      <span className="text-white">Guest</span>
    </nav>
  );
}

function NavbarLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="px-4 py-2 text-white hover:text-gray-300">
      {children}
    </Link>
  );
}