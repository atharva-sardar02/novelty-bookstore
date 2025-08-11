# 📚 Novelty Bookstore

A full-stack bookstore management and shopping web application built with **React (TypeScript)** for the frontend and **Java JSP/Servlet + Gradle** for the backend.  

---

## 🚀 Features

- **Product Browsing:** View books with detailed descriptions, prices, and availability.
- **Cart & Checkout:** Add/remove items, update quantities, and proceed to secure checkout.
- **User Authentication:** Login/register functionality with secure password storage.
- **State & Session:** `Context/Reducer` + `localStorage` persistence.
- **Routing:** Protected routes for checkout and account pages.
- **API Layer:** Axios-based API calls ([`client/src/services/api.ts`](client/src/services/api.ts)).
- **Accessibility:** Keyboard-friendly navigation, ARIA labels, loading/empty states.

---

## 🛠 Tech Stack

**Frontend**
- React (CRA + TypeScript), React Router, Context API/Reducers, Axios

**Styling**
- CSS / TailwindCSS (depending on customization)

**Backend**
- Java 17+, Gradle, JSP, Servlets, DAO pattern

**Database**
- H2 / MySQL / PostgreSQL (configurable in [`server/src/main/resources`](server/src/main/resources))

**Tooling**
- ESLint, Prettier, Jest/RTL (frontend), JUnit (backend)

---

## 📂 Repository Structure

```plaintext
├── client/                      # CRA + TypeScript frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── reducers/
│   │   ├── utils/
│   │   ├── services/            # API calls
│   │   ├── App.tsx
│   │   └── index.tsx
├── server/                      # Java JSP/Servlet backend
│   ├── src/main/java/            # Servlets, services, DAO, models
│   ├── src/main/resources/       # Application config
│   ├── src/main/webapp/           # JSP + static assets
├── .gitignore
├── build.gradle
├── settings.gradle
├── gradle/
└── README.md


🖥 Running Locally
1️⃣ Backend (Java JSP/Servlet)
bash
Copy code
cd server

# If using Jetty Plugin
./gradlew jettyRun          # Mac/Linux
gradlew.bat jettyRun        # Windows

# OR if packaging a WAR
./gradlew build
2️⃣ Frontend (React + TypeScript)
bash
Copy code
cd client
npm install
npm start
⚙ Configuration
Database: Update application.properties in server/src/main/resources
Example for MySQL:

properties
Copy code
spring.datasource.url=jdbc:mysql://localhost:3306/bookstore
spring.datasource.username=root
spring.datasource.password=yourpassword
API URL: Update API_BASE_URL in client/src/services/api.ts

📸 Screenshots
Add screenshots of your app here for a better README presentation.