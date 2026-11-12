type Row = { category: boolean; description: string; qty: number; rate: number };
type Props = { rows: Row[]; guestCount: number; currency: string };
const amount = (value: number, currency: string) => `${Math.round(value || 0).toLocaleString("en-US")} ${currency}`;
export function InvoiceCostBreakdown({ rows, guestCount, currency }: Props) {
  let category = "";
  let foodTotal = 0;
  let setupTotal = 0;
  let inferredGuests = 0;
  for (const row of rows) {
    if (row.category) {
      category = row.description.toLowerCase();
      continue;
    }
    const quantity = Number(row.qty) || 0;
    const lineTotal = quantity * (Number(row.rate) || 0);
    if (category.includes("food") || category.includes("menu")) {
      foodTotal += lineTotal;
      inferredGuests = Math.max(inferredGuests, quantity);
    }
    if (category.includes("setup") || category.includes("decor") || category.includes("decoration")) setupTotal += lineTotal;
  }
  const guests = Number(guestCount) || inferredGuests;
  const foodPerGuest = guests ? foodTotal / guests : 0;
  const setupPerGuest = guests ? setupTotal / guests : 0;
  return <div className="per-head-breakdown"><h4>PER-PERSON COST {guests ? `· ${guests} GUESTS` : "· ADD GUEST COUNT"}</h4><div><span>Food per guest</span><b>{amount(foodPerGuest, currency)}</b></div><div><span>Setup per guest</span><b>{amount(setupPerGuest, currency)}</b></div><div className="per-head-total"><span>Total per guest</span><b>{amount(foodPerGuest + setupPerGuest, currency)}</b></div></div>;
}
