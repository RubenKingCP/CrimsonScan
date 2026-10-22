// One summary box on the dashboard: a label, a big number and an optional detail line.
type Props = {
  label: string;
  value: number;
  detail?: string;
  highlight?: boolean;
};

export function StatCard({ label, value, detail, highlight }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <p className="text-sm text-gray-600">{label}</p>
      <p className={`mt-1 text-3xl font-bold ${highlight ? "text-crimson" : "text-gray-900"}`}>
        {value}
      </p>
      {detail && <p className="mt-2 text-xs text-gray-500">{detail}</p>}
    </div>
  );
}