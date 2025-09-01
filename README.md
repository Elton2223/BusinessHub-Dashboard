# BusinessHub Admin Dashboard

A modern, responsive Vue.js admin dashboard for managing BusinessHub operations, built with glassmorphism design principles and integrated with your LoopBack4 backend API.

## 🚀 Features

### **Core Functionality**
- **User Management**: View, edit, delete, and manage all registered users
- **Real-time Dashboard**: Live statistics and overview of your business operations
- **Analytics**: Comprehensive insights into user behavior and system performance
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### **Design System**
- **Glassmorphism UI**: Modern translucent design with backdrop blur effects
- **BusinessHub Branding**: Consistent with your mobile app's design language
- **Dark Theme**: Optimized for long viewing sessions
- **Smooth Animations**: Subtle transitions and hover effects

### **Technical Features**
- **Vue 3 Composition API**: Modern Vue.js development patterns
- **Pinia State Management**: Efficient and type-safe state management
- **Vue Router**: Client-side routing with navigation guards
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **API Integration**: Seamless connection to your LoopBack4 backend

## 🛠️ Technology Stack

- **Frontend**: Vue.js 3 + Vite
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **HTTP Client**: Axios
- **Build Tool**: Vite

## 📱 Screenshots

### Dashboard Overview
- Real-time statistics cards
- Recent user activity
- Quick action buttons
- System status indicators

### User Management
- Comprehensive user table
- Search and filtering
- Bulk operations
- User profile editing

### Analytics
- User growth trends
- Geographic distribution
- Performance metrics
- Data export capabilities

### Settings
- Dashboard configuration
- API settings
- Security preferences
- Display options

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Your LoopBack4 backend running on `http://127.0.0.1:3005`

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd BusinessHub-Dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Default Login Credentials
- **Email**: `admin@businesshub.com`
- **Password**: `admin123`

## 🔧 Configuration

### API Configuration
The dashboard is configured to connect to your LoopBack4 backend at `http://127.0.0.1:3005`. You can modify this in:

- `vite.config.js` - Development proxy settings
- `src/services/api.js` - API base URL
- Dashboard settings page

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://127.0.0.1:3005
VITE_APP_TITLE=BusinessHub Admin Dashboard
```

## 📊 API Integration

### User Management Endpoints
- `GET /user-management` - Fetch all users
- `GET /user-management/{id}` - Get user by ID
- `POST /user-management` - Create new user
- `PATCH /user-management/{id}` - Update user
- `DELETE /user-management/{id}` - Delete user
- `POST /user-management/login` - User authentication

### Data Models
The dashboard integrates with your existing user management model:
```typescript
interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  profile_photo?: string;
  ratings?: number;
  phone_number?: number;
  street_address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  identification_doc?: string;
  latitude?: number;
  longitude?: number;
}
```

## 🎨 Customization

### Theme Colors
Modify the color scheme in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#667eea', // Your brand color
    600: '#5a67d8',
  },
  secondary: {
    500: '#a855f7',
    600: '#9333ea',
  }
}
```

### Glassmorphism Effects
Customize the glass effects in `src/style.css`:
```css
.glass-card {
  @apply bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl;
}
```

### Component Styling
All components use Tailwind CSS classes and can be easily customized through the utility classes.

## 📱 Mobile Responsiveness

The dashboard is fully responsive and includes:
- Mobile-first design approach
- Collapsible sidebar on small screens
- Touch-friendly interface elements
- Optimized table layouts for mobile

## 🔒 Security Features

- **Authentication Guards**: Protected routes with login requirement
- **Session Management**: Secure token-based authentication
- **Input Validation**: Form validation and sanitization
- **API Security**: Secure communication with backend

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Production
1. Build the project: `npm run build`
2. Upload the `dist` folder to your web server
3. Configure your server to serve the SPA correctly
4. Update API endpoints for production

### Docker Deployment
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🧪 Testing

### Run Tests
```bash
npm run test
```

### Linting
```bash
npm run lint
npm run lint:fix
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── layouts/            # Layout components
├── router/             # Vue Router configuration
├── services/           # API services
├── stores/             # Pinia stores
├── views/              # Page components
├── style.css           # Global styles
└── main.js             # App entry point
```

## 🔄 State Management

### Pinia Stores
- **Auth Store**: Authentication state and user management
- **Users Store**: User data and operations
- **Settings Store**: Dashboard configuration

### Data Flow
1. Components dispatch actions to stores
2. Stores make API calls and update state
3. Components reactively update based on state changes
4. Persistent data stored in localStorage

## 🌟 Key Components

### DashboardLayout
- Responsive sidebar navigation
- Header with search and notifications
- User profile section

### User Management
- Data table with pagination
- Search and filtering
- Bulk operations
- User profile editing

### Analytics Dashboard
- Statistics cards
- Chart placeholders for future integration
- Data export functionality

## 🚧 Future Enhancements

### Planned Features
- **Real-time Charts**: Integration with Chart.js for data visualization
- **Advanced Filtering**: Multi-criteria user filtering
- **Bulk Operations**: Mass user management actions
- **Notification System**: Real-time alerts and updates
- **User Activity Tracking**: Detailed user behavior analytics
- **Export Functionality**: CSV/PDF data export
- **Multi-language Support**: Internationalization

### Chart Integration
```bash
npm install chart.js vue-chartjs
```

### Real-time Updates
```bash
npm install socket.io-client
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

### Common Issues

**Dashboard not loading users**
- Ensure your LoopBack4 backend is running
- Check the API URL configuration
- Verify CORS settings on your backend

**Authentication issues**
- Clear browser localStorage
- Check login credentials
- Verify backend authentication endpoints

**Styling issues**
- Ensure Tailwind CSS is properly installed
- Check for CSS conflicts
- Verify PostCSS configuration

### Getting Help
- Check the browser console for errors
- Verify API responses in Network tab
- Review the backend logs for API errors

## 🔗 Related Projects

- **BusinessHub Mobile**: Flutter mobile application
- **BusinessHub Backend**: LoopBack4 API server
- **BusinessHub Dashboard**: This Vue.js admin panel

---

**Built with ❤️ for BusinessHub**

*This dashboard provides a powerful, modern interface for managing your BusinessHub operations, perfectly aligned with your mobile app and backend API.*