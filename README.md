Project Explanation

This project is designed to handle authentication, user management, document management, and interactions with a Python backend. It follows a microservices architecture where a NestJS-based main application interacts with a separate ingestion microservice and a Python service.

Step 1: Installing Required Dependencies

To support authentication, user management, and file uploads, we need the following libraries:

Authentication

JWT for authentication

bcrypt for password hashing

Passport.js for authentication strategies

npm install @nestjs/jwt passport passport-jwt bcryptjs @nestjs/passport
npm install --save-dev @types/bcryptjs

Database (PostgreSQL with TypeORM)

npm install pg typeorm @nestjs/typeorm

Input Validation

npm install class-validator class-transformer

File Upload Support

npm install multer

These dependencies help structure authentication, database interactions, and file management.

Step 2: Authentication APIs (Register, Login, Logout)

User Registration: Users can sign up by providing an email and password.

User Login: Upon successful authentication, users receive a JWT token.

User Logout: The token is removed on the client side (there’s no server-side logout mechanism for JWT by default).

Authentication is implemented using NestJS guards and strategies.

Step 3: User Management (Roles & Permissions)

The system includes Role-Based Access Control (RBAC) with predefined roles such as:

Admin – Full control over users and documents.

Editor – Can create and modify documents.

Viewer – Can only read documents.

The RolesGuard is applied globally to protect routes and ensure only authorized users access specific functionalities.

Step 4: Document Management (CRUD & Uploads)

Create, Read, Update, Delete (CRUD) operations for documents.

File uploads using Multer (stored locally or in cloud storage like AWS S3 if required in the future).

A dedicated DocumentModule handles document-related operations.

Step 5: Ingestion Trigger API

This API initiates a process where a document is sent for ingestion (processing) to the Python backend.

Endpoint: POST /ingestion/trigger/:documentId

Uses NestJS HttpService to communicate with the Python backend.

Handles errors gracefully and logs issues if the Python backend is unreachable.

Modules Used:

npm install @nestjs/axios

The HttpModule from @nestjs/axios is used for API calls.

Step 6: Implementing Microservices for Ingestion

Since the ingestion process is resource-intensive, we use NestJS Microservices to separate it from the main application. This allows better scalability and fault isolation.

Setting Up the Ingestion Microservice

Step 1: Create a new NestJS service:

nest new ingestion-service

Step 2: Install microservices support:

npm install @nestjs/microservices

Step 3: Generate required modules and controllers:

nest g module ingestion
nest g service ingestion
nest g controller ingestion

How It Works

The main app (port 5000) sends an ingestion request to the ingestion microservice (port 4001) via a TCP connection.

The ingestion microservice then communicates with the Python backend to process the document.

Once processing is complete, the Python backend sends a response back to the ingestion microservice, which then notifies the main app.