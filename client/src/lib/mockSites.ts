// TEMP: fake sites for building the dashboard. Delete when the sites API exists.
import type { Site } from "@/lib/types";

export const mockSites: Site[] = [
  { id: "1", name: "My Shop", domain: "myshop.example", status: "verified", lastScan: "Today, 17:02", findings: { high: 2, medium: 3, low: 4 } },
  { id: "2", name: "Portfolio", domain: "maria.dev", status: "verified", lastScan: "Yesterday", findings: { high: 0, medium: 2, low: 3 } },
  { id: "3", name: "Team project", domain: "ceid-project.example", status: "pending", lastScan: null, findings: null },
];