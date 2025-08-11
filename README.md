
# Novelty Bookstore — Final Project

Full-stack bookstore built with **React (Create React App, TypeScript)** on the frontend and a **Java (Gradle, JSP/Servlet)** web app on the backend. Users can browse a catalog, view book details, add to cart, and complete a checkout transaction with client- and server-side validation.

---

## ✨ Features

- **Catalog & Search:** list, sort, and filter by title/author/genre/price  
- **Book Detail:** description, price, stock, ratings  
- **Cart & Checkout:** add/remove/update items, subtotal/tax/total, order confirmation  
- **Validation:** client-side (forms, qty, stock) + server-side (stock & totals recheck)  
- **State & Session:** Context/Reducer + `localStorage` persistence  
- **Routing:** React Router (protected checkout flow)  
- **API Layer:** Axios/fetch via `client/src/services/api.(ts|js)`  
- **Accessibility:** keyboard friendly, aria labels, loading/empty states

---

## 🧱 Tech Stack

- **Frontend:** React (CRA + TypeScript), React Router, Context API/Reducers, Axios  
- **Styling:** CSS / Tailwind (depending on your implementation)  
- **Backend:** Java 17+, Gradle, JSP, Servlets, DAO pattern  
- **Database:** H2/MySQL/PostgreSQL (configure in `server/src/main/resources`)  
- **Tooling:** ESLint/Prettier, Jest/RTL (front), JUnit (back)

---

## 📂 Repository Structure

.
├─ client/ # CRA + TypeScript frontend
│ ├─ public/
│ ├─ src/
│ │ ├─ assets/ components/ contexts/ reducers/ utils/ services/
│ │ ├─ App.tsx index.tsx ...
│ ├─ package.json tsconfig.json
│
├─ server/ # Java JSP/Servlet backend (Gradle)
│ ├─ src/main/java/ # servlets, services, dao, models
│ ├─ src/main/resources/ # application config
│ ├─ src/main/webapp/ # JSP + static assets
│ ├─ build.gradle settings.gradle
│
├─ gradle/ gradlew gradlew.bat # Gradle wrapper
├─ .gitignore
└─ README.md

yaml
Copy code

---

## ⚙️ Running Locally

### 1) Backend (Java JSP/Servlet)

```bash
cd server
# If using Jetty plugin:
./gradlew jettyRun     # Windows: gradlew.bat jettyRun
# OR if packaging a WAR:
./gradlew build
# then deploy build/libs/*.war to Tomcat
Default URL: http://localhost:8080

Backend config (server/src/main/resources/application.properties):

properties
Copy code
server.port=8080

# H2 example
spring.datasource.url=jdbc:h2:mem:bookstore;DB_CLOSE_DELAY=-1
spring.datasource.driverClassName=org.h2.Driver
spring.jpa.hibernate.ddl-auto=update

# MySQL example
# spring.datasource.url=jdbc:mysql://localhost:3306/bookstore
# spring.datasource.username=root
# spring.datasource.password=yourpassword
# spring.jpa.hibernate.ddl-auto=update
2) Frontend (CRA + TypeScript)
bash
Copy code
cd client
npm install
npm start
Default URL: http://localhost:3000

Set API base URL in client/.env.local:

bash
Copy code
REACT_APP_API_BASE_URL=http://localhost:8080/api
🔌 API Endpoints (example)
bash
Copy code
GET    /api/books
GET    /api/books/{id}
POST   /api/cart/checkout
🧭 Course Milestone Mapping
Project 2: HTML & CSS — static page views

Project 3: React Fundamentals — components, props/state

Project 4: DAO Pattern + REST — DAO, controllers, /api/books

Project 5: Fetch/Axios — API client, loading states

Project 6: State Management — Context/Reducers for cart

Project 7: Session Management — localStorage persistence

Project 8: Client-Side Validation — form checks in checkout

Project 9: Server-Side Validation — stock/totals checks

Project 10: Transaction — cart → checkout → confirmation

🧪 Testing
Backend (JUnit):

bash
Copy code
cd server
./gradlew test
Frontend (Jest + React Testing Library):

bash
Copy code
cd client
npm test
🚀 Deployment
Frontend (CRA)
Vercel/Netlify:

Project root: client

Build: npm run build

Publish dir: client/build

Env: REACT_APP_API_BASE_URL=https://your-api.example.com/api

GitHub Pages:

Add "homepage" in client/package.json

Use gh-pages package to deploy.

Backend
Deploy WAR to Tomcat/Jetty or use cloud hosts like Render, Railway, AWS.

📄 License
MIT (or your preferred license).

yaml
Copy code

---

**How to add in VS Code:**  
1. In VS Code **Explorer**, right-click your project root → **New File** → name it `README.md`.  
2. Paste the above content.  
3. Save.  
4. Commit & push:
```powershell
git add README.md
git commit -m "Add README.md"
git push

