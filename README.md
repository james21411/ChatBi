# ChatBI - Interactive Business Intelligence Dashboard

ChatBI is a modern, AI-powered business intelligence platform that allows users to interact with their data through natural language queries. Built with a FastAPI backend and React frontend, it provides an intuitive interface for data analysis, visualization, and insights generation.

## Features

- **Natural Language Queries**: Ask questions about your data in plain English
- **Interactive Dashboard**: Dynamic charts and tables powered by Plotly
- **Real-time Chat Interface**: Conversational AI assistant for data exploration
- **Multiple Data Sources**: Support for CSV, databases, and APIs
- **Export Capabilities**: Export results to CSV/JSON formats
- **User Sessions**: Persistent conversation history and context

## Architecture

### Backend (FastAPI)
- **main.py**: Application entry point
- **api/endpoints.py**: REST API endpoints
- **models/**: Core business logic classes
  - DataSource: Database connections and queries
  - QueryGenerator: Natural language to SQL conversion
  - AIModel: AI model interface (LLaMA/GPT4All)
  - DashboardManager: Chart and table preparation
  - UserSession: Session management
- **services/**: Auxiliary services for preprocessing and export

### Frontend (React + Tailwind + SCSS)
- **App.jsx**: Main application component
- **components/**: Reusable UI components
  - ChatBox: Chat interface
  - Dashboard: Data visualization container
  - Filters: Data filtering controls
- **utils/api.js**: API communication utilities

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Start both backend and frontend servers
2. Open your browser to `http://localhost:3000`
3. Upload or connect to your data source
4. Start asking questions in natural language!

## API Documentation

Once the backend is running, visit `http://localhost:8000/docs` for interactive API documentation.

## Development

### Project Structure
```
ChatBI/
├── backend/          # FastAPI backend
├── frontend/         # React frontend
├── data/            # Sample data files
├── models/          # AI models
├── docs/            # Documentation
├── tests/           # Test suites
└── README.md        # This file
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Roadmap

- [ ] Multi-language support
- [ ] Advanced visualization options
- [ ] Real-time data streaming
- [ ] User authentication and permissions
- [ ] Plugin system for custom data connectors# ChatBi
