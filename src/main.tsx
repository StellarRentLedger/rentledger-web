import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BadgeDollarSign,
  CalendarClock,
  CheckCircle2,
  CircleAlert,
  Gavel,
  Home,
  Landmark,
  LockKeyhole,
  Wallet,
} from "lucide-react";
import { useFreighter } from "./lib/useFreighter";
import { shortAddress } from "./lib/stellar";
import "./styles.css";

const sampleActivity = [
  { label: "Lease funded", value: "1,500 USDC", tone: "green" },
  { label: "Next release", value: "Ledger 941022", tone: "ink" },
  { label: "Deposit status", value: "Locked", tone: "amber" },
];

function App() {
  const wallet = useFreighter();
  const [rent, setRent] = useState("125");
  const [deposit, setDeposit] = useState("250");
  const [months, setMonths] = useState(12);
  const [landlord, setLandlord] = useState("");
  const [token, setToken] = useState("USDC testnet SAC address");

  const total = useMemo(() => {
    const rentValue = Number(rent || 0);
    const depositValue = Number(deposit || 0);
    return rentValue * months + depositValue;
  }, [rent, deposit, months]);

  return (
    <main className="shell">
      <section className="mast">
        <nav className="topbar" aria-label="Main">
          <div className="brand">
            <Home size={22} aria-hidden />
            <span>RentLedger</span>
          </div>
          <button className="iconButton" type="button" onClick={wallet.connect} title="Connect wallet">
            <Wallet size={18} aria-hidden />
            <span>{wallet.address ? shortAddress(wallet.address) : "Connect"}</span>
          </button>
        </nav>

        <div className="heroGrid">
          <div className="headline">
            <p className="eyebrow">Escrow rails for informal rentals</p>
            <h1>Rent releases monthly. Deposits stop disappearing.</h1>
          </div>
          <div className="ledgerStrip" aria-label="Lease summary">
            {sampleActivity.map((item) => (
              <div className="ledgerItem" key={item.label}>
                <span>{item.label}</span>
                <strong data-tone={item.tone}>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="workspace" aria-label="Lease workspace">
        <form className="leasePanel">
          <div className="panelHeader">
            <div>
              <p className="eyebrow">New lease</p>
              <h2>Lock rent and deposit</h2>
            </div>
            <LockKeyhole size={24} aria-hidden />
          </div>

          <label>
            Landlord Stellar address
            <input value={landlord} onChange={(event) => setLandlord(event.target.value)} placeholder="G..." />
          </label>

          <label>
            Stablecoin token contract
            <input value={token} onChange={(event) => setToken(event.target.value)} />
          </label>

          <div className="split">
            <label>
              Monthly rent
              <input inputMode="decimal" value={rent} onChange={(event) => setRent(event.target.value)} />
            </label>
            <label>
              Deposit
              <input inputMode="decimal" value={deposit} onChange={(event) => setDeposit(event.target.value)} />
            </label>
          </div>

          <label>
            Lease length
            <input type="range" min="1" max="24" value={months} onChange={(event) => setMonths(Number(event.target.value))} />
            <span className="rangeReadout">{months} months</span>
          </label>

          <div className="totalBox">
            <span>Total escrow</span>
            <strong>{total.toLocaleString()} stablecoins</strong>
          </div>

          <button className="primary" type="button">
            <BadgeDollarSign size={20} aria-hidden />
            Prepare lease transaction
          </button>
          {wallet.error && <p className="error">{wallet.error}</p>}
        </form>

        <aside className="statusRail">
          <div className="railBlock">
            <CalendarClock size={22} aria-hidden />
            <div>
              <h3>Monthly release</h3>
              <p>Anyone can trigger eligible rent release after the scheduled ledger.</p>
            </div>
          </div>
          <div className="railBlock">
            <CheckCircle2 size={22} aria-hidden />
            <div>
              <h3>Dual confirmation</h3>
              <p>Tenant and landlord signatures release the deposit at lease close.</p>
            </div>
          </div>
          <div className="railBlock">
            <Gavel size={22} aria-hidden />
            <div>
              <h3>Arbitrator pool</h3>
              <p>Community arbiters split deposits only after a party opens a dispute.</p>
            </div>
          </div>
          <div className="railBlock warning">
            <CircleAlert size={22} aria-hidden />
            <div>
              <h3>Contributor note</h3>
              <p>Wire this form to generated contract bindings after the WASM is deployed.</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="marketBand">
        <Landmark size={24} aria-hidden />
        <p>Built for Lagos, Nairobi, and Accra rent flows where annual cash payments and agent deposits need a durable trail.</p>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
