import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./community.css";

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
  ];

  const windCatalog = [
    { id: "wt1", brand: "Bergey", model: "Bergey 5kW", kw: 5, price: 15000 },
    { id: "wt2", brand: "Primus", model: "Primus 2kW", kw: 2, price: 7000 },
    { id: "wt3", brand: "Eocycle", model: "Eocycle 1kW", kw: 1, price: 3500 },
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
    <div className="bg-blue-100 pb-50 hero">
    <div className="p-6 max-w-8/10 mx-auto translate-y-30">
      <h1 className="text-3xl font-bold text-white bg-black w-fit p-2 mb-4">Custom Systems</h1>
      <p className="mb-6 text-sm text-muted-foreground">Build a hybrid solar + wind recommendation to reduce dependency on the grid. Fill inputs, pick brands, and submit to save.</p>

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

          <label className="block text-sm">Solar panel brand & model</label>
          <select value={selectedSolar} onChange={(e) => setSelectedSolar(e.target.value)} className="w-full p-2 border rounded mb-3">
            {solarCatalog.map((p) => (
              <option key={p.id} value={p.id}>{p.brand} — {p.model} — {p.watt}W — ₹{p.price}</option>
            ))}
          </select>

          <label className="block text-sm">Wind turbine brand & model</label>
          <select value={selectedWind} onChange={(e) => setSelectedWind(e.target.value)} className="w-full p-2 border rounded mb-3">
            {windCatalog.map((p) => (
              <option key={p.id} value={p.id}>{p.brand} — {p.model} — {p.kw} kW — ₹{p.price}</option>
            ))}
          </select>

          <label className="block text-sm">Installation markup (%)</label>
          <input type="number" value={installationMarkupPercent} onChange={(e) => setInstallationMarkupPercent(Number(e.target.value))} className="w-full p-2 border rounded mb-3" />

          <label className="block text-sm">Mixed plan solar share (%)</label>
          <input type="range" min={0} max={100} value={mixedSolarShare} onChange={(e) => setMixedSolarShare(Number(e.target.value))} />
          <div className="text-sm">Solar share in mixed plan: {mixedSolarShare}%</div>
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
