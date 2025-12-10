import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./community.css";

const API_URL = "http://localhost:5000";

export default function Mysystem() {
  // Display user's saved systems
  const [userSystems, setUserSystems] = useState([]);
  const [loadingUserSystems, setLoadingUserSystems] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetchUserSystems();
  }, []);

    // Listen for newly saved systems so we can update the list immediately
  useEffect(() => {
    const handler = (e) => {
      const newSystem = e?.detail;
      if (!newSystem) return;
      setUserSystems((prev) => {
        // avoid duplicate if it already exists
        if (prev.some((s) => s._id === newSystem._id)) return prev;
        return [newSystem, ...prev];
      });
      setMessage({ type: "success", text: "New system saved." });
    };

    window.addEventListener("customSystemSaved", handler);
    return () => window.removeEventListener("customSystemSaved", handler);
  }, []);

  // Auto-clear messages after 2 seconds
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 2000);
    return () => clearTimeout(t);
  }, [message]);
  
  async function fetchUserSystems() {
    setLoadingUserSystems(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/payload/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        // controller returns { message, systems }
        setUserSystems(data.systems || []);
      } else {
        const text = await res.text();
        throw new Error(text || `Server ${res.status}`);
      }
    } catch (err) {
      console.error("Error fetching user systems:", err);
      setMessage({ type: "error", text: "Failed to load your systems" });
    } finally {
      setLoadingUserSystems(false);
    }
  }

  async function handleDelete(systemId) {
    if (!window.confirm("Are you sure you want to delete this system?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/payload/${systemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setUserSystems((prev) => prev.filter((s) => s._id !== systemId));
        setMessage({ type: "success", text: "System deleted successfully." });
      } else {
        const text = await res.text();
        throw new Error(text || `Server ${res.status}`);
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Could not delete system." });
    }
  }

  const handleLoadToEditor = (system) => {
    // navigate to Customcircuit and pass the system state
    navigate("/Customcircuit", { state: { loadedSystem: system } });
  };

  return (
    <div className="community-page compact bg-blue-100 pb-50 hero min-h-screen">
      <div className="p-6 max-w-8/10 mx-auto translate-y-30">
        <h2 className="text-2xl font-bold text-white bg-black w-fit p-2 mb-4">Your Saved Systems</h2>

        {message && (
          <div className={`mt-4 p-3 rounded ${message.type === "success" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
            {message.text}
          </div>
        )}

        {loadingUserSystems ? (
          <div className="loading-spinner"><p>Loading your systems...</p></div>
        ) : userSystems.length === 0 ? token ? (
          <div className="no-systems"><p>No systems saved yet.</p></div>): (
          <div className="no-systems"><p>Please log in to view your saved systems.</p></div>
        ) : (
          <div className="systems-feed">
            {userSystems.map((system) => (
              <div key={system._id} className="system-card">
                <div className="card-header">
                  <div className="user-info">
                    <div className="user-avatar">{system.username?.charAt(0).toUpperCase() || "U"}</div>
                    <div className="user-details">
                      <h3 className="username">{system.username}</h3>
                      <p className="date">{new Date(system.createdAt).toLocaleDateString()}</p>
                    </div>
                      <div className="system-type-badge ml-auto">
                        <span className={`plan-badge ${system.plan}`}>{system.plan}</span>
                      </div>
                  </div>
                </div>

                {system.systemImage && (
                  <div className="card-image"><img src={system.systemImage} alt="system" /></div>
                )}

                <div className="card-content flex justify-evenly">
                  

                  <div className="system-stats w-1/2">
                    <div className="stat-item"><span className="stat-label">Usage</span><span className="stat-value">{system.monthlyUsage} kWh</span></div>
                    <div className="stat-item"><span className="stat-label">Reduction</span><span className="stat-value">{system.desiredReduction}%</span></div>
                    <div className="stat-item"><span className="stat-label">Total</span><span className="stat-value">₹{(system.costs?.total || 0).toLocaleString()}</span></div>
                  </div>

                  <div className="equipment-section">
                    <h4>Equipment</h4>
                    <div className="equipment-grid">
                      {system.selectedSolar && (
                        <div className="equipment-item">
                          <span className="equipment-emoji">☀️</span>
                          <div>
                            <p className="equipment-name">{system.selectedSolar.brand} {system.selectedSolar.model}</p>
                            <p className="equipment-detail">{system.selectedSolar.watt}W • Qty: {system.counts?.solarCount}</p>
                          </div>
                        </div>
                      )}
                      {system.selectedWind && (
                        <div className="equipment-item">
                          <span className="equipment-emoji">💨</span>
                          <div>
                            <p className="equipment-name">{system.selectedWind.brand} {system.selectedWind.model}</p>
                            <p className="equipment-detail">{system.selectedWind.kw}kW • Qty: {system.counts?.windCount}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="card-footer flex justify-end gap-2">
                  <button className="view-details-btn w-1/4" onClick={() => handleLoadToEditor(system)}>Load / Edit</button>
                  <button className="modify-btn w-1/4" onClick={() => handleDelete(system._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
