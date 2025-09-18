import { useState } from 'react';
import './App.css';

const mockConversations = [
  { id: 1, title: "About Me", preview: "Tell me about yourself" },
  { id: 2, title: "Projects", preview: "What projects have you worked on?" },
  { id: 3, title: "Skills & Experience", preview: "What are your technical skills?" },
  { id: 4, title: "Contact Info", preview: "How can I get in touch?" },
];

const mockMessages = [
  { 
    role: 'user', 
    content: "Tell me about yourself" 
  },
  { 
    role: 'assistant', 
    content: "Hi! I'm Othman Aljumaily, a passionate cybersecurity enthusiast and developer. I specialize in penetration testing, security research, and creating secure applications. I love finding vulnerabilities and helping organizations strengthen their security posture.\n\nCurrently, I'm focused on:\n• Penetration testing and vulnerability assessment\n• CTF competitions and challenges\n• Security research and exploit development\n• Building secure web applications\n• Cybersecurity education and awareness\n\nI'm always excited to work on challenging security projects and help make the digital world safer!" 
  },
  { 
    role: 'user', 
    content: "What projects have you worked on?" 
  },
  { 
    role: 'assistant', 
    content: "Here are some of my recent projects:\n\n**🔒 ASHUR CTF Platform**\n• Cybersecurity capture-the-flag platform\n• Custom challenges and vulnerability labs\n• Used for training and competitions\n• Built with secure coding practices\n\n**🛡️ Security Assessment Tools**\n• Custom penetration testing scripts\n• Automated vulnerability scanners\n• Network security analysis tools\n• Bug bounty hunting utilities\n\n**📊 Security Dashboard**\n• Real-time security monitoring interface\n• Threat intelligence visualization\n• Incident response management\n• Built with React and security APIs\n\n**🌐 Portfolio Website (This one!)**\n• ChatGPT-inspired security portfolio\n• Showcases cybersecurity projects\n• Interactive chat interface" 
  },
  { 
    role: 'user', 
    content: "What are your technical skills?" 
  },
  { 
    role: 'assistant', 
    content: "Here are my key technical skills:\n\n**🔐 Cybersecurity**\n• Penetration Testing (Web Apps, Networks, Mobile)\n• Vulnerability Assessment & Management\n• Security Code Review & SAST/DAST\n• Incident Response & Forensics\n• Threat Modeling & Risk Assessment\n\n**💻 Programming & Development**\n• Python (Security scripting, automation)\n• JavaScript/React (Secure web development)\n• Bash/PowerShell (System administration)\n• SQL (Database security)\n• C/C++ (Exploit development)\n\n**🛠️ Security Tools & Frameworks**\n• Burp Suite, OWASP ZAP, Nmap\n• Metasploit, Cobalt Strike\n• Wireshark, tcpdump\n• Docker, Kubernetes security\n• AWS/Azure cloud security\n\n**📜 Certifications & Standards**\n• OSCP (Offensive Security Certified Professional)\n• CEH (Certified Ethical Hacker)\n• OWASP Top 10 expertise\n• ISO 27001, NIST frameworks" 
  },
  { 
    role: 'user', 
    content: "How can I get in touch?" 
  },
  { 
    role: 'assistant', 
    content: "Feel free to reach out through any of these channels:\n\n**📧 Email**\n• othman.aljumaily@example.com\n• For professional inquiries and collaborations\n\n**💼 Professional Networks**\n• LinkedIn: /in/othman-aljumaily\n• GitHub: /othmanaljumaily\n• Twitter: @othman_security\n\n**🏆 CTF & Security Platforms**\n• HackTheBox: othmanaljumaily\n• TryHackMe: othmanaljumaily\n• Bugcrowd: othmanaljumaily\n\n**💬 Let's Connect!**\nI'm always interested in:\n• Cybersecurity collaboration opportunities\n• Security research discussions\n• CTF team partnerships\n• Speaking at security conferences\n• Mentoring aspiring security professionals\n\nDon't hesitate to reach out if you want to discuss security, share knowledge, or explore potential collaborations!" 
  }
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
      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Sidebar() {
  const [selectedChat, setSelectedChat] = useState(1);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="new-chat-btn">
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
          <div className="menu-item">
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
            <span>GPTs</span>
          </div>
        </div>

        <div className="sidebar-divider"></div>

        <div className="sidebar-section">
          <div className="section-header">
            <div className="section-header-content">
              <ProjectIcon />
              <span>Projects</span>
            </div>
            <span className="new-badge">NEW</span>
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
                onClick={() => setSelectedChat(conv.id)}
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
          <div className="avatar">OA</div>
          <div className="user-info">
            <span className="user-name">othman aljumaily</span>
            <span className="user-status">Free</span>
          </div>
          <button className="upgrade-btn">Upgrade</button>
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ role, content }) {
  const formatContent = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <strong key={i} className="message-heading">{line.slice(2, -2)}</strong>;
      } else if (line.startsWith('•')) {
        return <div key={i} className="bullet-point">{line}</div>;
      } else if (line.trim() === '') {
        return <br key={i} />;
      } else {
        return <span key={i}>{line}<br /></span>;
      }
    });
  };

  return (
    <div className={`message ${role}`}>
      <div className="message-content">
        {role === 'assistant' && (
          <div className="avatar-container">
            <div className="assistant-avatar">
              <div className="avatar-inner">OA</div>
            </div>
          </div>
        )}
        <div className="text-content">
          {formatContent(content)}
        </div>
      </div>
    </div>
  );
}

function ChatArea() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [showWelcome, setShowWelcome] = useState(messages.length === 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { role: 'user', content: inputValue };
    const botResponse = { role: 'assistant', content: "dude its just a portfolio🤖" };

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
              <div className="profile-avatar">OA</div>
            </button>
          </div>
        </div>
      </div>

      {showWelcome ? (
        <div className="welcome-screen">
          <h2>What can I help with?</h2>
        </div>
      ) : (
        <div className="messages-container">
          {messages.map((msg, i) => (
            <ChatMessage key={i} role={msg.role} content={msg.content} />
          ))}
        </div>
      )}

      <div className="input-area">
        <form onSubmit={handleSubmit} className="input-container">
          <div className="input-wrapper">
            <button type="button" className="attach-btn">
              <PlusIcon />
            </button>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything"
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
  return (
    <div className="app">
      <Sidebar />
      <ChatArea />
    </div>
  );
}
