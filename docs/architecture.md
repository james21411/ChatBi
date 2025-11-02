# ChatBI Architecture Documentation

## Overview

ChatBI is a modern business intelligence platform that combines natural language processing, data visualization, and interactive dashboards. The system allows users to query their data using plain English and receive insights through AI-powered analysis and visual representations.

## System Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │◄──►│   (FastAPI)     │◄──►│   (SQLite)      │
│                 │    │                 │    │                 │
│ - Chat Interface│    │ - API Endpoints │    │ - Sales Data    │
│ - Dashboard     │    │ - Query Processing│   │ - User Sessions │
│ - Data Tables   │    │ - AI Models      │    │ - Query Logs    │
│ - Visualizations│    │ - Session Mgmt   │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Component Details

### Backend Architecture (FastAPI)

#### Core Components

1. **API Layer** (`backend/app/api/`)
   - `endpoints.py`: REST API endpoints for chat, dashboard, and export
   - `dependencies.py`: Authentication and session management

2. **Business Logic** (`backend/app/models/`)
   - `datasource.py`: Database connection and query execution
   - `query_generator.py`: Natural language to SQL conversion
   - `ai_model.py`: AI model interface (LLaMA, GPT4All, OpenAI)
   - `dashboard_manager.py`: Chart and table data preparation
   - `user_session.py`: Session management and conversation history

3. **Services** (`backend/app/services/`)
   - `preprocessing.py`: NLP preprocessing utilities
   - `export.py`: Data export functionality (CSV, JSON)

4. **Core Infrastructure** (`backend/app/core/`)
   - `config.py`: Application configuration
   - `logging.py`: Logging setup and configuration

5. **Database Layer** (`backend/app/db/`)
   - `database.py`: Database connection management
   - `models.py`: SQLAlchemy models (for future extensions)

### Frontend Architecture (React)

#### Component Structure

```
src/
├── components/
│   ├── Header.jsx              # Navigation header
│   ├── Footer.jsx              # Footer component
│   ├── ChatBox/                # Chat interface
│   │   ├── ChatBox.jsx         # Main chat container
│   │   ├── MessageList.jsx     # Message display
│   │   └── InputArea.jsx       # Message input
│   ├── Dashboard/              # Dashboard components
│   │   ├── Dashboard.jsx       # Main dashboard
│   │   ├── TableComponent.jsx  # Data tables
│   │   └── GraphComponent.jsx  # Charts and graphs
│   └── Filters/                # Filter controls
│       └── FilterControls.jsx  # Data filtering UI
├── styles/                     # SCSS styles
│   ├── main.scss              # Main styles
│   └── variables.scss         # SCSS variables
└── utils/                     # Utility functions
    └── api.js                 # API communication
```

### Data Flow

1. **User Query Flow**
   ```
   User Input → Frontend → API Endpoint → Query Processing → AI Analysis → Dashboard Generation → Frontend Display
   ```

2. **Data Query Flow**
   ```
   Natural Language → Preprocessing → SQL Generation → Database Query → Results → AI Insights → Visualization
   ```

## Technology Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: SQLite (with SQLAlchemy for ORM)
- **AI Models**: LLaMA, GPT4All, OpenAI API
- **Data Processing**: Pandas, NumPy
- **NLP**: NLTK (for preprocessing)
- **Export**: Built-in CSV/JSON support

### Frontend
- **Framework**: React 18
- **Styling**: SCSS with CSS Variables
- **Charts**: Chart.js with react-chartjs-2
- **Build Tool**: Create React App
- **State Management**: React Hooks

### Development Tools
- **Version Control**: Git
- **Package Management**: pip (backend), npm (frontend)
- **Testing**: pytest (backend), Jest (frontend)
- **Documentation**: Markdown files

## Security Considerations

1. **API Security**
   - Bearer token authentication
   - CORS configuration
   - Input validation and sanitization

2. **Data Security**
   - SQL injection prevention through parameterized queries
   - Secure credential management
   - Session timeout handling

3. **Frontend Security**
   - XSS prevention through React's built-in sanitization
   - Secure API communication over HTTPS

## Performance Considerations

1. **Backend Optimization**
   - Database connection pooling
   - Query result caching
   - Asynchronous processing for AI models

2. **Frontend Optimization**
   - Code splitting and lazy loading
   - Efficient re-rendering with React.memo
   - Chart virtualization for large datasets

## Scalability

1. **Horizontal Scaling**
   - Stateless API design
   - External session storage (Redis)
   - Load balancer support

2. **Database Scaling**
   - Support for PostgreSQL/MySQL
   - Read replicas for analytics queries
   - Query optimization and indexing

## Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   Load Balancer │    │   CDN           │
│   (nginx)       │    │   (CloudFlare) │
└─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   Web Server    │    │   AI Model      │
│   (React)       │    │   Service       │
└─────────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┐    ┌─────────────────┐
│   API Server    │────│   Database      │
│   (FastAPI)     │    │   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘
```

## Monitoring and Logging

1. **Application Logs**
   - Structured logging with context
   - Log aggregation and analysis
   - Error tracking and alerting

2. **Performance Monitoring**
   - API response times
   - Database query performance
   - User session analytics

## Future Enhancements

1. **Advanced AI Features**
   - Multi-modal queries (charts, images)
   - Predictive analytics
   - Automated report generation

2. **Enhanced Visualization**
   - 3D charts and interactive maps
   - Real-time data streaming
   - Custom dashboard builder

3. **Enterprise Features**
   - Multi-tenant architecture
   - Role-based access control
   - Audit trails and compliance