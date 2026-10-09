# FC Guide ⚽

A full-stack FC Mobile player explorer and squad-building application that helps users discover player cards, search and filter players, compare their stats, manage favourites, and build their dream squad.

Built using **HTML, CSS, Vanilla JavaScript, Node.js, Express.js, and MongoDB Atlas**.

## Features

### Player Explorer
- Browse FC Mobile player cards and dedicated player profile pages.
- Search players by name, nickname, or nation.
- Filter players by position.
- Sort players by rating or name.
- View player information, reviews, pros, and cons.

### Player Comparison
- Compare two players side by side to evaluate their attributes and ratings.

### Squad Builder
- Build and manage an eleven-player squad.
- Save squad selections for individual user accounts.
- Persist squad data using MongoDB.

### Favourites
- Add and remove favourite players.
- Maintain user-specific favourite lists.

### User Authentication
- User registration and login.
- Password hashing using `bcrypt`.
- JWT-based authentication for protected API endpoints.
- Token verification through authentication middleware.

### Admin Panel
- Dedicated admin interface for managing player data.
- Role-based access control to restrict administrative operations.

### User Interface
- Responsive design using HTML and CSS.
- Interactive features implemented with Vanilla JavaScript.
- Accessible controls and reduced-motion support.
- Testimonial carousel with user-controlled playback.
- Optimized local image assets.

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | JSON Web Tokens (JWT) |
| Password Security | bcrypt |
| API Communication | REST APIs, Fetch API |
| Version Control | Git, GitHub |
| Deployment | Vercel (frontend), Render (backend) |

## Architecture

The application follows a client-server architecture.

```text
Frontend
HTML + CSS + JavaScript
        |
        | HTTP requests using Fetch API
        v
Express.js Backend
        |
        v
Routes
        |
        v
Controllers
        |
        v
Mongoose Models
        |
        v
MongoDB Atlas
```

The frontend communicates with the backend through REST API endpoints. The backend processes requests, interacts with MongoDB through Mongoose, and returns JSON responses to update the interface.

Protected operations use JWT authentication to identify the logged-in user and restrict access to authorized features.

## Project Structure

```text
FC-Guide/
├── index.html
├── style.css
├── script.js
├── login.html
├── login.js
├── register.html
├── register.js
├── admin.html
├── admin.js
├── player.js
├── players/
├── images/
└── server/
    ├── server.js
    ├── package.json
    ├── config/
    │   └── db.js
    ├── models/
    │   ├── Player.js
    │   └── User.js
    ├── routes/
    │   ├── playerRoutes.js
    │   └── userRoutes.js
    ├── controllers/
    └── middleware/
```

## Running Locally

### Prerequisites
- Node.js and npm
- A MongoDB Atlas database
- Git (optional)

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd FC-Guide
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `server` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```

Replace the placeholder values with your actual configuration. Never commit your `.env` file or expose your database credentials and JWT secret.

### 4. Start the backend

From the `server` directory, run:

```bash
npm start
```

The backend should start on the configured port, using port `3000` if no `PORT` environment variable is set.

### 5. Open the frontend

Use the VS Code Live Server extension to serve `index.html`, or use another local development server.

Ensure the frontend API URLs point to the running backend before testing API-dependent features.

## Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

The backend uses environment variables for configuration, allowing it to run in local and production environments.

## Future Improvements

- Improve session handling and automatic recovery from expired JWTs.
- Add pagination for large player collections.
- Validate squad formations and positional limits.
- Add automated API, accessibility, and interface tests.
- Improve API error handling and input validation.
- Add live player-card prices and statistics from external APIs.

## Author

**Adivya Singh**

Developed as a portfolio project to explore full-stack web development, REST API design, database integration, authentication, and deployment.
