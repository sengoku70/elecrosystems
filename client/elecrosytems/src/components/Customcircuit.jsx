import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./community.css";
import Mysystem from "./Mysystem.jsx";

// Custom Systems page
// - lets user enter monthly usage (kWh)
// - choose desired reduction percent
// - choose solar panel brand/model and wind turbine brand/model
// - recommends number of panels/turbines (solar-only, wind-only, mixed)
// - shows equipment cost + estimated wiring & installation cost
// - allows loading of templates (suburb house, country house, industry, agriculture)
// - on submit, builds an object and POSTs to /api/custom-systems

export default function CustomSystemsPage() {
  // Sample product catalogs (you can extend or fetch from backend)
  const API_URL = "http://localhost:5000";
  const location = useLocation();
  
  const solarCatalog = [
    { id: "sp1", brand: "SunPower", model: "SunPower 410W", watt: 410, price: 230 },
    { id: "sp2", brand: "LG", model: "LG 370W", watt: 370, price: 190 },
    { id: "sp3", brand: "JA Solar", model: "JA 330W", watt: 330, price: 140 },
    { id: "sp4", brand: "Canadian Solar", model: "CS6R 415W", watt: 415, price: 200 },
    { id: "sp5", brand: "Trina Solar", model: "Trina Vertex S 420W", watt: 420, price: 205 },
    { id: "sp6", brand: "Jinko Solar", model: "Jinko Tiger Neo 445W", watt: 445, price: 215 },
    { id: "sp7", brand: "Q CELLS", model: "Q.PEAK DUO BLK ML-G10+ 400W", watt: 400, price: 210 },
    { id: "sp8", brand: "REC", model: "REC Alpha Pure 405W", watt: 405, price: 225 },
    { id: "sp9", brand: "First Solar", model: "Series 6 420W", watt: 420, price: 230 },
    { id: "sp10", brand: "LONGi Solar", model: "LONGi Hi-MO 5 540W", watt: 540, price: 250 },
    { id: "sp11", brand: "Risen Energy", model: "Risen Titan 410W", watt: 410, price: 185 },
    { id: "sp12", brand: "Astronergy", model: "Astronergy ASTRO N5 445W", watt: 445, price: 210 },
    { id: "sp13", brand: "Panasonic", model: "Panasonic EverVolt 410W", watt: 410, price: 240 },
    { id: "sp14", brand: "Sharp", model: "Sharp NU-JC410 410W", watt: 410, price: 200 },
    { id: "sp15", brand: "Talesun", model: "Talesun Bistar 430W", watt: 430, price: 190 }

  ];

  const windCatalog = [
    { id: "wt1", brand: "Bergey", model: "Bergey 5kW", kw: 5, price: 15000 },
    { id: "wt2", brand: "Primus", model: "Primus 2kW", kw: 2, price: 7000 },
    { id: "wt3", brand: "Eocycle", model: "Eocycle 1kW", kw: 1, price: 3500 },
    { id: "wt4", brand: "Siemens Gamesa", model: "SG 3.4 kW", kw: 3.4, price: 12000 },
    { id: "wt5", brand: "Vestas", model: "Vestas V1.5 kW", kw: 1.5, price: 6000 },
    { id: "wt6", brand: "GE Renewable Energy", model: "GE 2 kW", kw: 2, price: 8000 },
    { id: "wt7", brand: "Nordex", model: "Nordex N2.5 kW", kw: 2.5, price: 9000 },
    { id: "wt8", brand: "Enercon", model: "Enercon E1.8 kW", kw: 1.8, price: 7000 },
    { id: "wt9", brand: "Suzlon", model: "Suzlon S3 kW", kw: 3, price: 11000 },
    { id: "wt10", brand: "Goldwind", model: "Goldwind G2 kW", kw: 2, price: 7500 },
    { id: "wt11", brand: "Senvion", model: "Senvion 2.2 kW", kw: 2.2, price: 8200 },
    { id: "wt12", brand: "Kingspan", model: "Kingspan KW3 3kW", kw: 3, price: 10000 },
    { id: "wt13", brand: "Osaki", model: "Osaki 1.2kW", kw: 1.2, price: 4000 },
    { id: "wt14", brand: "Aeolos", model: "Aeolos 5kW", kw: 5, price: 16000 },
    { id: "wt15", brand: "Superwind", model: "Superwind 350", kw: 0.35, price: 2800 }

  ];

  const templates = {
    "suburb-house": {
      label: "Suburb House",
      monthlyUsage: 900, // kWh
      avgSunHours: 4.5,
      windCapacityFactor: 0.18,
      note: "Typical family home in suburb",
    },
    "country-house": {
      label: "Country House",
      monthlyUsage: 1200,
      avgSunHours: 5.0,
      windCapacityFactor: 0.25,
      note: "Rural house with more roof space and wind",
    },
    industry: {
      label: "Industry",
      monthlyUsage: 12000,
      avgSunHours: 4.0,
      windCapacityFactor: 0.2,
      note: "Small industrial facility",
    },
    agriculture: {
      label: "Agriculture",
      monthlyUsage: 2500,
      avgSunHours: 4.8,
      windCapacityFactor: 0.22,
      note: "Farm usage including pumps and cold storage",
    },
  };

  // Local state
  const [monthlyUsage, setMonthlyUsage] = useState(templates["suburb-house"].monthlyUsage);
  const [desiredReduction, setDesiredReduction] = useState(70); // percent of usage to offset
  const [selectedSolar, setSelectedSolar] = useState(solarCatalog[0].id);
  const [selectedWind, setSelectedWind] = useState(windCatalog[2].id);
  const [avgSunHours, setAvgSunHours] = useState(templates["suburb-house"].avgSunHours);
  const [windCapacityFactor, setWindCapacityFactor] = useState(templates["suburb-house"].windCapacityFactor);
  const [mixedSolarShare, setMixedSolarShare] = useState(70); // for mixed proposal, percent from solar
  const [installationMarkupPercent, setInstallationMarkupPercent] = useState(12); // percent of equipment cost
  const [selectedTemplate, setSelectedTemplate] = useState("suburb-house");
  const [notes, setNotes] = useState(templates["suburb-house"].note);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  
  // Load system from community if passed via navigation state
  useEffect(() => {
    if (location.state?.loadedSystem) {
      const system = location.state.loadedSystem;
      
      // Find the matching solar product ID
      const solarId = solarCatalog.find(p => 
        p.brand === system.selectedSolar.brand && 
        p.model === system.selectedSolar.model
      )?.id || solarCatalog[0].id;
      
      // Find the matching wind product ID
      const windId = windCatalog.find(p => 
        p.brand === system.selectedWind.brand && 
        p.model === system.selectedWind.model
      )?.id || windCatalog[0].id;

      setMonthlyUsage(system.monthlyUsage);
      setDesiredReduction(system.desiredReduction);
      setSelectedSolar(solarId);
      setSelectedWind(windId);
      setAvgSunHours(system.avgSunHours);
      setWindCapacityFactor(system.windCapacityFactor);
      setSelectedTemplate(system.template);
      setNotes(system.notes);
      
      // Calculate mixed solar share from the counts
      if (system.plan === "mixed" && system.counts) {
        const totalCount = system.counts.solarCount + system.counts.windCount;
        if (totalCount > 0) {
          setMixedSolarShare(Math.round((system.counts.solarCount / totalCount) * 100));
        }
      }
    }
  }, [location.state]);

  // helpers to lookup products
  const solarProduct = useMemo(() => solarCatalog.find((p) => p.id === selectedSolar), [selectedSolar]);
  const windProduct = useMemo(() => windCatalog.find((p) => p.id === selectedWind), [selectedWind]);

  // Calculation logic
  // Desired kWh to offset
  const desiredKWh = (monthlyUsage * desiredReduction) / 100;

  // Solar: monthly production per panel (kWh) = (watt * avgSunHours * 30) / 1000
  const solarPanelMonthly = (solarProduct.watt * avgSunHours * 30) / 1000;

  // Wind: turbine monthly production (kWh) = kw * 1000 * hours_in_month * capacity_factor / 1000 => kw * 24 * 30 * capacity_factor
  const turbineMonthly = windProduct.kw * 24 * 30 * windCapacityFactor;

  function computeNeededCounts({ targetKWh, solarShare = 100 }) {
    // solarShare is percent of targetKWh to provide from solar in mixed plan
    const solarTarget = (targetKWh * solarShare) / 100;
    const windTarget = targetKWh - solarTarget;

    const solarCount = Math.ceil(solarTarget / Math.max(0.0001, solarPanelMonthly));
    const windCount = Math.ceil(windTarget / Math.max(0.0001, turbineMonthly));

    return { solarCount, windCount };
  }

  // Three recommendation options
  const solarOnly = computeNeededCounts({ targetKWh: desiredKWh, solarShare: 100 });
  const windOnly = computeNeededCounts({ targetKWh: desiredKWh, solarShare: 0 });
  const mixed = computeNeededCounts({ targetKWh: desiredKWh, solarShare: mixedSolarShare });

  // Cost calculations
  function calcCosts(plan) {
    const solarEquip = plan.solarCount * solarProduct.price;
    const windEquip = plan.windCount * windProduct.price;
    const equipmentCost = solarEquip + windEquip;
    const installation = Math.round((installationMarkupPercent / 100) * equipmentCost + 500); // + fixed baseline
    const total = equipmentCost + installation;
    return { solarEquip, windEquip, equipmentCost, installation, total };
  }

  const solarOnlyCosts = calcCosts(solarOnly);
  const windOnlyCosts = calcCosts(windOnly);
  const mixedCosts = calcCosts(mixed);

  async function handleSubmit(planChoice) {
    setSubmitting(true);
    setMessage(null);

    const planMap = { solarOnly, windOnly, mixed };
    const costMap = { solarOnly: solarOnlyCosts, windOnly: windOnlyCosts, mixed: mixedCosts };

    const plan = planMap[planChoice];
    const costs = costMap[planChoice];

    const payload = {
      template: selectedTemplate,
      monthlyUsage,
      desiredReduction,
      avgSunHours,
      windCapacityFactor,
      selectedSolar: solarProduct,
      selectedWind: windProduct,
      plan: planChoice,
      counts: plan,
      costs,
      notes,
      createdAt: new Date().toISOString(),
    };

    try {
      // Send to backend - adapt endpoint as needed
      const token = localStorage.getItem("token");
      console.log("token:",token);
      const res = await fetch(`${API_URL}/payload/saveCustomSystem`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
         },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Server responded ${res.status}`);
      }

      const data = await res.json();
      // Dispatch a global event so other components (like Mysystem) can update immediately
      try {
        const savedSystem = data.system || data;
        window.dispatchEvent(new CustomEvent("customSystemSaved", { detail: savedSystem }));
      } catch (e) {
        console.warn("Failed to dispatch customSystemSaved event", e);
      }
      setMessage({ type: "success", text: "System saved successfully." });
      console.log("saved:", data);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Could not save system. Check console for details." });
    } finally {
      setSubmitting(false);
    }
  }

  function applyTemplate(key) {
    const t = templates[key];
    setSelectedTemplate(key);
    setMonthlyUsage(t.monthlyUsage);
    setAvgSunHours(t.avgSunHours);
    setWindCapacityFactor(t.windCapacityFactor);
    setNotes(t.note);
  }

  return (
    <div className="bg-blue-100 pb-50 hero bg-fixed thicc">
    <div className="p-6 max-w-8/10 mx-auto translate-y-30">
      <h1 className="text-3xl font-bold text-white bg-black w-fit p-2 mb-4">Custom Systems</h1>
      <p className="mb-6 text-md text-muted-foreground">Build a hybrid solar + wind recommendation to reduce dependency on the grid. Fill inputs, pick brands, and submit to save.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 bg-white/60 shadow-2xl gap-6">
        <div className="p-4  rounded-lg">
          <h2 className="font-semibold mb-2">Usage & Targets</h2>

          <label className="block text-sm mb-1">Preloaded Templates</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {Object.entries(templates).map(([k, v]) => (
              <button
                key={k}
                onClick={() => applyTemplate(k)}
                className={`px-3 py-1 border-b-4 border-black ${selectedTemplate === k ? "bg-black text-white" : "bg-white"}`}>
                {v.label}
              </button>
            ))}
          </div>

          <label className="block text-sm">Monthly usage (kWh)</label>
          <input type="number" value={monthlyUsage} onChange={(e) => setMonthlyUsage(Number(e.target.value))} className="w-1/3 p-2 border rounded mb-3" />

          <label className="block text-sm">Desired grid reduction (%)</label>
          <input type="range" min={0} max={100} value={desiredReduction} onChange={(e) => setDesiredReduction(Number(e.target.value))} />
          <div className="text-sm mb-3">{desiredReduction}% of {monthlyUsage} kWh ⇒ <strong>{Math.round(desiredKWh)} kWh</strong> target</div>

          <label className="block text-sm">Average sun hours / day</label>
          <input type="number" step="0.1" value={avgSunHours} onChange={(e) => setAvgSunHours(Number(e.target.value))} className="w-1/3 p-2 border rounded mb-3" />

          <label className="block text-sm">Wind capacity factor (0-1)</label>
          <input type="number" step="0.01" min={0} max={1} value={windCapacityFactor} onChange={(e) => setWindCapacityFactor(Number(e.target.value))} className="w-full p-2 border rounded mb-3" />

          <label className="block text-sm">Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        
        <div className="p-4 border-l-[10px] ">
          <h2 className="font-semibold mb-2">Select Equipment</h2>

          {/* Top: primary selects */}
          <div className="bg-white/40 p-3 rounded-lg shadow-sm mb-3">
            <label className="block text-sm">Solar panel brand & model</label>
            <select value={selectedSolar} onChange={(e) => setSelectedSolar(e.target.value)} className="w-full p-2 border rounded mb-3">
              {solarCatalog.map((p) => (
                <option key={p.id} value={p.id}>{p.brand} — {p.model} — {p.watt}W — ₹{p.price}</option>
              ))}
            </select>

            <label className="block text-sm">Wind turbine brand & model</label>
            <select value={selectedWind} onChange={(e) => setSelectedWind(e.target.value)} className="w-full p-2 border rounded">
              {windCatalog.map((p) => (
                <option key={p.id} value={p.id}>{p.brand} — {p.model} — {p.kw} kW — ₹{p.price}</option>
              ))}
            </select>
          </div>

          {/* Bottom: settings */}
          <div className="bg-white/40 p-3 rounded-lg shadow-sm">
            <label className="block text-sm">Installation markup (%)</label>
            <input type="number" value={installationMarkupPercent} onChange={(e) => setInstallationMarkupPercent(Number(e.target.value))} className="w-full p-2 border rounded mb-3" />

            <label className="block text-sm">Mixed plan solar share (%)</label>
            <input type="range" min={0} max={100} value={mixedSolarShare} onChange={(e) => setMixedSolarShare(Number(e.target.value))} className="w-full" />
            <div className="text-sm mt-2">Solar share in mixed plan: <strong>{mixedSolarShare}%</strong></div>
          </div>

          {/* Animated bar chart summary for the mixed plan */}
          <div className="mt-4 p-3 bg-white/40 rounded-lg shadow-sm">
            <h4 className="font-medium mb-2">Estimated monthly production (mixed)</h4>
            <AnimatedBarChart
              solarKWh={Math.round(mixed.solarCount * solarPanelMonthly)}
              windKWh={Math.round(mixed.windCount * turbineMonthly)}
              desiredKWh={Math.round(desiredKWh)}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <PlanCard title="Solar only" counts={solarOnly} costs={solarOnlyCosts} onSubmit={() => handleSubmit("solarOnly")} submitting={submitting} />
        <PlanCard title="Wind only" counts={windOnly} costs={windOnlyCosts} onSubmit={() => handleSubmit("windOnly")} submitting={submitting} />
        <PlanCard title={`Mixed (${mixedSolarShare}% solar)`} counts={mixed} costs={mixedCosts} onSubmit={() => handleSubmit("mixed")} submitting={submitting} />
      </div>

      {message && (
        <div className={`mt-4 p-3 rounded ${message.type === "success" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
          {message.text}
        </div>
      )}

      <div className="mt-8 text-xs text-muted-foreground">Notes: Estimates use simplified assumptions (panel wattage × avg sun hours, turbine rated power × capacity factor). Adjust inputs for your local climate and consult a certified installer for precise design and permitting.</div>
    </div>
    <Mysystem/>
    </div>
  );
}

