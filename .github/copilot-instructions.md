# ChatGPT-Style Portfolio Instructions

This workspace contains a React-based portfolio website that perfectly mimics the ChatGPT interface.

## Project Overview
- **Framework**: React 18 with Vite
- **Styling**: Vanilla CSS matching ChatGPT's exact design
- **Purpose**: Interactive portfolio presented as a chat interface

## Key Features
- Pixel-perfect ChatGPT UI recreation
- Sidebar with chat history-style navigation
- Mock conversation data for portfolio content
- Fully responsive design
- Dark theme matching ChatGPT

## Development Workflow
1. **Content Updates**: Modify mock data in `src/App.jsx`
2. **Styling**: Update CSS in `src/App.css` for component styles
3. **Global Styles**: Modify `src/index.css` for app-wide styling
4. **Development**: Run `npm run dev` for hot reload
5. **Production**: Run `npm run build` for deployment

## File Structure
- `src/App.jsx` - Main React component with chat interface
- `src/App.css` - ChatGPT-specific styling
- `src/index.css` - Global styles and reset
- `src/main.jsx` - React entry point

## Customization Points
- **Profile Info**: Update name, avatar, and title in sidebar
- **Conversations**: Modify `mockConversations` array for navigation items
- **Messages**: Update `mockMessages` array with portfolio content
- **Colors**: Adjust CSS variables for custom theming

## Development Commands
- `npm run dev` - Start development server on localhost:5173
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run code linting

## Best Practices
- Keep the ChatGPT aesthetic consistent when making changes
- Use the existing color scheme and spacing patterns
- Test responsive behavior on different screen sizes
- Maintain proper React component structure
