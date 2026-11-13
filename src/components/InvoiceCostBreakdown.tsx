type Row = { category: boolean; description: string; qty: number; rate: number };
type Props = { rows: Row[]; guestCount: number; currency: string };
const amount = (value: number, currency: string) => `${Math.round(value || 0).toLocaleString("en-US")} ${currency}`;
export function InvoiceCostBreakdown({ rows, guestCount, currency }: Props) {
  const foodTotal = rows.reduce((sum, row) => sum + (row.category && /food|menu/i.test(row.description) ? (Number(row.qty) || 0) * (Number(row.rate) || 0) : 0), 0);
  const setupTotal = rows.reduce((sum, row) => sum + (row.category && /setup|decor|decoration/i.test(row.description) ? (Number(row.qty) || 0) * (Number(row.rate) || 0) : 0), 0);
  const guests = Number(guestCount) || 0;
  const foodPerGuest = guests ? foodTotal / guests : 0;
  const setupPerGuest = guests ? setupTotal / guests : 0;
  return <div className="per-head-breakdown"><h4>PER-PERSON COST {guests ? `· ${guests} GUESTS` : "· ADD GUEST COUNT"}</h4><div><span>Food per guest</span><b>{amount(foodPerGuest, currency)}</b></div><div><span>Setup per guest</span><b>{amount(setupPerGuest, currency)}</b></div><div className="per-head-total"><span>Total per guest</span><b>{amount(foodPerGuest + setupPerGuest, currency)}</b></div></div>;
}
