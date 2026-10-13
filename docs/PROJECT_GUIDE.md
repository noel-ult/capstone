# SkillSwap development guide

A full-stack skill-sharing application with account signup/login, profiles, skill listings, and search. React talks to an Express API backed by MongoDB.

## Setup

Create `backend/.env`:

```dotenv
MONGO_URI=mongodb://127.0.0.1:27017/skillswap_demo
JWT_SECRET=replace-with-a-long-random-development-secret
PORT=5000
NODE_ENV=development
```

Start MongoDB, then from the repository root:

```sh
npm install
npm run install-all
npm run dev
```

The root `dev` script uses concurrently to start backend and frontend. They can also be started separately with `npm run dev-backend` and `npm run dev-frontend`. The API defaults to port 5000 and the React development server to 3000. Inspect the frontend's API calls/proxy settings before changing those origins.

## Architecture and API

`backend/server.js` connects to MongoDB before listening. `/api/users` mounts signup, login, profile, and user-search routes; `/api/skills` mounts skill creation, listing, owned listings, search, updates, deletion, and category statistics. `/api/health` reports service status. JWT authentication uses `Authorization: Bearer <token>` and looks up the user on protected requests; generated tokens expire in 30 days.

`backend/models/User.js` and `Skill.js` define persisted documents. `frontend/src/context/AuthContext.js` manages frontend authentication state, and `PrivateRoute.js` guards client pages. Server authorization remains the enforcement point. Socket.IO is a dependency, but the server entry point does not initialize a Socket.IO service; do not assume realtime messaging exists.

## Checks and deployment

Check signup, login, creating/editing an owned skill, search, and an unauthenticated protected request using disposable data. Backend `npm test` is a placeholder, and no frontend test files are tracked. Build the frontend with root `npm run build`; with `NODE_ENV=production`, the Express server serves `frontend/build` and provides a page fallback. Configure MongoDB, JWT secret, and the frontend API origin for the deployment.

## More documentation

- [Source, command, and configuration reference](REFERENCE.md)
- [Contributing](../CONTRIBUTING.md)
