# ChatGPT-Style Portfolio

A modern portfolio website that perfectly mimics the ChatGPT interface design. Built with React and Vite for fast development and optimal performance.

## Features

- **Exact ChatGPT UI Clone**: Pixel-perfect recreation of ChatGPT's interface
- **Sidebar Navigation**: Chat history-style navigation with profile section
- **Chat Interface**: Portfolio content presented as conversational messages
- **Mock Data Ready**: Easy to replace with your own portfolio content
- **Responsive Design**: Works perfectly on all device sizes
- **Modern Tech Stack**: React 18 + Vite for blazing fast development

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone or use this project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser

## Customization

### Update Portfolio Content

Edit the mock data in `src/App.jsx`:

```javascript
const mockConversations = [
  { id: 1, title: "About Me", preview: "Tell me about yourself" },
  // Add your own navigation items
];

const mockMessages = [
  { role: 'user', content: "Your question here" },
  { role: 'assistant', content: "Your portfolio content here" },
  // Add your own chat messages
];
```

### Personalize Profile

Update the profile information in the sidebar:
- Change avatar initials
- Update name and title
- Modify navigation items

### Styling

The project uses vanilla CSS with exact ChatGPT color scheme:
- Primary dark: `#212121`
- Sidebar dark: `#171717`
- Secondary dark: `#2a2a2a`
- ChatGPT green: `#10a37f`

## Project Structure

```
src/
├── App.jsx          # Main application component
├── App.css          # ChatGPT-style styling
├── index.css        # Global styles
└── main.jsx         # React entry point
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies

- **React 18** - Modern React with hooks
- **Vite** - Next generation frontend tooling
- **CSS3** - Custom styling to match ChatGPT exactly
- **ESLint** - Code linting and formatting

## Deployment

Build the project for production:

```bash
npm run build
```

The `dist` folder will contain your production-ready files.

## License

MIT License - feel free to use this for your own portfolio!
