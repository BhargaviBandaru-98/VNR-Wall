import React, { useEffect, useState } from "react";
import "../styles/ViewResponsesPage.css";
import axios from "axios";

const ViewResponsesPage = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const userString = localStorage.getItem('user');
  let email = "";

  // Search and filter states
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState(['All']);

  if (userString !== null) {
    const user = JSON.parse(userString); // Convert string to object
    email = user.email;
  }

  console.log("this is mail", email);

  useEffect(() => {
    async function getResponses() {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3001/api/datas");
        // console.log(res.data);
        setResponses(res.data);
        
        // Extract unique categories for the filter dropdown
        const uniqueCategories = ['All'];
        res.data.forEach(response => {
          if (response.category && !uniqueCategories.includes(response.category)) {
            uniqueCategories.push(response.category);
          }
        });
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching responses:", error);
        setLoading(false);
      }
    }
    getResponses();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return dateString;
  };

  const getRatingColor = (rating) => {
    if (!rating) return "gray";
    const numRating = parseInt(rating);
    if (numRating <= 2) return "#e53e3e"; // Red for low ratings
    if (numRating === 3) return "#dd6b20"; // Orange for medium ratings
    return "#38a169"; // Green for high ratings
  };

  // Get the status display for a response
  const getStatusDisplay = (response) => {
    if (response.status === "null") return "In Review";
    return response.status ? "Fake" : "Genuine";
  };

  // Function to get icon color based on status
  const getStatusIconColor = (status) => {
    switch(status) {
      case 'All': return '#9ca3af';
      case 'In Review': return '#facc15';
      case 'Genuine': return '#22c55e';
      case 'Fake': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  // Filter the responses based on all filters
  const filteredResponses = responses.filter(response => {
    // Category filter
    const categoryMatch = categoryFilter === 'All' || response.category === categoryFilter;
    
    // Status filter - match based on the status display that appears on cards
    let statusMatch = false;
    if (statusFilter === 'All') {
      statusMatch = true;
    } else {
      // Match based on the status that's shown on the card
      statusMatch = getStatusDisplay(response) === statusFilter;
    }
    
    // Search query filter - search in multiple fields
    const query = searchQuery.toLowerCase();
    const searchMatch = query === '' || 
      (response.name && response.name.toLowerCase().includes(query)) ||
      (response.category && response.category.toLowerCase().includes(query)) ||
      (response.platform && response.platform.toLowerCase().includes(query)) ||
      (response.branch && response.branch.toLowerCase().includes(query)) ||
      (response.message && response.message.toLowerCase().includes(query)) ||
      (response.contact && response.contact.toLowerCase().includes(query));
    
    return categoryMatch && statusMatch && searchMatch;
  });

  return (
    <div className="responses-container">
      <h2>Verified Responses</h2>

      {/* Filters Section */}
      <div className="filters-container">
        {/* Category Filter */}
        <div className="filter-group">
          <label htmlFor="category-filter">Category:</label>
          <select 
            id="category-filter" 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Status Filter - Enhanced Version */}
        <div className="filter-group">
          <label htmlFor="status-filter">Status:</label>
          <div className="status-filter-container">
            <div 
              className="status-icon" 
              style={{ backgroundColor: getStatusIconColor(statusFilter) }}
            ></div>
            <select 
              id="status-filter" 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`status-filter-select ${statusFilter.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <option value="All">All</option>
              <option value="In Review">In Review</option>
              <option value="Genuine">Genuine</option>
              <option value="Fake">Fake</option>
            </select>
            <div className="status-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Search Filter */}
        <div className="filter-group search-group">
          <input
            type="text"
            placeholder="Search in cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button 
              className="clear-search" 
              onClick={() => setSearchQuery('')}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : responses && responses.length > 0 ? (
        <>
          <div className="results-info">
            Showing {filteredResponses.length} of {responses.length} responses
          </div>
          
          <div className="response-cards">
            {filteredResponses.map((response) => (
              <div key={response.id} className="response-card">
                <div className="card-header">
                  <h3>{response.name || "Unknown Sender"}</h3>
                  <div
                    className="genuine-rating"
                    style={{
                      backgroundColor:
                        response.status === "null"
                          ? "#facc15" // Yellow for "In Review"
                          : response.status
                          ? "#ef4444" // Red for Fake
                          : "#22c55e", // Green for Genuine
                    }}
                  >
                    {response.status === "null"
                      ? "In Review"
                      : response.status
                      ? "Fake"
                      : "Genuine"}
                  </div>
                </div>

                <div className="card-content">
                  <div className="card-section">
                    <p>
                      <strong>Category:</strong>{" "}
                      {response.category || "Not specified"}
                    </p>
                    <p>
                      <strong>Platform:</strong>{" "}
                      {response.platform || "Not specified"}
                    </p>
                    <p>
                      <strong>Date Received:</strong>{" "}
                      {formatDate(response.dateReceived)}
                    </p>
                    <p>
                      <strong>Reported by:</strong> {response.name}
                    </p>
                    <p>
                      <strong>Branch:</strong> {response.branch},{" "}
                      <strong>Year:</strong> {response.year}
                    </p>
                    <p>
                      <strong>Contact:</strong>{" "}
                      {response.contact || "No contact provided"}
                    </p>
                  </div>

                  {response.flags && (
                    <div className="card-section">
                      <p>
                        <strong>Flags:</strong>
                      </p>
                      <div className="flags-container">
                        {JSON.parse(response.flags).map((flag, index) => (
                          <span key={index} className="flag-item">
                            {flag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {response.message && (
                    <div className="card-section message-section">
                      <p>
                        <strong>Message:</strong>
                      </p>
                      <div className="message-content">{response.message}</div>
                    </div>
                  )}
                </div>

                <div className="card-footer">
                  <p>
                    <strong>Status:</strong> {response.responded || "No response"}
                  </p>
                </div>
                <div
                  className="genuine-rating"
                  style={{
                    backgroundColor: getRatingColor(response.genuineRating),
                  }}
                >
                  {response.genuineRating
                    ? `Rating: ${response.genuineRating}/5`
                    : "No Rating"}
                </div>
                {
                  (email==="24071a12d4@vnrvjiet.in" || email==="23071a1202@vnrvjiet.in" || email==="23071a1208@vnrvjiet.in" || email==="23071a04k4@vnrvjiet.in") 
                  && <div className="verify-buttons">
                  <button
                    className="verify-fake" 
                    onClick={async () => {
                      try {
                        await axios.put(
                          `http://localhost:3001/api/update-status/${response.id}`,
                          { status: true }
                        );
                        setResponses((prev) =>
                        
                          prev.map((res) =>
                            res.id === response.id
                              ? { ...res, status: true }
                              : res
                          )
                        );
                      } catch (err) {
                        console.error("Error updating status to fake:", err);
                      }
                    }}
                  >
                    Mark as Fake
                  </button>

                  <button
                    className="verify-genuine"
                    onClick={async () => {
                      try {
                        await axios.put(
                          `http://localhost:3001/api/update-status/${response.id}`,
                          { status: false }
                        );
                        setResponses((prev) =>
                          prev.map((res) =>
                            res.id === response.id
                              ? { ...res, status: false }
                              : res
                          )
                        );
                      } catch (err) {
                        console.error("Error updating status to genuine:", err);
                      }
                    }}
                  >
                    Mark as Genuine
                  </button>
                </div>
                }
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="placeholder-message">
          <p>No responses available yet. Check back later!</p>
        </div>
      )}
    </div>
  );
};

export default ViewResponsesPage;
// Status Filter Component
const StatusFilter = ({ statusFilter, setStatusFilter }) => {
  // Function to get icon color based on status
  const getStatusIconColor = (status) => {
    switch(status) {
      case 'All': return '#9ca3af';
      case 'In Review': return '#facc15';
      case 'Genuine': return '#22c55e';
      case 'Fake': return '#ef4444';
      default: return '#9ca3af';
    }
  };

  return (
    <div className="filter-group">
      <label htmlFor="status-filter">Status:</label>
      <div className="status-filter-container">
        <div 
          className="status-icon" 
          style={{ backgroundColor: getStatusIconColor(statusFilter) }}
        ></div>
        <select 
          id="status-filter" 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`status-filter-select ${statusFilter.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <option value="All">All</option>
          <option value="In Review">In Review</option>
          <option value="Genuine">Genuine</option>
          <option value="Fake">Fake</option>
        </select>
        <div className="status-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Usage inside ViewResponsesPage component
// Replace the existing status filter with this component:
/*
<StatusFilter 
  statusFilter={statusFilter}
  setStatusFilter={setStatusFilter}
/>
*/