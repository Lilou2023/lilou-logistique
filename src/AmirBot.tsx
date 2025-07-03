import React, { memo, useState, useCallback } from 'react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const AmirBot = memo(() => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis Amir, votre assistant logistique. Comment puis-je vous aider aujourd\'hui ?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }, [inputText])

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('livraison')) {
      return 'Je peux vous aider avec les livraisons. Voulez-vous consulter le statut d\'une livraison ou planifier une nouvelle livraison ?'
    }
    
    if (input.includes('conducteur') || input.includes('chauffeur')) {
      return 'Pour la gestion des conducteurs, je peux vous montrer leur statut, leurs performances ou leur localisation actuelle.'
    }
    
    if (input.includes('véhicule') || input.includes('camion')) {
      return 'Je peux vous donner des informations sur les véhicules : statut, niveau de carburant, maintenance, etc.'
    }
    
    if (input.includes('performance') || input.includes('score')) {
      return 'Les performances sont excellentes aujourd\'hui ! Voulez-vous voir les détails par conducteur ou par véhicule ?'
    }
    
    return 'Je comprends votre demande. Pouvez-vous être plus spécifique sur ce que vous souhaitez savoir concernant la logistique ?'
  }

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }, [handleSendMessage])

  return (
    <div className="amir-bot">
      <div className="bot-header">
        <h2>🤖 Amir - Assistant Logistique</h2>
        <div className="bot-status">En ligne</div>
      </div>

      <div className="chat-container">
        <div className="messages-list">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot-message typing">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="chat-input">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre message..."
            rows={2}
            className="message-input"
          />
          <button 
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="send-button"
          >
            Envoyer
          </button>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Actions rapides :</h3>
        <div className="action-buttons">
          <button onClick={() => setInputText('Statut des livraisons du jour')}>
            📦 Livraisons du jour
          </button>
          <button onClick={() => setInputText('Où sont mes conducteurs ?')}>
            👥 Localisation conducteurs
          </button>
          <button onClick={() => setInputText('Niveau de carburant des véhicules')}>
            ⛽ Carburant véhicules
          </button>
          <button onClick={() => setInputText('Performances de la semaine')}>
            📊 Performances
          </button>
        </div>
      </div>
    </div>
  )
})

AmirBot.displayName = 'AmirBot'

export default AmirBot