type Row = { id: string; category: boolean; description: string; qty: number; rate: number };
type Props = { rows: Row[]; currency: string };
const money = (value: number, currency: string) => `${Math.round(Number(value) || 0).toLocaleString("en-US")} ${currency}`;
export function CategoryInvoiceRows({ rows, currency }: Props) {
  return <>{rows.map((row) => row.category ? <div className="doc-tr doc-category category-invoice-row" key={row.id}><strong>{row.description}</strong><span>{row.qty || "—"}</span><span>{money(Number(row.rate) || 0, currency)}</span><b>{money((Number(row.qty) || 0) * (Number(row.rate) || 0), currency)}</b></div> : <div className="doc-tr item-invoice-row" key={row.id}><span>{row.description}</span><span/><span/><span/></div>)}</>;
}
