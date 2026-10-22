// Results (/scans/[id]): ScanProgress while running, then summary + FindingCards.
export default function ScanPage({ params }: { params: { id: string } }) {
  return <main>Scan {params.id}</main>;
}
