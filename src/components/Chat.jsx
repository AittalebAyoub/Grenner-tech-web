import React, { useState, useEffect, useRef, useMemo } from 'react';
import '../styles/Chat.css'; 

// URL de base de l'API (sans l'ID de session)
const API_BASE_URL = 'http://127.0.0.1:8000/ask/'; 
const API_AUDIO_URL = 'http://127.0.0.1:8000/generate_audio/';

// Chemins des icônes (doivent exister dans votre dossier public)
const ICON_PATHS = {
  MIC: '/icons/mic-icon.svg', 
  SEND: '/icons/send-icon.svg',
  TOGGLE_OPEN: '/icons/close-icon.svg', 
  TOGGLE_CLOSED: '/icons/chat-toggle-icon.svg',
  HEADER_ICON: '/icons/grennertech-logo.svg',
  AVATAR_BOT: '/icons/bot-avatar.svg',
  AVATAR_USER: '/icons/user-avatar.svg',
  AUDIO_PLAY: '/icons/audio-play.svg', 
  AUDIO_PAUSE: '/icons/audio-pause.svg',
};


// Fonction utilitaire pour générer un ID de session unique
const generateSessionId = () => {
    return Math.floor(Math.random() * 100000) + Date.now();
};


const Chat = () => {
  // --- ÉTATS GLOBAUX ET DE SESSION ---
  const sessionId = useMemo(() => generateSessionId(), []);

  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: `Bonjour ! Je suis GrennerChat, l'agent IA de GrennerTech. Comment puis-je vous aider aujourd'hui ?`, 
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }), 
      sender: "other", 
      status: "read",
      audioData: { base64: null, mimeType: null },
      audioLoading: false,
      suggestedTags: ["Nos services", "Nous contacter", "Nos réalisations"] // Tags de bienvenue
    },
  ]);
  const [isLoading, setIsLoading] = useState(false); 

  // --- ÉTATS DE LECTURE AUDIO ---
  const [currentAudio, setCurrentAudio] = useState(null);
  const [playingMessageId, setPlayingMessageId] = useState(null);

  const chatBodyRef = useRef(null); 

  // Effet pour le défilement automatique
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);


  const toggleChat = () => setIsOpen(!isOpen);
  const handleInputChange = (e) => setInputText(e.target.value);
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  // --- GESTION DES CLICS SUR LES TAGS ---
  const handleTagClick = (tagText) => {
    if (isLoading) return;
    
    // Stopper l'audio en cours s'il y en a un
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setPlayingMessageId(null);
      setCurrentAudio(null);
    }
    
    // Remplir l'input avec le texte du tag
    setInputText(tagText);
    
    // Envoyer automatiquement après un court délai
    setTimeout(() => {
      const apiUrlWithSession = API_BASE_URL + sessionId;

      // Ajouter le message de l'utilisateur
      const userMessage = {
        id: messages.length + 1,
        text: tagText,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        sender: "self",
        status: "sent"
      };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInputText('');
      setIsLoading(true);

      // Préparer les données pour l'API
      const formData = new FormData();
      formData.append('query', tagText); 

      // Appel API
      fetch(apiUrlWithSession, {
        method: 'POST',
        body: formData,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'success' && data.response_data && data.response_data.reponse) {
          const botMessageId = messages.length + 2;
          const botResponse = {
            id: botMessageId,
            text: data.response_data.reponse,
            time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            sender: "other",
            status: "read",
            audioData: { base64: null, mimeType: null },
            audioLoading: false,
            suggestedTags: data.response_data.suggested_tags || [] // Tags dynamiques de l'IA
          };
          
          setMessages(prevMessages => [...prevMessages, botResponse]);
          generateAudioForMessage(botMessageId, data.response_data.reponse);
          
        } else {
          const errorMessage = {
            id: messages.length + 2,
            text: "Désolé, je n'ai pas pu traiter votre demande.",
            time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            sender: "other",
            status: "read",
            audioData: { base64: null, mimeType: null },
            audioLoading: false,
            suggestedTags: []
          };
          setMessages(prevMessages => [...prevMessages, errorMessage]);
        }
      })
      .catch(error => {
        console.error("Erreur lors de l'appel API:", error);
        const networkError = {
          id: messages.length + 2,
          text: "Erreur de connexion au serveur. Veuillez réessayer.",
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          sender: "other",
          status: "read",
          audioData: { base64: null, mimeType: null },
          audioLoading: false,
          suggestedTags: []
        };
        setMessages(prevMessages => [...prevMessages, networkError]);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }, 100);
  };

  // --- GESTION DE LA LECTURE/PAUSE AUDIO ---
  const handlePlayAudio = (base64String, mimeType, messageId) => {
    
    console.log('🔊 Tentative de lecture audio:', {
      messageId,
      hasBase64: !!base64String,
      base64Length: base64String?.length,
      mimeType,
      base64Preview: base64String?.substring(0, 50)
    });
    
    // 1. Si l'audio du message actuel est déjà en cours de lecture
    if (currentAudio && playingMessageId === messageId) {
        if (!currentAudio.paused) {
            // FAIRE PAUSE
            console.log('⏸️ Pause audio');
            currentAudio.pause();
            setPlayingMessageId(null);
        } else {
            // REPRENDRE
            console.log('▶️ Reprise audio');
            currentAudio.play().catch(error => {
                console.error("❌ Erreur lors de la reprise audio:", error);
            });
            setPlayingMessageId(messageId);
        }
        return;
    }

    // 2. Si un autre audio est en cours, on le stoppe
    if (currentAudio) {
        console.log('⏹️ Arrêt audio précédent');
        currentAudio.pause();
        currentAudio.currentTime = 0; 
        setPlayingMessageId(null);
    }

    // 3. Créer le nouvel objet Audio et le jouer
    try {
        const audioSrc = `data:${mimeType};base64,${base64String}`;
        console.log('🎵 Création Audio element avec src:', audioSrc.substring(0, 100) + '...');
        
        const newAudio = new Audio(audioSrc);

        // Ajout d'un écouteur pour réinitialiser l'état quand la lecture est terminée
        newAudio.onended = () => {
            console.log('✅ Lecture audio terminée');
            setPlayingMessageId(null);
            setCurrentAudio(null);
        };
        
        // Ajout d'un écouteur pour gérer les erreurs de lecture
        newAudio.onerror = (e) => {
            console.error("❌ Erreur Audio: Le navigateur n'a pas pu lire le fichier.", e);
            console.error("Audio element state:", {
                src: newAudio.src,
                error: newAudio.error
            });
            setPlayingMessageId(null);
            setCurrentAudio(null);
        };

        console.log('▶️ Lancement lecture audio...');
        newAudio.play()
            .then(() => console.log('✅ Audio joué avec succès'))
            .catch(error => {
                console.error("❌ Erreur lors de la lecture audio:", error);
                console.error("Details:", {
                    name: error.name,
                    message: error.message
                });
            });
        
        // 4. Mettre à jour les états avec le nouveau lecteur
        setCurrentAudio(newAudio);
        setPlayingMessageId(messageId);

    } catch (e) {
        console.error("❌ Erreur de création du lecteur audio:", e);
    }
  };

  // --- GÉNÉRATION AUDIO ASYNCHRONE ---
  const generateAudioForMessage = async (messageId, fullText) => {
    const apiAudioUrl = API_AUDIO_URL + sessionId;
    
    console.log('🎵 Début génération audio pour message:', messageId);
    console.log('📝 Texte à synthétiser:', fullText.substring(0, 50) + '...');
    console.log('🌐 URL API Audio:', apiAudioUrl);
    
    try {
      // Marquer le message comme "en cours de génération audio"
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === messageId 
            ? { ...msg, audioLoading: true }
            : msg
        )
      );

      const response = await fetch(apiAudioUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ full_text: fullText }),
      });

      console.log('📡 Réponse HTTP status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erreur serveur:', errorText);
        throw new Error(`Erreur HTTP génération audio: ${response.status}`);
      }

      const audioData = await response.json();
      console.log('✅ Audio reçu:', {
        hasBase64: !!audioData.audio_base64,
        base64Length: audioData.audio_base64?.length,
        mimeType: audioData.audio_mime_type
      });
      
      // Mettre à jour le message avec l'audio généré
      setMessages(prevMessages => 
        prevMessages.map(msg => 
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
      
      console.log('✅ Message mis à jour avec audio');

    } catch (error) {
      console.error("❌ Erreur lors de la génération audio:", error);
      // Marquer l'échec de génération audio
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === messageId 
            ? { ...msg, audioLoading: false, audioError: true }
            : msg
        )
      );
    }
  };

  // --- GESTION DE L'ENVOI DE MESSAGE (OPTIMISÉ) ---
  const handleSendMessage = async () => {
    const userQuery = inputText.trim();
    if (!userQuery || isLoading) return;

    // Stopper l'audio en cours s'il y en a un
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        setPlayingMessageId(null);
        setCurrentAudio(null);
    }

    const apiUrlWithSession = API_BASE_URL + sessionId;

    // 1. Ajouter le message de l'utilisateur
    const userMessage = {
      id: messages.length + 1,
      text: userQuery,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      sender: "self",
      status: "sent"
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    setIsLoading(true);

    // 2. Préparer les données pour l'API
    const formData = new FormData();
    formData.append('query', userQuery); 

    try {
      // 3. Appel de l'API pour obtenir la réponse textuelle (rapide)
      const response = await fetch(apiUrlWithSession, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      // 4. Afficher immédiatement la réponse textuelle
      if (data.status === 'success' && data.response_data && data.response_data.reponse) {
        const botMessageId = messages.length + 2;
        const botResponse = {
          id: botMessageId,
          text: data.response_data.reponse,
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          sender: "other",
          status: "read",
          audioData: { base64: null, mimeType: null },
          audioLoading: false,
          suggestedTags: data.response_data.suggested_tags || [] // Tags dynamiques de l'IA
        };
        
        setMessages(prevMessages => [...prevMessages, botResponse]);
        
        // 5. Générer l'audio en arrière-plan (non-bloquant)
        generateAudioForMessage(botMessageId, data.response_data.reponse);
        
      } else {
        const errorMessage = {
          id: messages.length + 2,
          text: "Désolé, je n'ai pas pu traiter votre demande.",
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          sender: "other",
          status: "read",
          audioData: { base64: null, mimeType: null },
          audioLoading: false,
          suggestedTags: []
        };
        setMessages(prevMessages => [...prevMessages, errorMessage]);
      }

    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
      const networkError = {
        id: messages.length + 2,
        text: "Erreur de connexion au serveur. Veuillez réessayer.",
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        sender: "other",
        status: "read",
        audioData: { base64: null, mimeType: null },
        audioLoading: false,
        suggestedTags: []
      };
      setMessages(prevMessages => [...prevMessages, networkError]);
    } finally {
      setIsLoading(false);
    }
  };


  // --- RENDU JSX ---
  return (
    <>
      {isOpen && (
        <div className="chat-window">
          {/* Header du Chat */}
          <div className="chat-header" onClick={toggleChat}>
             <div className="chat-header-content">
                <img src={ICON_PATHS.HEADER_ICON} alt="GrennerTech Chat Logo" className="chat-header-icon-img" /> 
                GrennerTech-chat
             </div>
          </div>

          {/* Corps des messages */}
          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg) => (
              <div key={msg.id}>
                <div className={`message-row ${msg.sender}`}>
                  {/* Avatar du Bot */}
                  {msg.sender === 'other' && (
                    <div className="avatar bot-avatar">
                      <img src={ICON_PATHS.AVATAR_BOT} alt="Bot" />
                    </div>
                  )}
                  
                  <div className={`message-bubble ${msg.sender}`}>
                    <p>{msg.text}</p>
                    <div className="message-info">
                      <span className="time">{msg.time}</span>
                      
                      {/* Indicateur de chargement audio */}
                      {msg.sender === 'other' && msg.audioLoading && (
                        <span className="audio-loading-indicator" title="Génération audio en cours...">
                          🔊...
                        </span>
                      )}
                      
                      {/* Bouton Audio pour les messages de l'agent */}
                      {msg.sender === 'other' && msg.audioData && msg.audioData.base64 && (
                          <button 
                              className={`audio-play-btn ${playingMessageId === msg.id ? 'is-active' : ''}`}
                              onClick={() => handlePlayAudio(msg.audioData.base64, msg.audioData.mimeType, msg.id)}
                              title={playingMessageId === msg.id && currentAudio && !currentAudio.paused ? "Pause Audio" : "Écouter la réponse"}
                          >
                              <img 
                                  src={playingMessageId === msg.id && currentAudio && !currentAudio.paused && ICON_PATHS.AUDIO_PAUSE 
                                      ? ICON_PATHS.AUDIO_PAUSE 
                                      : ICON_PATHS.AUDIO_PLAY
                                  } 
                                  alt={playingMessageId === msg.id && currentAudio && !currentAudio.paused ? "Pause" : "Play Audio"} 
                              />
                          </button>
                      )}

                      {/* Statut de lecture pour l'utilisateur */}
                      {msg.sender === 'self' && msg.status === 'read' && (
                        <span className="check-icon">✓</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Avatar Utilisateur */}
                  {msg.sender === 'self' && (
                    <div className="avatar user-avatar">
                      <img src={ICON_PATHS.AVATAR_USER} alt="Vous" />
                    </div>
                  )}
                </div>

                {/* Tags suggérés (uniquement pour les messages du bot) */}
                {msg.sender === 'other' && msg.suggestedTags && msg.suggestedTags.length > 0 && (
                  <div className="suggested-tags-container">
                    {msg.suggestedTags.map((tag, index) => (
                      <button 
                        key={index}
                        className="suggested-tag-btn"
                        onClick={() => handleTagClick(tag)}
                        disabled={isLoading}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Indication de chargement (Typing Indicator) */}
            {isLoading && (
              <div className="message-row other typing-indicator">
                <div className="avatar bot-avatar">
                  <img src={ICON_PATHS.AVATAR_BOT} alt="Bot" />
                </div>
                <div className="message-bubble other">
                  <div className="dot-typing"></div>
                </div>
              </div>
            )}
          </div>

          {/* Champ de saisie */}
          <div className="chat-input-area">
            <input 
              type="text" 
              placeholder={isLoading ? "L'IA est en train de répondre..." : "Type your message here..."}
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              disabled={isLoading} 
            />
            
            {/* Icône Envoyer (Texte + non chargement) */}
            {inputText && !isLoading && (
              <span className="input-icon send" onClick={handleSendMessage}>
                <img src={ICON_PATHS.SEND} alt="Envoyer" />
              </span>
            )}
            
            {/* Icône Audio/Micro (Vide + non chargement) */}
            {!inputText && !isLoading && (
              <span className="input-icon mic">
                <img src={ICON_PATHS.MIC} alt="Microphone" />
              </span>
            )}

            {/* Icône de chargement (si en chargement) */}
            {isLoading && (
              <span className="input-icon loading">
                <div className="spinner"></div> 
              </span>
            )}
          </div>
        </div>
      )}

      {/* Bouton flottant */}
      <button className={`chat-toggle-btn ${isOpen ? 'is-open' : ''}`} onClick={toggleChat}>
        <span className="toggle-icon">
          <img 
            src={isOpen ? ICON_PATHS.TOGGLE_OPEN : ICON_PATHS.TOGGLE_CLOSED} 
            alt={isOpen ? "Fermer le chat" : "Ouvrir le chat"} 
          />
        </span>
      </button>
    </>
  );
};

export default Chat;