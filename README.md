# 🏢 Boss Machine API

A comprehensive full-stack web application for managing an evil organization's operations, including minions, million-dollar ideas, meetings, and work assignments.

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Frontend Interface](#frontend-interface)
- [Project Structure](#project-structure)
- [Development Process](#development-process)
- [Testing](#testing)
- [Contributing](#contributing)

## ✨ Features

### 🤖 **Minion Management**
- Create, read, update, and delete minions
- Track minion details (name, title, salary, weaknesses)
- Advanced parameter validation and error handling

### 💡 **Million-Dollar Ideas**
- Manage breakthrough business ideas
- **Smart validation**: Only ideas worth ≥ $1,000,000 are accepted
- Custom middleware for business logic enforcement
- Full CRUD operations with data integrity

### 📅 **Meeting Coordination**
- Auto-generate random meetings with fake data
- View all scheduled meetings
- Bulk delete all meetings
- No manual input required for meeting creation

### 👷 **Work Assignment System (Advanced)**
- **Nested resource management**: Assign work to specific minions
- **Security validation**: Ensure work belongs to correct minion
- **Relationship integrity**: Prevent unauthorized access
- Advanced routing with multiple parameters

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: React (pre-built and bundled)
- **Database**: In-memory JavaScript objects with helper functions
- **Middleware**: Custom validation, CORS, Body parsing
- **Architecture**: RESTful API design with nested resources

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd boss-machine-start
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   node main.js
   ```

4. **Access the application**:
   ```
   Frontend: http://localhost:4001
   API: http://localhost:4001/api
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:4001/api
```

### 🤖 Minions Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/minions` | Get all minions |
| POST | `/minions` | Create a new minion |
| GET | `/minions/:id` | Get specific minion |
| PUT | `/minions/:id` | Update specific minion |
| DELETE | `/minions/:id` | Delete specific minion |

**Minion Schema:**
```javascript
{
  "id": "string (auto-generated)",
  "name": "string (required)",
  "title": "string (required)",
  "salary": "number (required)",
  "weaknesses": "string (auto-generated)"
}
```

### 💡 Ideas Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/ideas` | Get all ideas |
| POST | `/ideas` | Create a million-dollar idea |
| GET | `/ideas/:id` | Get specific idea |
| PUT | `/ideas/:id` | Update specific idea |
| DELETE | `/ideas/:id` | Delete specific idea |

**Idea Schema:**
```javascript
{
  "id": "string (auto-generated)",
  "name": "string (required)",
  "description": "string (required)",
  "numWeeks": "number (required)",
  "weeklyRevenue": "number (required)"
}
```

**💰 Million-Dollar Validation:**
- `numWeeks × weeklyRevenue` must be ≥ 1,000,000
- Applied to both POST and PUT requests
- Returns 400 error for invalid ideas

### 📅 Meetings Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/meetings` | Get all meetings |
| POST | `/meetings` | Generate a random meeting |
| DELETE | `/meetings` | Delete all meetings |

**Meeting Schema:**
```javascript
{
  "id": "string (auto-generated)",
  "time": "string (HH:MM format)",
  "date": "Date object",
  "day": "string (date string)",
  "note": "string (auto-generated)"
}
```

### 👷 Work Endpoints (Nested Resources)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/minions/:minionId/work` | Get all work for specific minion |
| POST | `/minions/:minionId/work` | Assign work to specific minion |
| PUT | `/minions/:minionId/work/:workId` | Update specific work item |
| DELETE | `/minions/:minionId/work/:workId` | Remove specific work item |

**Work Schema:**
```javascript
{
  "id": "string (auto-generated)",
  "title": "string (required)",
  "description": "string (required)",
  "hours": "number (required)",
  "minionId": "string (links to minion)"
}
```

**🔒 Security Features:**
- Validates work belongs to specified minion
- Prevents unauthorized access to other minions' work
- Returns 400 error for ownership violations

## 🌐 Frontend Interface

The application includes a fully functional React frontend:

### **Navigation Sections:**
- **Minions**: Manage your workforce
- **Ideas**: Track million-dollar concepts
- **Meetings**: Schedule and manage meetings
- **Work**: Assign tasks to minions

### **Key Features:**
- **Real-time updates**: Changes reflect immediately
- **Form validation**: Client-side and server-side validation
- **Error handling**: User-friendly error messages
- **Responsive design**: Works on desktop and mobile

### **Testing Your API:**
1. Use the web interface for user-friendly testing
2. Use Postman for detailed API testing
3. Check browser Developer Tools (F12) → Network tab to see API calls

## 📁 Project Structure

```
boss-machine-start/
├── app.js                          # Express app configuration
├── main.js                         # Server entry point
├── index.html                      # Frontend HTML
├── package.json                    # Dependencies and scripts
├── server/
│   ├── api.js                      # Main API routes
│   ├── db.js                       # Database helper functions
│   └── checkMillionDollarIdea.js   # Custom middleware
├── public/
│   ├── css/                        # Stylesheets
│   ├── js/                         # Bundled React app
│   └── img/                        # Images and icons
└── README.md                       # This file
```

## 🔧 Development Process

This project was built following modern API development practices:

### **Phase 1: Foundation**
- ✅ Express server setup with middleware
- ✅ Database helper function integration
- ✅ CORS and body parsing configuration

### **Phase 2: Basic CRUD**
- ✅ Minions API with full CRUD operations
- ✅ Ideas API with business logic validation
- ✅ Parameter middleware for DRY validation

### **Phase 3: Advanced Features**
- ✅ Custom million-dollar validation middleware
- ✅ Meetings API with auto-generation
- ✅ Comprehensive error handling

### **Phase 4: Complex Relationships**
- ✅ Nested work routes with security validation
- ✅ Multi-parameter handling
- ✅ Ownership and access control

### **Phase 5: Integration**
- ✅ Frontend-backend integration
- ✅ Static file serving
- ✅ End-to-end testing

## 🧪 Testing

### **Manual Testing Scenarios:**

1. **Create a minion** → Verify in GET all minions
2. **Try small idea** → Should get 400 error
3. **Create million-dollar idea** → Should succeed
4. **Generate meetings** → Check accumulation
5. **Delete all meetings** → Verify empty array
6. **Assign work to minion** → Test nested routes
7. **Try unauthorized work access** → Should get 400 error

### **API Testing Tools:**
- **Postman**: Detailed API endpoint testing
- **Browser DevTools**: Network monitoring
- **Frontend Interface**: User experience testing

## 🏆 Key Achievements

- ✅ **Professional RESTful API** design
- ✅ **Advanced middleware** architecture
- ✅ **Nested resource management** with security
- ✅ **Custom business logic** validation
- ✅ **Comprehensive error handling**
- ✅ **Full-stack integration**
- ✅ **Production-ready** code structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature-name'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📝 License

This project is part of a coding bootcamp curriculum and is for educational purposes.

## 👨‍💻 Developer

### 👨‍💻 Developer

**Sikdar Sadman Rahman**  

---

**Happy Coding!** 🚀 May your ideas be worth millions! 💰