import React, { useState, useEffect } from 'react';
import '../styles/SubmitPage.css';
import axios from 'axios'
import 'flatpickr/dist/flatpickr.min.css';

const SubmitPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    branch: '',
    year: '',
    dateReceived: '',
    platform: '',
    sender: '',
    contact: '',
    category: '',
    flags: [],
    responded: '',
    personalDetails: '',
    genuineRating: '',
    message: ''
  });
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      // Handle checkbox (multi-select)
      if (checked) {
        setFormData({
          ...formData,
          flags: [...formData.flags, value]
        });
      } else {
        setFormData({
          ...formData,
          flags: formData.flags.filter(flag => flag !== value)
        });
      }
    } else {
      // Handle other inputs
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Here you would typically send the data to your backend
    //on submit u have to send to request to Backend using api
    // using axios or fetch // best way using axios 
     let res = await axios.post('http://localhost:3001/api/user-check-data',formData)
     if(res.data.success===true){
      alert("Data is saved successfully")
     }
  };

  // Initialize flatpickr for date input
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('flatpickr').then(({ default: flatpickr }) => {
        flatpickr("#dateReceived", {
          dateFormat: "d-m-Y",
          maxDate: "today",
          altInput: true,
          altFormat: "d-m-Y",
          allowInput: true,
          disableMobile: true,
          onChange: (selectedDates, dateStr) => {
            setFormData({
              ...formData,
              dateReceived: dateStr
            });
          }
        });
      });
    }
  }, []);



  return (
    <main className="form-container">
      <h2>Submit Info for Verification</h2>
      <form id="infoForm" onSubmit={handleSubmit}>
        {/* Student Details */}
        <label htmlFor="name">Student Name:</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={formData.name}
          onChange={handleChange}
          required 
        />
    
        <label htmlFor="roll">Roll Number:</label>
        <input 
          type="text" 
          id="roll" 
          name="roll" 
          value={formData.roll}
          onChange={handleChange}
          required 
        />
    
        <label htmlFor="branch">Branch:</label>
        <select 
          id="branch" 
          name="branch" 
          value={formData.branch}
          onChange={handleChange}
          required
        >
          <option value="">Select your branch</option>
          <option>CSE</option>
          <option>CS - AIML</option>
          <option>CS - DS</option>
          <option>CS - IOT</option>
          <option>CS - CYS</option>
          <option>AI & DS</option>
          <option>CSBS</option>
          <option>IT</option>
          <option>ECE</option>
          <option>EEE</option>
          <option>EIE</option>
          <option>CE</option>
          <option>ME</option>
          <option>AE</option>
        </select>
    
        <label>Year of Study:</label>
        <div className="radio-group">
          {['1st Year', '2nd Year', '3rd Year', '4th Year'].map(year => (
            <label key={year}>
              <input 
                type="radio" 
                name="year" 
                value={year} 
                checked={formData.year === year}
                onChange={handleChange}
                required={year === '1st Year'} 
              /> {year}
            </label>
          ))}
        </div>
    
        {/* Message Details */}
        <label htmlFor="dateReceived">When was the message received?</label>
        <input
          type="text"
          id="dateReceived"
          name="dateReceived"
          placeholder="dd-mm-yyyy"
          maxLength="10"
          required
        />
        <small id="dateError" style={{ color: 'red', display: 'none' }}>
          Please enter a valid date.
        </small>
    
        <label>Where was the message?</label>
        <div className="radio-group">
          {[
            'Class Unofficial Group', 
            'Class Official Group', 
            'College Mail', 
            'Personal Mail', 
            'LinkedIn', 
            'WhatsApp Message', 
            'Call', 
            'Other'
          ].map(platform => (
            <label key={platform}>
              <input 
                type="radio" 
                name="platform" 
                value={platform} 
                checked={formData.platform === platform}
                onChange={handleChange}
                required={platform === 'Class Unofficial Group'} 
              /> {platform}
              {platform === 'Other' && (
                <input 
                  type="text" 
                  name="platform" 
                  value={formData.platform}
                  onChange={handleChange}
                />
              )}
            </label>
          ))}
        </div>
    
        <label htmlFor="sender">Who sent you this message (Company/Individual):</label>
        <input 
          type="text" 
          id="sender" 
          name="sender" 
          placeholder="Enter name" 
          value={formData.sender}
          onChange={handleChange}
          required 
        />
    
        <label htmlFor="contact">Contact information of sender (Phone/Mail/LinkedIn):</label>
        <input 
          type="text" 
          id="contact" 
          name="contact" 
          placeholder="Enter contact info" 
          value={formData.contact}
          onChange={handleChange}
          required 
        />
    
        <label>What is the category of message?</label>
        <div className="radio-group">
          {[
            'Internship', 
            'Placement', 
            'Training', 
            'Training and Internship', 
            'Certificate Course', 
            'Exam Drive', 
            'Scholarship', 
            'Other'
          ].map(category => (
            <label key={category}>
              <input 
                type="radio" 
                name="category"
                value={category} 
                checked={formData.category === category}
                onChange={handleChange}
                required={category === 'Internship'} 
              /> {category}
              {category === 'Other' && (
                <input 
                  type="text" 
                  name="category" 
                  value={formData.category}
                  onChange={handleChange}
                />
              )}
            </label>
          ))}
        </div>
    
        <label>Did the message have any of the following elements?</label>
        <div className="checkbox-group">
          {[
            'Asking for payment/fee',
            'Requesting banking details or Aadhar/PAN',
            'Unreasonable deadlines',
            'Urgent response needed',
            'Poor grammar/spelling',
            'Unknown or verified sender',
            'Refused to give further info',
            'Fake LinkedIn or website',
            'Unofficial company information',
            'Other'
          ].map(flag => (
            <label key={flag}>
              <input 
                type="checkbox" 
                name="flags" 
                value={flag} 
                checked={formData.flags.includes(flag)}
                onChange={handleChange}
              /> {flag}
              {flag === 'Other' && (
                <input 
                  type="text" 
                  name="flagOther" 
                  value={formData.flagOther}
                  onChange={handleChange}
                />
              )}
            </label>
          ))}
        </div>
    
        <label>Have you responded to the opportunity?</label>
        <div className="radio-group">
          {['Yes', 'No', 'Considering'].map(responded => (
            <label key={responded}>
              <input 
                type="radio" 
                name="responded" 
                value={responded} 
                checked={formData.responded === responded}
                onChange={handleChange}
                required={responded === 'Yes'} 
              /> {responded}
            </label>
          ))}
        </div>
    
        <label>Did they take any personal details?</label>
        <div className="radio-group">
          {['Yes', 'No', 'Only name and phone', 'Other'].map(detail => (
            <label key={detail}>
              <input 
                type="radio" 
                name="personalDetails" 
                value={detail} 
                checked={formData.personalDetails === detail}
                onChange={handleChange}
                required={detail === 'Yes'} 
              /> {detail}
              {detail === 'Other' && (
                <input 
                  type="text" 
                  name="personalDetails" 
                  value={formData.personalDetails}
                  onChange={handleChange}
                />
              )}
            </label>
          ))}
        </div>
    
        <label>How genuine do you think the message is?</label>
        <div className="rating-group">
          {[1, 2, 3, 4, 5].map(rating => (
            <label key={rating}>
              <input 
                type="radio" 
                name="genuineRating" 
                value={rating.toString()} 
                checked={formData.genuineRating === rating.toString()}
                onChange={handleChange}
                required={rating === 1} 
              /> {rating}
            </label>
          ))}
        </div>
    
        <label htmlFor="message">Message in Circulation (Paste it as-is):</label>
        <textarea 
          id="message" 
          name="message" 
          rows="6" 
          placeholder="Paste the full message here..." 
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
    
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default SubmitPage;