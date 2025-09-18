import { useState } from 'react';
import './App.css';

const mockConversations = [
  { id: 1, title: "About Me", preview: "Tell me about yourself" },
  { id: 2, title: "Skills & Experience", preview: "What are your technical skills?" },
  { id: 3, title: "Contact Info", preview: "How can I get in touch?" },
];

const mockMessages = {
  1: [ // About Me conversation
    { 
      role: 'user', 
      content: "Tell me about yourself" 
    },
    { 
      role: 'assistant', 
      content: "Hi! I'm **Othman Yehia Hamed** from Mosul, Iraq. Born on May 26, 2005, I'm a cybersecurity and AI engineering student at Northern Technical University with a passion for full-stack development and offensive security.\n\n**Professional Summary**\nI'm the founder of OYAPS Studio and organizer of Ashur CTF 2025, the largest cybersecurity competition in Nineveh governorate. I have a proven record of building real-world platforms and leading tech teams. I'm passionate about advancing the tech scene in Mosul and Iraq through community training and innovation.\n\n**Current Focus**\n• Cybersecurity and AI engineering studies\n• Leading OYAPS Studio development team\n• Organizing cybersecurity competitions\n• Building production systems for local businesses\n• Advancing Iraq's tech community\n\n**Education**\nB.Sc. in Cybersecurity and Cloud Computing Engineering\nNorthern Technical University – College of Computer Engineering & Artificial Intelligence\nExpected Graduation: 2027 – 2028\n\n**Key Projects & Achievements**\n\n**🏢 OYAPS Studio – Founder & Lead Developer (2020 – Present)**\n• Built and led a volunteer tech team delivering production systems\n• Organized Ashur CTF 2025, largest cybersecurity competition in Nineveh\n• Serving local businesses and universities in Mosul, Iraq\n\n**🎓 University Innovation Projects – Northern Technical University (2023 – Present)**\n• **NTU AI Chatbot**: Fine-tuned custom LLM for university queries and campus navigation\n• **Scopus Gate**: Integrated Scopus API for automated research publication notifications\n• **Smart Scheduling System**: AI-powered class scheduler eliminating conflicts\n• **College Airport Display**: Real-time lecture display system\n• **NTU Exam System**: Full online exam platform with automated grading\n\n**🌐 Production Websites & Platforms**\n• **Portfolio**: othman.oyaps.com\n• **Sunway Kindergarten Platform**: sunwayiq.com\n• **Simix Corporate Site**: simixiq.com\n• **AIOSH AI Learning Platform**: aiosh.oyaps.com\n• **Land of Franchise (Restaurant Management)**: landoffranchise.iq\n• **Nukhbat Ninawa Mobile App & Site**: nukhbatninawa.com" 
    }
  ],
  2: [ // Skills & Experience conversation
    { 
      role: 'user', 
      content: "What are your technical skills?" 
    },
    { 
      role: 'assistant', 
      content: "Here are my core technical skills:\n\n**💻 Programming & Frameworks**\n• Next.js, Node.js, React, React Native\n• Python, C++, Prisma\n• Full-stack web development\n\n**🗄️ Databases**\n• PostgreSQL, MySQL, MongoDB\n• Database design and optimization\n\n**🔐 Cybersecurity**\n• Penetration testing and vulnerability assessment\n• Red-team operations\n• eJPT Certification (eLearnSecurity Junior Penetration Tester)\n\n**🤖 AI & Machine Learning**\n• LLM fine-tuning and customization\n• Machine learning pipelines\n• AI-driven web applications\n\n**🛠️ Tools & Platforms**\n• Docker containerization\n• Linux (Arch, Kali)\n• Git version control\n• Cloud deployment and DevOps\n\n**🏆 Competition Achievements**\n• AI Competition Finalist, Cihan University\n• SulyCyberCon 2023 – 8th place nationwide\n• Iraq Ministry of Interior Cybersecurity Competition – National finalist\n• Digital Shortcut Hackathon (Asiacell) – 3rd place\n• Hurry Up Hackathon – Winner (2025)\n\n**🌐 Languages**\n• Arabic: Native\n• English: Good/Working proficiency" 
    }
  ],
  3: [ // Contact Info conversation
    { 
      role: 'user', 
      content: "How can I get in touch?" 
    },
    { 
      role: 'assistant', 
      content: "Feel free to reach out through any of these channels:\n\n**📧 Email**\n• othman.yehiaa@gmail.com\n• For professional inquiries and collaborations\n\n**📱 Phone**\n• +964 776 515 5920\n• Available for calls and WhatsApp\n\n**💼 Professional Networks**\n• LinkedIn: linkedin.com/in/othman-yehia-b37890377\n• Portfolio: othman.oyaps.com\n\n**📍 Location**\n• Based in Mosul, Iraq\n• Available for remote work and local projects\n\n**💬 Let's Connect!**\nI'm always interested in:\n• Cybersecurity collaboration opportunities\n• AI and machine learning projects\n• Full-stack development work\n• Tech community building in Iraq\n• Mentoring and knowledge sharing\n• Competition partnerships and CTF teams\n\nDon't hesitate to reach out if you want to discuss technology, explore collaborations, or learn more about the growing tech scene in Mosul!" 
    }
  ]
};

