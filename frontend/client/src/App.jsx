import './App.css'
import {
  FiGrid,
  FiMap,
  FiAlertTriangle,
  FiShield,
  FiFileText,
  FiBell,
  FiSettings,
  FiSearch,
  FiRefreshCw,
  FiUser,
  FiChevronRight,
  FiLogOut,
  FiThermometer,
  FiWind,
  FiDroplet,
  FiEye,
  FiTruck,
  FiUsers,
  FiCloudRain,
  FiArrowLeft,
  FiArrowRight,
} from 'react-icons/fi'

function App() {
  return (
    <div className="dashboard-app">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="logo-box">FF</div>
          <div>
            <h2>FireFusion</h2>
            <p>Emergency Operations</p>
          </div>
        </div>

        <div className="sidebar-group">
          <p className="group-label">MAIN MENU</p>

          <button className="nav-item active">
            <span className="nav-left">
              <FiGrid />
              Dashboard
            </span>
            <FiChevronRight />
          </button>

          <button className="nav-item">
            <span className="nav-left">
              <FiMap />
              Fire Map
            </span>
            <span className="nav-badge orange">7</span>
          </button>

          <button className="nav-item">
            <span className="nav-left">
              <FiAlertTriangle />
              Alerts
            </span>
            <span className="nav-badge red">31</span>
          </button>

          <button className="nav-item">
            <span className="nav-left">
              <FiShield />
              Misinformation Review
            </span>
            <span className="nav-badge purple">14</span>
          </button>

          <button className="nav-item">
            <span className="nav-left">
              <FiFileText />
              Reports
            </span>
          </button>
        </div>

        <div className="fire-ban-card">
          <div className="fire-ban-head">
            <span className="ban-dot"></span>
            <h4>Total Fire Ban</h4>
          </div>
          <p>No fires permitted</p>
          <span>Catastrophic conditions.</span>
        </div>

        <div className="weather-grid">
          <div className="weather-card">
            <div className="weather-title">
              <FiThermometer />
              Temperature
            </div>
            <h3>42°C</h3>
          </div>
          <div className="weather-card">
            <div className="weather-title">
              <FiWind />
              Wind Speed
            </div>
            <h3>45 km/h</h3>
          </div>
          <div className="weather-card">
            <div className="weather-title">
              <FiDroplet />
              Humidity
            </div>
            <h3>18%</h3>
          </div>
          <div className="weather-card">
            <div className="weather-title">
              <FiEye />
              Visibility
            </div>
            <h3>3 km</h3>
          </div>
        </div>

        <p className="last-updated">Last updated: 14:30</p>

        <div className="sidebar-group system-group">
          <p className="group-label">SYSTEM</p>

          <button className="nav-item">
            <span className="nav-left">
              <FiBell />
              Notifications
            </span>
            <span className="nav-badge blue">3</span>
          </button>

          <button className="nav-item">
            <span className="nav-left">
              <FiSettings />
              Settings
            </span>
          </button>
        </div>

        <div className="sidebar-footer">
          <div className="profile-box">
            <div className="profile-avatar">JD</div>
            <div>
              <h4>Gaveesha Nuwansara</h4>
              <p>Emergency Manager</p>
            </div>
          </div>

          <button className="signout-btn">
            <FiLogOut />
            Sign Out
          </button>

          <p className="version-text">Version 2.4.1</p>
          <p className="sync-text">Last sync: 2 min ago</p>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <h1>Dashboard</h1>
            <select>
              <option>Region: Australia</option>
            </select>
            <select>
              <option>Period: 18 Mar 2026, 14:00 - 20:00</option>
            </select>
          </div>

          <div className="topbar-right">
            <div className="search-box">
              <FiSearch />
              <input type="text" placeholder="Search locations, incidents, claims..." />
            </div>
            <div className="updated-wrap">
              <FiRefreshCw />
              <span>Updated 2 min ago</span>
            </div>
            <div className="user-icon">
              <FiUser />
            </div>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <p>OVERALL BUSHFIRE RISK</p>
            <h2 className="red-text">EXTREME</h2>
            <span>Critical conditions</span>
          </div>
          <div className="stat-card">
            <p>ACTIVE FIRE ZONES</p>
            <h2 className="orange-text">7</h2>
            <span>+2 since 12:00</span>
          </div>
          <div className="stat-card">
            <p>MISINFORMATION ALERTS</p>
            <h2 className="purple-text">14</h2>
            <span>8 pending review</span>
          </div>
          <div className="stat-card">
            <p>COMMUNITIES AT RISK</p>
            <h2 className="orange-text">23</h2>
            <span>Population: ~12,400</span>
          </div>
          <div className="stat-card">
            <p>OFFICIAL ALERTS ISSUED</p>
            <h2 className="blue-text">31</h2>
            <span>Last 6 hours</span>
          </div>
        </section>

        <section className="main-panels">
          <div className="panel updates-panel">
            <div className="panel-title-row">
              <h3>Latest Official Updates</h3>
            </div>

            <div className="update-card critical">
              <div className="update-top">
                <strong>CFA</strong>
                <span>8 min ago</span>
              </div>
              <h4>East Gippsland Fire Warning Upgraded</h4>
              <p>
                Emergency Warning issued for communities in East Gippsland. Leave immediately if safe to do so.
              </p>
              <label className="tag critical-tag">CRITICAL</label>
            </div>

            <div className="update-card warning">
              <div className="update-top">
                <strong>VicEmergency</strong>
                <span>25 min ago</span>
              </div>
              <h4>Total Fire Ban Declared</h4>
              <p>
                Total Fire Ban in effect for Central, North Central, and Mallee districts until 11:59 PM.
              </p>
              <label className="tag warning-tag">WARNING</label>
            </div>
          </div>

          <div className="panel incident-panel">
            <h3>Incident Overview</h3>
            <div className="risk-row">
              <span>Current Risk Level</span>
              <span className="extreme-pill">EXTREME</span>
            </div>

            <div className="risk-bar">
              <div className="risk-fill"></div>
            </div>

            <div className="incident-grid">
              <div className="incident-box">
                <strong>Wind Speed</strong>
                <span>45 km/h NW</span>
              </div>
              <div className="incident-box">
                <strong>Temperature</strong>
                <span>41°C</span>
              </div>
              <div className="incident-box">
                <strong>Humidity</strong>
                <span>12%</span>
              </div>
              <div className="incident-box">
                <strong>Evacuation Status</strong>
                <span>Active (7 zones)</span>
              </div>
            </div>

            <div className="hero-banner">
              <button className="hero-arrow">
                <FiArrowLeft />
              </button>
              <div className="hero-image">
                <div className="hero-overlay">Home fire prevention</div>
              </div>
              <button className="hero-arrow">
                <FiArrowRight />
              </button>
            </div>
          </div>

          <div className="panel resource-panel">
            <div className="panel-title-row">
              <h3>Resource Allocation</h3>
              <button className="manage-link">Manage</button>
            </div>

            <div className="resource-item">
              <div className="resource-head">
                <span><FiTruck /> Fire Trucks</span>
                <span>45 deployed / 23 available</span>
              </div>
              <div className="progress-bar"><div className="fill fill65"></div></div>
              <small>65% deployed</small>
            </div>

            <div className="resource-item">
              <div className="resource-head">
                <span><FiUsers /> Personnel</span>
                <span>312 deployed / 156 available</span>
              </div>
              <div className="progress-bar"><div className="fill fill67"></div></div>
              <small>67% deployed</small>
            </div>

            <div className="resource-item">
              <div className="resource-head">
                <span><FiCloudRain /> Water Bombers</span>
                <span>8 deployed / 3 available</span>
              </div>
              <div className="progress-bar"><div className="fill fill73"></div></div>
              <small>73% deployed</small>
            </div>

            <div className="resource-item">
              <div className="resource-head">
                <span><FiTruck /> Water Tankers</span>
                <span>28 deployed / 15 available</span>
              </div>
              <div className="progress-bar"><div className="fill fill65 green-fill"></div></div>
              <small>65% deployed</small>
            </div>

            <div className="legend-row">
              <span><i className="dot green"></i> Optimal</span>
              <span><i className="dot yellow"></i> Stretched</span>
              <span><i className="dot red"></i> Critical</span>
            </div>
          </div>
        </section>

        <div className="advice-title">Emergency Advice</div>

        <section className="advice-grid">
          <div className="advice-card img1">
            <div className="advice-content">
              <h4>ABC Radio Internet & Guide</h4>
              <p>Stay informed with official emergency broadcasts from ABC Radio.</p>
            </div>
          </div>

          <div className="advice-card img2">
            <div className="advice-content">
              <h4>Find emergency services near you</h4>
              <p>Locate nearby stations, hospitals, and evacuation services.</p>
            </div>
          </div>

          <div className="advice-card img3">
            <div className="advice-content">
              <h4>Your mobile phone could help save your life</h4>
              <p>Enable emergency alerts and location services for critical warnings.</p>
            </div>
          </div>

          <div className="advice-card img4">
            <div className="advice-content">
              <h4>Helping you recover after an emergency</h4>
              <p>Access support resources, financial help, and community services.</p>
            </div>
          </div>
        </section>

        <footer className="footer-section">
          <div>
            <h4>About FireFusion</h4>
            <p>AI-driven bushfire forecasting and misinformation monitoring for safer, faster emergency decision-making in Victoria.</p>
            <ul>
              <li>Project Overview</li>
              <li>Mission & Vision</li>
              <li>Integrated Dashboard</li>
              <li>Research Direction</li>
            </ul>
          </div>

          <div>
            <h4>Core Features</h4>
            <ul>
              <li>Bushfire Forecasting</li>
              <li>Misinformation Detection</li>
              <li>Human Review Workflow</li>
              <li>Risk Visualisation</li>
            </ul>
          </div>

          <div>
            <h4>Data & Resources</h4>
            <ul>
              <li>Weather & Fire Data</li>
              <li>Historical Fire Cases</li>
              <li>Social Media Analysis</li>
              <li>Documentation</li>
            </ul>
          </div>

          <div>
            <h4>Connect With Us</h4>
            <ul>
              <li>Email</li>
              <li>LinkedIn</li>
              <li>Teams / Project Updates</li>
            </ul>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App