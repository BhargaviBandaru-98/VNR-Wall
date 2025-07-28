import React, { useState, useEffect } from 'react';
import { Search, Shield, CheckCircle, Clock, User, Eye, Inbox } from 'lucide-react';
import axios from 'axios';
import '../styles/ViewResponsesPage.css';
import StudentMessageCard from '../components/StudentMessageCards';

const ViewResponses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch messages from server
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:3001/api/datas');
        const serverMessages = res.data.map((item, index) => ({
          id: item.id || index + 1,
          category: item.category || 'Not specified',
          receivedDate: item.dateReceived || 'N/A',
          status: item.status === 'null' ? 'inreview' : item.status ? 'fake' : 'genuine',
          branch: item.branch || 'N/A',
          year: item.year || 'N/A',
          platform: item.platform || 'Unknown',
          sender: item.name || 'Anonymous',
          contact: item.contact || 'No Contact',
          responseStatus: item.responded || 'No',
          detailsShared: item.detailsShared || 'N/A',
          credibilityRating: parseInt(item.genuineRating) || 0,
          messageContent: item.message || '',
          tags: item.flags ? JSON.parse(item.flags) : [],
          submittedByUser: false
        }));
        setMessages(serverMessages);
        setFilteredMessages(serverMessages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  // Update message status
  const updateMessageStatus = async (messageId, newStatus) => {
    try {
      await axios.put(`http://localhost:3001/api/update-status/${messageId}`, {
        status: newStatus.toLowerCase() === 'fake'
      });
      const updatedMessages = messages.map(msg =>
        msg.id === messageId ? { ...msg, status: newStatus.toLowerCase() } : msg
      );
      setMessages(updatedMessages);
      applyFilters(updatedMessages, searchTerm, activeCategory);
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  // Apply search and category filters
  const applyFilters = (messageList, search, category) => {
    let filtered = messageList;
    const searchLower = search.trim().toLowerCase();

    if (searchLower) {
      filtered = filtered.filter(msg =>
        msg.messageContent.toLowerCase().includes(searchLower) ||
        msg.sender.toLowerCase().includes(searchLower) ||
        msg.platform.toLowerCase().includes(searchLower) ||
        msg.branch.toLowerCase().includes(searchLower) ||
        (msg.tags && msg.tags.some(tag => tag.toLowerCase().includes(searchLower)))
      );
    }

    if (category !== 'all') {
      filtered =
        category === 'submitted'
          ? filtered.filter(msg => msg.submittedByUser)
          : filtered.filter(msg => msg.status.toLowerCase() === category.toLowerCase());
    }

    setFilteredMessages(filtered);
  };

  useEffect(() => {
    applyFilters(messages, searchTerm, activeCategory);
  }, [searchTerm, activeCategory, messages]);

  // Optimized getCounts (single loop)
  const getCounts = () => {
    const counts = { all: messages.length, fake: 0, genuine: 0, inReview: 0, submitted: 0 };
    messages.forEach(msg => {
      if (msg.submittedByUser) counts.submitted++;
      switch (msg.status.toLowerCase()) {
        case 'fake':
          counts.fake++;
          break;
        case 'genuine':
          counts.genuine++;
          break;
        case 'inreview':
          counts.inReview++;
          break;
        default:
          break;
      }
    });
    return counts;
  };

  const counts = getCounts();

  const categories = [
    {
      id: 'all',
      title: 'All Messages',
      count: counts.all,
      icon: <Inbox className="category-icon" />,
      color: 'orange',
      description: 'All message types'
    },
    {
      id: 'fake',
      title: 'Fake Messages',
      count: counts.fake,
      icon: <Shield className="category-icon" />,
      color: 'red',
      description: 'Messages marked as fake or suspicious'
    },
    {
      id: 'genuine',
      title: 'Genuine Messages',
      count: counts.genuine,
      icon: <CheckCircle className="category-icon" />,
      color: 'green',
      description: 'Verified genuine messages'
    },
    {
      id: 'inreview',
      title: 'In Review Messages',
      count: counts.inReview,
      icon: <Clock className="category-icon" />,
      color: 'blue',
      description: 'Messages pending review'
    },
    {
      id: 'submitted',
      title: 'Messages Submitted by You',
      count: counts.submitted,
      icon: <User className="category-icon" />,
      color: 'purple',
      description: 'Messages you have submitted'
    }
  ];

  return (
    <div className="view-responses-container">
      <div className="page-header">
        <h1 className="page-title">View Responses</h1>
        <p className="page-subtitle">Monitor and manage all message submissions</p>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <div className="search-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search messages, senders, platforms, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="clear-search">
              ×
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="filter-tabs">
        {categories.map(category => (
          <button
            key={category.id}
            className={`filter-tab ${activeCategory === category.id ? 'active' : ''} ${category.color}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.icon}
            {category.title}
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      {/* Categories Grid */}
<div className="container">
  <div className="row d-flex justify-content-center">
    {categories.map(category => (
      <div className="col-md-4 col-sm-6 mb-md-4 mb-sm-2" key={category.id}>
        <div
          className={`category-card ${category.color} ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => setActiveCategory(category.id)}
        >
          <div className="category-header">
            <div className="category-icon-wrapper">{category.icon}</div>
            <div className="category-info">
              <h3 className="category-title">{category.title}</h3>
              <p className="category-description">{category.description}</p>
            </div>
          </div>
          <div className="category-count">
            <span className="count-number">{category.count}</span>
            <span className="count-label">Messages</span>
          </div>
          <div className="category-action">
            <Eye className="view-icon" />
            <span>View All</span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


      {/* Results Section */}
      <div className="results-section">
        <div className="results-header">
          <h2 className="results-title">
            {activeCategory === 'all'
              ? `All Messages (${filteredMessages.length})`
              : `${categories.find(c => c.id === activeCategory)?.title} (${filteredMessages.length})`}
          </h2>
          {searchTerm && (
            <p className="search-results-info">
              Showing results for "<strong>{searchTerm}</strong>"
            </p>
          )}
        </div>

        {loading ? (
          <p>Loading messages...</p>
        ) : filteredMessages.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">📭</div>
            <h3>No messages found</h3>
            <p>
              {searchTerm
                ? `No messages match your search "${searchTerm}"`
                : `No messages in this category yet`}
            </p>
          </div>
        ) : (
          <div className="messages-grid row d-flex justify-content-center">
            {filteredMessages.map(message => (
              <div key={message.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="message-card-wrapper">
                  <StudentMessageCard data={message} onStatusUpdate={updateMessageStatus} />
                      {message.submittedByUser && (
                      <div className="submitted-badge">
                          <User size={12} />
                         <span>Your Submission</span>
                      </div>
                     )}
                </div>
              </div>
             ))}
          </div>

        )}
      </div>
    </div>
  );
};

export default ViewResponses;