// Library images (your personal photos)
const libraryImages = [
  { id: 1, src: "/library/2025-09-16 06.41.46.jpg", alt: "Othman Photo 1" },
  { id: 2, src: "/library/2025-09-16 06.42.22.jpg", alt: "Othman Photo 2" },
  { id: 3, src: "/library/2025-09-16 06.42.45.jpg", alt: "Othman Photo 3" },
  { id: 4, src: "/library/2025-09-16 06.43.12.jpg", alt: "Othman Photo 4" },
  { id: 5, src: "/library/2025-09-16 06.43.24.jpg", alt: "Othman Photo 5" },
  { id: 6, src: "/library/2025-09-16 06.43.35.jpg", alt: "Othman Photo 6" },
  { id: 7, src: "/library/2025-09-16 06.43.45.jpg", alt: "Othman Photo 7" },
  { id: 8, src: "/library/2025-09-16 06.43.57.jpg", alt: "Othman Photo 8" }
];

function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 20H21M16.5 3.5A2.121 2.121 0 0 1 19 6L7 18L3 19L4 15L16.5 3.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M21 21L16.514 16.506L21 21ZM19 10.5A8.5 8.5 0 1 1 10.5 2A8.5 8.5 0 0 1 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LibraryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.5 2H20V22H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SoraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function GPTIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5V7H16.5A2.5 2.5 0 0 1 19 9.5A2.5 2.5 0 0 1 16.5 12H12V16.5A2.5 2.5 0 0 1 9.5 19A2.5 2.5 0 0 1 7 16.5V12H2.5A2.5 2.5 0 0 1 0 9.5A2.5 2.5 0 0 1 2.5 7H7V2.5A2.5 2.5 0 0 1 9.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ProjectIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M2 3H8A2 2 0 0 1 10 5V19A2 2 0 0 1 8 21H2A2 2 0 0 1 0 19V5A2 2 0 0 1 2 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 3H22A2 2 0 0 1 24 5V19A2 2 0 0 1 22 21H16A2 2 0 0 1 14 19V5A2 2 0 0 1 16 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChatGPTLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 41 41" fill="none">
      <path d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81185 28.3141C2.95956 29.7256 3.40694 31.0892 4.12454 32.3138C5.18791 34.1659 6.81226 35.6322 8.76319 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z" fill="currentColor"/>
    </svg>
  );
}

function UpgradeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Library({ selectedImage, onImageSelect, onImageClose }) {
  return (
    <div className="library-page">
      <div className="library-header">
        <h2>Photo Gallery</h2>
        <p>Personal photos collection</p>
      </div>
      
      <div className="library-gallery">
        {libraryImages.map((image) => (
          <div 
            key={image.id} 
            className="library-item"
            onClick={() => onImageSelect(image)}
          >
            <div className="library-image">
              <img src={image.src} alt={image.alt} />
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="image-modal" onClick={onImageClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={onImageClose}>×</button>
            <img src={selectedImage.src} alt={selectedImage.alt} />
          </div>
        </div>
      )}
    </div>
  );
}

function Sidebar({ onLibraryClick, onChatClick, currentView, selectedChat, onChatSelect }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="new-chat-btn" onClick={onChatClick}>
          <PlusIcon />
          New chat
        </button>
      </div>
      
      <div className="sidebar-content">
        <div className="sidebar-menu">
          <div className="menu-item">
            <SearchIcon />
            <span>Search chats</span>
          </div>
          <div 
            className={`menu-item ${currentView === 'library' ? 'active' : ''}`}
            onClick={onLibraryClick}
          >
            <LibraryIcon />
            <span>Library</span>
          </div>
        </div>

        <div className="sidebar-divider"></div>

        <div className="sidebar-section">
          <div className="section-header">
            <SoraIcon />
            <span>Sora</span>
          </div>
        </div>

        <div className="sidebar-divider"></div>

        <div className="sidebar-section">
          <div className="section-header">
            <GPTIcon />
            <span>ChatGPT</span>
          </div>
        </div>

        <div className="sidebar-divider"></div>

        <div className="sidebar-section">
          <div className="section-header">
            <ProjectIcon />
            <span>Projects</span>
          </div>
        </div>

        <div className="sidebar-divider"></div>

        <div className="chat-history">
          <div className="chat-history-section">
            <div className="section-title">Chats</div>
            {mockConversations.map(conv => (
              <div 
                key={conv.id}
                className={`chat-item ${selectedChat === conv.id ? 'active' : ''}`}
                onClick={() => onChatSelect(conv.id)}
              >
                <span className="chat-title">{conv.title}</span>
                <button className="edit-btn">
                  <EditIcon />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">OY</div>
          <div className="user-info">
            <span className="user-name">Othman Yehia</span>
            <span className="user-status">Free</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatArea({ selectedChat }) {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState(mockMessages[selectedChat] || []);
  const [showWelcome, setShowWelcome] = useState(messages.length === 0);

  // Update messages when selectedChat changes
  useState(() => {
    setMessages(mockMessages[selectedChat] || []);
    setShowWelcome((mockMessages[selectedChat] || []).length === 0);
  }, [selectedChat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { role: 'user', content: inputValue };
    const botResponse = { role: 'assistant', content: "This is just a portfolio showcase! 🤖" };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputValue('');
    setShowWelcome(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-area">
      <div className="chat-header">
        <div className="header-main">
          <div className="header-left">
            <button className="collapse-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="header-center">
            <div className="chat-title-container">
              <ChatGPTLogo />
              <h1>ChatGPT</h1>
            </div>
          </div>
          <div className="header-right">
            <button className="upgrade-header-btn">
              <UpgradeIcon />
              Upgrade your plan
            </button>
            <button className="profile-btn">
              <div className="avatar-small">OY</div>
            </button>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {showWelcome ? (
          <div className="welcome-screen">
            <div className="welcome-content">
              <ChatGPTLogo />
              <h2>How can I help you today?</h2>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <div className="message-content">
                {message.role === 'assistant' && (
                  <div className="message-avatar">
                    <ChatGPTLogo />
                  </div>
                )}
                <div className="message-text">
                  {message.content.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="chat-input-container">
        <form onSubmit={handleSubmit} className="chat-form">
          <div className="input-wrapper">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message ChatGPT"
              rows="1"
              className="chat-input"
            />
            <button 
              type="submit" 
              className="send-btn" 
              disabled={!inputValue.trim()}
            >
              <SendIcon />
            </button>
          </div>
        </form>
        <div className="input-footer">
          ChatGPT can make mistakes. Check important info.
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState('chat'); // 'chat' or 'library'
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedChat, setSelectedChat] = useState(1);

  const handleLibraryClick = () => {
    setCurrentView('library');
  };

  const handleChatClick = () => {
    setCurrentView('chat');
  };

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    setCurrentView('chat');
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleImageClose = () => {
    setSelectedImage(null);
  };

  return (
    <div className="app">
      <Sidebar 
        onLibraryClick={handleLibraryClick}
        onChatClick={handleChatClick}
        currentView={currentView}
        selectedChat={selectedChat}
        onChatSelect={handleChatSelect}
      />
      {currentView === 'chat' ? (
        <ChatArea selectedChat={selectedChat} />
      ) : (
        <Library 
          selectedImage={selectedImage}
          onImageSelect={handleImageSelect}
          onImageClose={handleImageClose}
        />
      )}
    </div>
  );
}
