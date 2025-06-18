import React, { useState, useEffect } from 'react';
import './contact.css';

// Simple client-side input sanitization function
const sanitizeInput = (input) => {
  // Remove HTML tags and dangerous characters
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[&<>"'`=/]/g, (match) => ({
      '&': '&',
      '<': '<',
      '>': '>',
      '"': '"',
      "'": '',
      '`': '`',
      '=': '=',
      '/': '/',
    }[match] || match))
    .trim(); // Remove leading/trailing whitespace
};

const Contact = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent rapid submissions (client-side rate limiting, 5-second cooldown)
    const currentTime = Date.now();
    if (currentTime - lastSubmitTime < 5000) {
      setError('Please wait 5 seconds before submitting again.');
      return;
    }

    // Sanitize and validate inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedMessage = sanitizeInput(message);

    // Input validation
    if (sanitizedName.length < 2 || sanitizedName.length > 50) {
      setError('Name must be between 2 and 50 characters.');
      return;
    }
    if (sanitizedMessage.length < 10 || sanitizedMessage.length > 500) {
      setError('Message must be between 10 and 500 characters.');
      return;
    }
    if (!/^[a-zA-Zа-яА-Я0-9\s.,!?]*$/.test(sanitizedName)) {
      setError('Name contains invalid characters.');
      return;
    }
    if (!/^[a-zA-Zа-яА-Я0-9\s.,!?]*$/.test(sanitizedMessage)) {
      setError('Message contains invalid characters.');
      return;
    }

    setIsLoading(true);
    setIsSuccess(false);
    setError('');

    // Note: Hardcoding the bot token is insecure. Move to backend in production.
    const botToken = '7725993572:AAFTX4Yuev3-VFxFA5ST6UISm2dm58N7iT0';
    const chatId = '857574078';
    const text = `Новое сообщение от ${sanitizedName}:\n${sanitizedMessage}`;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text }),
        }
      );

      const data = await response.json();
      if (data.ok) {
        setIsLoading(false);
        setIsSuccess(true);
        setName('');
        setMessage('');
        setLastSubmitTime(currentTime);
      } else {
        setIsLoading(false);
        setError('Error: ' + sanitizeInput(data.description));
      }
    } catch (error) {
      setIsLoading(false);
      setError('Error: ' + sanitizeInput(error.message));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <div className="ios-wrapper">
      <div className="ios-card">
        <h2 className="ios-title">Contact with me!</h2>
        <form onSubmit={handleSubmit}>
          <div className="ios-form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={50}
              disabled={isLoading}
              placeholder="Enter your name"
            />
          </div>
          <div className="ios-form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              maxLength={500}
              disabled={isLoading}
              placeholder="Enter your message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="ios-button"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
        <div className="ios-status">
          {isSuccess && <p className="ios-success">Successfully sent</p>}
          {error && <p className="ios-error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Contact;