import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./community.css";

export default function Community() {
  const [systems, setSystems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllSystems();
  }, []);

  const fetchAllSystems = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/payload/all");
      const data = await response.json();
      
      if (data.systems) {
        setSystems(data.systems);
      }
    } catch (err) {
      console.error("Error fetching systems:", err);
      setError("Failed to load community systems");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const calculateTotalCost = (costs) => {
    return costs?.total || 0;
  };

  const calculateSavings = (monthlyUsage, desiredReduction) => {
    const estimatedMonthlySavings = monthlyUsage * (desiredReduction / 100);
    return (estimatedMonthlySavings * 12).toFixed(2);
  };

  const handleNavigateToCustom = (system) => {
    // Pass the system data via state to Customcircuit
    navigate("/Customcircuit", { 
      state: { 
        loadedSystem: system 
      } 
    });
  };

  if (loading) {
    return (
      <div className="community-container">
        <div className="loading-spinner">
          <p>Loading community systems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="community-page  bg-blue-100 pb-50 bg-fixed hero min-h-screen">
      <div className="p-6 max-w-8/10 mx-auto translate-y-30">
        <h1 className="text-3xl font-bold text-white bg-black w-fit p-2 mb-4">Community Systems</h1>
        <p className="text-sm text-muted-foreground mb-8">Explore renewable energy solutions from our community and modify them for your needs.</p>

        {error && <div className="error-message">{error}</div>}

        <div className="systems-feed w-full">
          {systems.length === 0 ? (
            <div className="no-systems">
              <p>No custom systems yet. Be the first to share!</p>
            </div>
          ) : (
            systems.map((system) => (
              <div key={system._id} className="system-card">
                {/* Card Header */}
                <div className="card-header">
                  <div className="user-info">
                    <div className="user-avatar">
                      {system.username?.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-details">
                      <h3 className="username">{system.username}</h3>
                      <p className="date">{formatDate(system.createdAt)}</p>
                    </div>
                    <div className="system-type-badge ml-auto ">
                    <span className={`plan-badge ${system.plan}`}>
                      {system.plan === "solarOnly"
                        ? "☀️ Solar Only"
                        : system.plan === "windOnly"
                        ? "💨 Wind Only"
                        : "⚡ Mixed System"}
                    </span>
                  </div>
                  </div>
                </div>

                {/* Card Image Section */}
                {system.systemImage && (
                  <div className="card-image">
                    <img src={system.systemImage} alt="Circuit diagram" />
                  </div>
                )}

                {/* Card Content */}
                <div className="card-content flex justify-evenly">
                  

                  <div className="system-stats w-1/3 grid grid-cols-2">
                    <div className="stat-item">
                      <span className="stat-label">Monthly Usage</span>
                      <span className="stat-value">{system.monthlyUsage} kWh</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Reduction Goal</span>
                      <span className="stat-value">{system.desiredReduction}%</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Total Cost</span>
                      <span className="stat-value">${calculateTotalCost(system.costs)?.toLocaleString()}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Annual Savings</span>
                      <span className="stat-value savings">
                        ${calculateSavings(system.monthlyUsage, system.desiredReduction)}
                      </span>
                    </div>
                  </div>

                  {/* Equipment Details */}
                  <div className="equipment-section">
                    <h4>Equipment</h4>
                    <div className="equipment-grid">
                      {system.selectedSolar && (
                        <div className="equipment-item">
                          <span className="equipment-emoji">☀️</span>
                          <div>
                            <p className="equipment-name">Solar Panel</p>
                            <p className="equipment-detail">
                              {system.selectedSolar.brand} {system.selectedSolar.model}
                            </p>
                            <p className="equipment-detail">
                              {system.selectedSolar.watt}W • Qty: {system.counts?.solarCount}
                            </p>
                          </div>
                        </div>
                      )}
                      {system.selectedWind && (
                        <div className="equipment-item">
                          <span className="equipment-emoji">💨</span>
                          <div>
                            <p className="equipment-name">Wind Turbine</p>
                            <p className="equipment-detail">
                              {system.selectedWind.brand} {system.selectedWind.model}
                            </p>
                            <p className="equipment-detail">
                              {system.selectedWind.kw}kW • Qty: {system.counts?.windCount}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  {system.notes && (
                    <div className="notes-section">
                      <p className="notes-text">"{system.notes}"</p>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="card-footer">
                  <button
                    className="view-details-btn"
                    onClick={() => setSelectedSystem(system)}
                  >
                    View Details
                  </button>
                  <button
                    className="modify-btn"
                    onClick={() => handleNavigateToCustom(system)}
                  >
                    Modify & Save
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal for detailed view */}
        {selectedSystem && (
          <div className="modal-overlay " onClick={() => setSelectedSystem(null)}>
            <div className="modal-content w-7/10 mt-40 " onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={() => setSelectedSystem(null)}
              >
                ✕
              </button>

              <h2>{selectedSystem.username}'s System</h2>

              {selectedSystem.systemImage && (
                <img
                  src={selectedSystem.systemImage}
                  alt="Circuit diagram"
                  className="modal-image"
                />
              )}

              <div className="modal-details">
                <div className="detail-row">
                  <span className="label">Plan Type:</span>
                  <span className="value">{selectedSystem.plan}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Template:</span>
                  <span className="value">{selectedSystem.template}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Monthly Usage:</span>
                  <span className="value">{selectedSystem.monthlyUsage} kWh</span>
                </div>
                <div className="detail-row">
                  <span className="label">Desired Reduction:</span>
                  <span className="value">{selectedSystem.desiredReduction}%</span>
                </div>
                <div className="detail-row">
                  <span className="label">Avg Sun Hours:</span>
                  <span className="value">{selectedSystem.avgSunHours}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Wind Capacity Factor:</span>
                  <span className="value">{selectedSystem.windCapacityFactor}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Total Cost:</span>
                  <span className="value">
                    ${calculateTotalCost(selectedSystem.costs)?.toLocaleString()}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="label">Annual Savings:</span>
                  <span className="value">
                    ${calculateSavings(
                      selectedSystem.monthlyUsage,
                      selectedSystem.desiredReduction
                    )}
                  </span>
                </div>

                {selectedSystem.notes && (
                  <div className="detail-row full-width">
                    <span className="label">Notes:</span>
                    <p className="notes-value">{selectedSystem.notes}</p>
                  </div>
                )}
              </div>

              <button
                className="modal-action-btn"
                onClick={() => {
                  setSelectedSystem(null);
                  handleNavigateToCustom(selectedSystem);
                }}
              >
                Modify & Save This System
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
