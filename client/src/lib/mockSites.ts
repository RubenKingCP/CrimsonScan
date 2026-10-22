// TEMP: fake sites for building the dashboard. Delete when the sites API exists.
// Scan data (date, findings) is NOT here: it's looked up in mockScans by domain.
import type { Site } from "@/lib/types";

export const mockSites: Site[] = [
  { id: "s1", name: "My Shop", domain: "myshop.example", status: "verified" },
  { id: "s2", name: "Portfolio", domain: "maria.dev", status: "verified" },
  { id: "s3", name: "Team project", domain: "ceid-project.example", status: "pending" }, // never scanned
  { id: "s4", name: "Blog", domain: "ruben.blog", status: "verified" },
  { id: "s5", name: "Café Menu", domain: "cafe-menu.example", status: "verified" },
  { id: "s6", name: "Admin Panel", domain: "admin.myshop.example", status: "verified" },
];