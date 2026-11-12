type Props = { food: number; setup: number; currency: string };
const amount = (value: number, currency: string) => `${Math.round(value || 0).toLocaleString("en-US")} ${currency}`;
export function InvoiceCostBreakdown({ food, setup, currency }: Props) {
  return <div className="per-head-breakdown"><h4>PER-PERSON COST</h4><div><span>Food per guest</span><b>{amount(food, currency)}</b></div><div><span>Setup per guest</span><b>{amount(setup, currency)}</b></div><div className="per-head-total"><span>Total per guest</span><b>{amount(food + setup, currency)}</b></div></div>;
}
