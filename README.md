# Microservices Fitness AI Application

A comprehensive fitness tracking application built with a microservices architecture, featuring AI-powered workout recommendations and activity analysis.

## 📋 Table of Contents
- [Architecture Overview](#architecture-overview)
- [Services](#services)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Service Configuration](#service-configuration)
- [API Documentation](#api-documentation)
- [Frontend Application](#frontend-application)
- [Development Workflow](#development-workflow)
- [Monitoring and Health Checks](#monitoring-and-health-checks)
- [Contributing](#contributing)


## 🚀 Services

### Core Infrastructure Services

#### 1. **Eureka Discovery Server** (`eureka/`)
- **Purpose**: Service registry and discovery
- **Port**: 8761
- **Technology**: Spring Cloud Netflix Eureka

#### 2. **Config Server** (`configserver/`)
- **Purpose**: Centralized configuration management
- **Port**: 8888
- **Technology**: Spring Cloud Config
- **Configuration Files**: Stores configurations for all microservices

#### 3. **API Gateway** (`gateway/`)
- **Purpose**: Single entry point for all client requests
- **Port**: 8080
- **Technology**: Spring Cloud Gateway
- **Features**: 
  - Request routing
  - OAuth2 resource server integration
  - Load balancing
  - CORS handling

### Business Services

#### 4. **User Service** (`userservice/`)
- **Purpose**: User management and authentication
- **Port**: 8081
- **Database**: PostgreSQL
- **Features**:
  - User registration and profile management
  - Authentication integration
  - User preferences

#### 5. **Activity Service** (`activityservice/`)
- **Purpose**: Fitness activity tracking and management
- **Port**: 8082
- **Database**: PostgreSQL
- **Features**:
  - Activity logging (workouts, exercises, etc.)
  - Activity history and analytics
  - Performance tracking

#### 6. **AI Service** (`aiservice/`)
- **Purpose**: AI-powered fitness recommendations and analysis
- **Port**: 8083
- **Database**: MongoDB
- **AI Provider**: Google Gemini AI
- **Features**:
  - Workout recommendations
  - Performance analysis
  - Personalized fitness insights
  - Message queue integration (RabbitMQ)

### Frontend Application

#### 7. **Fitness App Frontend** (`fitness-app-frontend/`)
- **Purpose**: User interface for the fitness application
- **Port**: 5173 (development)
- **Technology**: React with Vite
- **Features**:
  - OAuth2 PKCE authentication
  - Activity management interface
  - Real-time data visualization
  - Responsive design with Material-UI

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 3.5.6
- **Java Version**: 25
- **Spring Cloud**: 2025.0.0
- **Build Tool**: Maven
- **Databases**: 
  - PostgreSQL (User & Activity services)
  - MongoDB (AI service)
- **Message Queue**: RabbitMQ
- **API Gateway**: Spring Cloud Gateway
- **Service Discovery**: Eureka
- **Configuration**: Spring Cloud Config

### Frontend
- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **UI Library**: Material-UI 7.3.4
- **State Management**: Redux Toolkit
- **Authentication**: OAuth2 PKCE
- **HTTP Client**: Axios

### AI Integration
- **AI Provider**: Google Gemini 2.5 Flash
- **API Integration**: WebFlux for reactive programming

## 📋 Prerequisites

- **Java 25** or higher
- **Node.js 18** or higher
- **PostgreSQL 12** or higher
- **MongoDB 4.4** or higher
- **RabbitMQ 3.8** or higher
- **Maven 3.8** or higher
- **Git**

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd microservices-fitness-ai
```

### 2. Environment Setup

#### Backend Services
Each service requires Java 25 and Maven. The project uses Spring Cloud Config for centralized configuration.

#### AI Service Environment Variables
Create a `.env` file in the `aiservice/` directory:
```env
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=
GEMINI_API_KEY=your_gemini_api_key_here
```

#### Database Setup
1. **PostgreSQL**: Create databases for `userservice` and `activityservice`
2. **MongoDB**: Ensure MongoDB is running for the AI service
3. **RabbitMQ**: Set up RabbitMQ for message queuing

### 3. Start Services (Recommended Order)

#### Option 1: Using VS Code Tasks
The project includes predefined VS Code tasks for easy service management:

```bash
# Start core infrastructure services
Task: "Start Core Services" (runs Eureka + Config Server in parallel)

# Start business services
Task: "Start Microservices" (runs User, Activity, and AI services in parallel)

# Start API Gateway
Task: "Run API Gateway"
```

#### Option 2: Manual Startup
```bash
# 1. Start Eureka Discovery Server
cd eureka
mvn clean install -DskipTests -q && mvn spring-boot:run -q

# 2. Start Config Server
cd ../configserver
mvn clean install -DskipTests -q && mvn spring-boot:run -q

# 3. Start User Service
cd ../userservice
mvn clean install -DskipTests -q && mvn spring-boot:run -q

# 4. Start Activity Service
cd ../activityservice
mvn clean install -DskipTests -q && mvn spring-boot:run -q

# 5. Start AI Service
cd ../aiservice
mvn clean install -DskipTests -q && mvn spring-boot:run -q

# 6. Start API Gateway
cd ../gateway
mvn clean install -DskipTests -q && mvn spring-boot:run -q
```

### 4. Start Frontend Application
```bash
cd fitness-app-frontend
npm install
npm run dev
```

## ⚙️ Service Configuration

### Port Configuration
- **Eureka Server**: 8761
- **Config Server**: 8888
- **API Gateway**: 8080
- **User Service**: 8081
- **Activity Service**: 8082
- **AI Service**: 8083
- **Frontend**: 5173

### Health Check Endpoints
Each service exposes actuator endpoints:
- Health: `http://localhost:<port>/actuator/health`
- Info: `http://localhost:<port>/actuator/info`

### Service Discovery
All services register with Eureka at: `http://localhost:8761`

## 📚 API Documentation

### API Gateway Routes
All API requests should go through the gateway at `http://localhost:8080`

### User Service Endpoints
- `GET /api/users` - Get user list
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Activity Service Endpoints
- `GET /api/activities` - Get user activities
- `GET /api/activities/{id}` - Get activity by ID
- `POST /api/activities` - Log new activity
- `PUT /api/activities/{id}` - Update activity
- `DELETE /api/activities/{id}` - Delete activity

### AI Service Endpoints
- `POST /api/ai/recommendations` - Get workout recommendations
- `POST /api/ai/analysis` - Analyze performance data
- `GET /api/ai/insights/{userId}` - Get personalized insights

## 🎨 Frontend Application

### Features
- **OAuth2 Authentication**: Secure login with PKCE flow
- **Activity Management**: Create, view, and manage fitness activities
- **Real-time Updates**: Live data synchronization
- **Responsive Design**: Mobile-friendly interface
- **Material-UI Components**: Modern and accessible UI

### Available Routes
- `/` - Home page (redirects to activities if authenticated)
- `/activities` - Activities list page
- `/activities/:id` - Activity detail page

### Development Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔧 Development Workflow

### Building All Services
```bash
# Build all backend services
for service in eureka configserver userservice activityservice aiservice gateway; do
  cd $service && mvn clean install -DskipTests && cd ..
done

# Build frontend
cd fitness-app-frontend && npm run build
```

### Running Tests
```bash
# Run tests for a specific service
cd <service-name>
mvn test

# Run frontend tests
cd fitness-app-frontend
npm test
```

### Docker Support
The config server includes a Dockerfile for containerization. To extend Docker support:

```bash
# Build Docker image for config server
cd configserver
docker build -t fitness-config-server .
```

## 📊 Monitoring and Health Checks

### Service Health
Monitor all services through:
- **Eureka Dashboard**: `http://localhost:8761`
- **Individual Health Endpoints**: `http://localhost:<port>/actuator/health`

### Logging
Each service uses Spring Boot's default logging configuration. Logs can be found in the console output or configured to write to files.

### Metrics
Spring Boot Actuator provides metrics endpoints:
- `http://localhost:<port>/actuator/metrics`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow Java coding conventions for backend services
- Use ESLint configuration for frontend code
- Write meaningful commit messages
- Include tests for new features

### Development Guidelines
- Ensure all services can start independently
- Maintain backward compatibility in API changes
- Update documentation for new features
- Test integration between services

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Service Discovery Issues**
   - Ensure Eureka server is running before starting other services
   - Check service registration at `http://localhost:8761`

2. **Configuration Issues**
   - Verify Config Server is running and accessible
   - Check configuration files in `configserver/src/main/resources/config/`

3. **Database Connection Issues**
   - Ensure PostgreSQL and MongoDB are running
   - Verify connection strings in configuration files

4. **AI Service Issues**
   - Check Gemini API key configuration
   - Verify RabbitMQ is running

5. **Frontend Issues**
   - Ensure API Gateway is running
   - Check OAuth2 configuration
   - Verify CORS settings

### Getting Help
- Check service logs for detailed error messages
- Verify all prerequisites are installed and running
- Ensure proper startup order of services

---

**Happy Coding! 🚀**