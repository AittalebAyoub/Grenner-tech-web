import React, { useState, useEffect, useRef, useMemo } from 'react';
import '../styles/Chat.css'; 

// URLs de l'API
const API_BASE_URL = 'http://127.0.0.1:8000/ask/';
const API_AUDIO_URL = 'http://127.0.0.1:8000/generate_audio/';

const Icons = {
  Sparkles: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"/>
    </svg>
  ),
  Send: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
    </svg>
  ),
  Mic: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
    </svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  ),
  Chat: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  User: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="8" r="4"/>
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
    </svg>
  )
};

// Génération d'ID de session
const generateSessionId = () => Math.floor(Math.random() * 100000) + Date.now();

const Chat = () => {
  const sessionId = useMemo(() => generateSessionId(), []);
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playingMessageId, setPlayingMessageId] = useState(null);
  const chatBodyRef = useRef(null);

  // Suggestions initiales
  const initialSuggestions = [
    "Quels sont vos services ?",
    "Comment puis-je vous contacter ?",
    "Qui sont vos partenaires ?"
  ];

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (text = inputText.trim()) => {
    if (!text || isLoading) return;

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setPlayingMessageId(null);
      setCurrentAudio(null);
    }

    const userMessage = {
      id: messages.length + 1,
      text: text,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      sender: "self",
      status: "sent"
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    const formData = new FormData();
    formData.append('query', text);

    try {
      const response = await fetch(API_BASE_URL + sessionId, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

      const data = await response.json();
      
      if (data.status === 'success' && data.response_data?.reponse) {
        const botMessageId = messages.length + 2;
        const botResponse = {
          id: botMessageId,
          text: data.response_data.reponse,
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          sender: "other",
          status: "read",
          audioData: { base64: null, mimeType: null },
          audioLoading: false,
          suggestedTags: data.response_data.suggested_tags || []
        };
        
        setMessages(prev => [...prev, botResponse]);
        generateAudioForMessage(botMessageId, data.response_data.reponse);
      }
    } catch (error) {
      console.error("Erreur API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAudioForMessage = async (messageId, fullText) => {
    try {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, audioLoading: true } : msg
        )
      );

      const response = await fetch(API_AUDIO_URL + sessionId, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_text: fullText }),
      });

      if (!response.ok) throw new Error(`Erreur audio: ${response.status}`);

      const audioData = await response.json();
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { 
                ...msg, 
                audioData: {
                  base64: audioData.audio_base64,
                  mimeType: audioData.audio_mime_type
                },
                audioLoading: false
              }
            : msg
        )
      );
    } catch (error) {
      console.error("Erreur génération audio:", error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, audioLoading: false, audioError: true } : msg
        )
      );
    }
  };

  const handlePlayAudio = (base64String, mimeType, messageId) => {
    if (currentAudio && playingMessageId === messageId) {
      if (!currentAudio.paused) {
        currentAudio.pause();
        setPlayingMessageId(null);
      } else {
        currentAudio.play().catch(console.error);
        setPlayingMessageId(messageId);
      }
      return;
    }

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setPlayingMessageId(null);
    }

    try {
      const audioSrc = `data:${mimeType};base64,${base64String}`;
      const newAudio = new Audio(audioSrc);

      newAudio.onended = () => {
        setPlayingMessageId(null);
        setCurrentAudio(null);
      };
      
      newAudio.onerror = (e) => {
        console.error("Erreur Audio:", e);
        setPlayingMessageId(null);
        setCurrentAudio(null);
      };

      newAudio.play().catch(console.error);
      setCurrentAudio(newAudio);
      setPlayingMessageId(messageId);
    } catch (e) {
      console.error("Erreur création audio:", e);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (isLoading) return;
    setInputText(suggestion);
    setTimeout(() => handleSendMessage(suggestion), 100);
  };

  return (
    <div style={styles.container}>
      {/* Bouton flottant */}
      <button 
        style={{...styles.floatingBtn, ...(isOpen && styles.floatingBtnOpen)}}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <Icons.Close /> : <Icons.Chat />}
      </button>

      {/* Fenêtre de chat */}
      {isOpen && (
        <div style={styles.chatWindow}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerContent}>
              <div style={styles.headerIcon}>
                <img src="/icons/grennertech-logo.svg" alt="Logo" style={styles.headerIconImg} />
              </div>
              <div>
                <div style={styles.headerTitle}>GrennerChat</div>
                <div style={styles.headerSubtitle}>Agent IA • En ligne</div>
              </div>
            </div>
          </div>

          {/* Corps du chat */}
          <div style={styles.chatBody} ref={chatBodyRef}>
            {messages.length === 0 ? (
              // État vide - Écran d'accueil
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>
                  <img src="/icons/grennertech-logo.svg" alt="Logo" style={styles.headerIconImg} />
                </div>
                <h2 style={styles.emptyTitle}>Posez-moi vos questions</h2>
                <p style={styles.emptySubtitle}>
                  Je suis là pour vous aider avec vos projets et répondre à vos questions
                </p>
              </div>
            ) : (
              // Messages
              messages.map((msg) => (
                <div key={msg.id}>
                  <div style={{
                    ...styles.messageRow,
                    ...(msg.sender === 'self' ? styles.messageRowSelf : styles.messageRowOther)
                  }}>
                    {msg.sender === 'other' && (
                      <div style={styles.avatar}>
                        <img src="/icons/bot-avatar.svg" alt="Bot" style={styles.avatarImg} />
                      </div>
                    )}
                    
                    <div style={{
                      ...styles.messageBubble,
                      ...(msg.sender === 'self' ? styles.messageBubbleSelf : styles.messageBubbleOther)
                    }}>
                      <p style={styles.messageText}>{msg.text}</p>
                      <div style={styles.messageInfo}>
                        <span style={styles.messageTime}>{msg.time}</span>
                        {msg.sender === 'other' && msg.audioData?.base64 && (
                          <button 
                            style={styles.audioBtn}
                            onClick={() => handlePlayAudio(msg.audioData.base64, msg.audioData.mimeType, msg.id)}
                          >
                            <img 
                              src={playingMessageId === msg.id && currentAudio && !currentAudio.paused 
                                ? "/icons/audio-pause.svg" 
                                : "/icons/audio-play.svg"
                              } 
                              alt="Audio" 
                              style={styles.audioIcon}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {msg.sender === 'self' && (
                      <div style={{...styles.avatar, ...styles.avatarUser}}>
                        <Icons.User />
                      </div>
                    )}
                  </div>

                  {msg.sender === 'other' && msg.suggestedTags?.length > 0 && (
                    <div style={styles.tagsContainer}>
                      {msg.suggestedTags.map((tag, idx) => (
                        <button 
                          key={idx}
                          style={styles.suggestionCard}
                          onClick={() => handleSuggestionClick(tag)}
                          disabled={isLoading}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}

            {isLoading && (
              <div style={styles.messageRow}>
                <div style={styles.avatar}>
                  <img src="/icons/bot-avatar.svg" alt="Bot" style={styles.avatarImg} />
                </div>
                <div style={{...styles.messageBubble, ...styles.messageBubbleOther}}>
                  <div style={styles.typingIndicator}>
                    <span style={styles.typingDot}></span>
                    <span style={{...styles.typingDot, animationDelay: '0.2s'}}></span>
                    <span style={{...styles.typingDot, animationDelay: '0.4s'}}></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions en bas (quand vide) */}
          {messages.length === 0 && (
            <div style={styles.suggestionsBottom}>
              <div style={styles.suggestionsLabel}>Suggestions pour commencer</div>
              <div style={styles.suggestionCards}>
                {initialSuggestions.map((suggestion, idx) => (
                  <button 
                    key={idx}
                    style={styles.suggestionCard}
                    onClick={() => handleSuggestionClick(suggestion)}
                    disabled={isLoading}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Zone de saisie */}
          <div style={styles.inputArea}>
            <input 
              type="text"
              placeholder="Posez votre question..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
              style={styles.input}
            />
            
            {inputText && !isLoading && (
              <button style={{...styles.iconBtn, ...styles.sendBtn}} onClick={() => handleSendMessage()}>
                <Icons.Send />
              </button>
            )}
            
            {!inputText && !isLoading && (
              <button style={styles.iconBtn}>
                <Icons.Send />
              </button>
            )}

            {isLoading && (
              <div style={styles.spinner}></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  floatingBtn: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    zIndex: 1000,
  },
  floatingBtnOpen: {
    backgroundColor: '#333',
  },
  chatWindow: {
    position: 'fixed',
    bottom: '100px',
    right: '24px',
    width: '400px',
    height: '600px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 999,
  },
  header: {
    padding: '20px',
    borderBottom: '1px solid #f0f0f0',
    backgroundColor: '#ffffff',
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  headerIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  headerIconImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  headerTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  headerSubtitle: {
    fontSize: '13px',
    color: '#666',
  },
  chatBody: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    backgroundColor: '#fafafa',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
    padding: '40px 20px',
  },
  emptyIcon: {
    color: '#4CAF50',
    marginBottom: '20px',
  },
  emptyTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: '0 0 8px 0',
  },
  emptySubtitle: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
    lineHeight: '1.5',
  },
  messageRow: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '16px',
    gap: '8px',
  },
  messageRowSelf: {
    justifyContent: 'flex-end',
  },
  messageRowOther: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarUser: {
    backgroundColor: '#333',
    color: 'white',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: '12px 16px',
    borderRadius: '16px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  messageBubbleOther: {
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    borderTopLeftRadius: '4px',
  },
  messageBubbleSelf: {
    backgroundColor: '#333',
    color: 'white',
    borderTopRightRadius: '4px',
  },
  messageText: {
    margin: '0 0 6px 0',
    fontSize: '14px',
    lineHeight: '1.5',
  },
  messageInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    opacity: 0.7,
  },
  messageTime: {
    fontSize: '11px',
  },
  audioBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    opacity: 0.8,
    transition: 'opacity 0.2s',
  },
  audioIcon: {
    width: '16px',
    height: '16px',
  },
  typingIndicator: {
    display: 'flex',
    gap: '4px',
    padding: '4px 0',
  },
  typingDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#666',
    animation: 'bounce 1.4s infinite ease-in-out',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginLeft: '40px',
    marginBottom: '12px',
  },
  suggestionsBottom: {
    padding: '16px 20px 20px',
    borderTop: '1px solid #f0f0f0',
    backgroundColor: '#fafafa',
  },
  suggestionsLabel: {
    fontSize: '12px',
    color: '#999',
    marginBottom: '12px',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  suggestionCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
  },
  suggestionCard: {
    padding: '12px',
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center',
    lineHeight: '1.3',
    color: '#333',
    fontWeight: '500',
  },
  inputArea: {
    padding: '16px 20px',
    borderTop: '1px solid #f0f0f0',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    border: '1px solid #e0e0e0',
    borderRadius: '24px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  iconBtn: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    backgroundColor: 'transparent',
    color: '#666',
  },
  sendBtn: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid #f3f3f3',
    borderTop: '2px solid #4CAF50',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

// Animations CSS-in-JS
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes bounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-10px); }
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default Chat;