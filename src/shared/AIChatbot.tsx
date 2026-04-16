import { useState } from 'react';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I am your GrowSphere AI Advisor. How can I help you manage your portfolio today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    
    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: "That's a great question! For a balanced approach, considering your risk score, index funds or low-risk SIPs are usually a good start. Want me to open the SIP Planner for you?" 
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
          color: 'white',
          border: 'none',
          boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          zIndex: 999,
          transition: 'transform 0.2s',
          transform: isOpen ? 'scale(0.9)' : 'scale(1)'
        }}
      >
        {isOpen ? '✕' : '✨'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '24px',
          width: '350px',
          height: '450px',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          borderRadius: '20px',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.2)',
          zIndex: 998,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 0.3s ease-out'
        }}>
          <style>
            {`
              @keyframes slideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}
          </style>

          {/* Header */}
          <div style={{
            padding: '16px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
            borderBottom: '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '1.5rem' }}>🤖</span>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text)' }}>GrowSphere AI</h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#10b981' }}>● Online</p>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                padding: '10px 14px',
                borderRadius: '16px',
                background: msg.role === 'user' 
                  ? 'linear-gradient(135deg, var(--accent), var(--accent2))' 
                  : 'rgba(255, 255, 255, 0.05)',
                color: msg.role === 'user' ? '#fff' : 'var(--text)',
                border: msg.role === 'user' ? 'none' : '1px solid var(--glass-border)',
                borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
                fontSize: '0.9rem',
                lineHeight: '1.4'
              }}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={{
            padding: '16px',
            borderTop: '1px solid var(--glass-border)',
            display: 'flex',
            gap: '8px'
          }}>
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything..." 
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '24px',
                border: '1px solid var(--glass-border)',
                background: 'rgba(0, 0, 0, 0.2)',
                color: 'var(--text)',
                outline: 'none'
              }}
            />
            <button type="submit" style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: 'none',
              background: 'var(--accent)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}