function PlanCard({ title, counts, costs, onSubmit, submitting }) {
  return (
    <div className="p-4 border-b-10 bg-white/60 shadow-2xl">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="text-sm mb-2">Solar panels: <strong>{counts.solarCount}</strong></div>
      <div className="text-sm mb-2">Wind turbines: <strong>{counts.windCount}</strong></div>

      <div className="mb-2">
        <div className="text-sm">Equipment cost: <strong>₹{costs.equipmentCost.toLocaleString()}</strong></div>
        <div className="text-sm">Estimated wiring & installation: <strong>₹{costs.installation.toLocaleString()}</strong></div>
        <div className="text-sm">Total estimate: <strong>₹{costs.total.toLocaleString()}</strong></div>
      </div>

      <button onClick={onSubmit} disabled={submitting} className="mt-2 px-3 py-2 view-details-btn rounded border bg-black text-white w-full">
        {submitting ? "Saving..." : "Choose this plan & Save"}
      </button>

      
    </div>
  );
}

function AnimatedBarChart({ solarKWh = 0, windKWh = 0, desiredKWh = 1 }) {
  const [anim, setAnim] = useState({ s: 0, w: 0 });

  useEffect(() => {
    const sPct = desiredKWh ? Math.round((solarKWh / desiredKWh) * 100) : 0;
    const wPct = desiredKWh ? Math.round((windKWh / desiredKWh) * 100) : 0;
    const sTarget = Math.min(140, sPct);
    const wTarget = Math.min(140, wPct);
    // reset then animate to target for visible transition
    setAnim({ s: 0, w: 0 });
    const t = setTimeout(() => setAnim({ s: sTarget, w: wTarget }), 30);
    return () => clearTimeout(t);
  }, [solarKWh, windKWh, desiredKWh]);

  const maxBar = Math.max(anim.s, anim.w, 100);

  const sPercent = desiredKWh ? Math.round((solarKWh / desiredKWh) * 100) : 0;
  const wPercent = desiredKWh ? Math.round((windKWh / desiredKWh) * 100) : 0;

  if (solarKWh === 0 && windKWh === 0) {
    return <div className="text-sm text-center text-muted-foreground">No estimated production — adjust inputs to see the chart.</div>;
  }

  return (
    <div>
      <div className="flex items-end gap-4 h-44 mt-16">
        {/* Solar bar */}
        <div className="flex-1 flex flex-col items-center">
          <div className="text-xs mb-2 font-medium">{sPercent}%</div>
          <div className="w-full h-36 bg-white/10 rounded-md flex items-end overflow-hidden border border-white/10">
            <div style={{ height: `${(anim.s / maxBar) * 100}%` }} className="w-full mt-4 transition-all duration-800 ease-out bg-gradient-to-t from-yellow-400 to-yellow-200 shadow-inner border-t-2 border-yellow-300" />
          </div>
          <div className="mt-2 text-sm text-center">Solar<br /><strong>{solarKWh} kWh</strong></div>
        </div>

        {/* Wind bar */}
        <div className="flex-1 flex flex-col items-center">
          <div className="text-xs mb-2 font-medium">{wPercent}%</div>
          <div className="w-full h-36 bg-white/10 rounded-md flex items-end overflow-hidden border border-white/10">
            <div style={{ height: `${(anim.w / maxBar) * 100}%` }} className="w-full transition-all duration-800 ease-out bg-gradient-to-t mt-4 from-sky-600 to-sky-300 shadow-inner border-t-2 border-sky-400" />
          </div>
          <div className="mt-2 text-sm text-center">Wind<br /><strong>{windKWh} kWh</strong></div>
        </div>
      </div>

      <div className="mt-3 text-xs text-muted-foreground flex gap-3">
        <div className="px-2 py-1 bg-yellow-50 rounded">Target: <strong>{desiredKWh} kWh</strong></div>
        <div className="px-2 py-1 bg-white/60 rounded">Solar %: <strong>{sPercent}%</strong></div>
        <div className="px-2 py-1 bg-white/60 rounded">Wind %: <strong>{wPercent}%</strong></div>
      </div>
    </div>
  );
}