# capstone source reference


Source reviewed: [`60cd87a2c616`](https://github.com/noel-ult/capstone/commit/60cd87a2c6164189939af2dc420d7b680aa2c6ba).

This reference records the checked-in source, scripts, configuration names, and route declarations. It is a navigation aid; service availability and successful test execution require separate verification.

## Package commands

Run each command in the directory containing its package manifest. A declared script is not necessarily a passing check; guides call out placeholders and known mismatches.

### backend/package.json

| Script | Shell command |
| --- | --- |
| `start` | `node server.js` |
| `dev` | `nodemon server.js` |
| `test` | `echo "Error: no test specified" && exit 1` |

Manifest: [backend/package.json](../backend/package.json).

### frontend/package.json

| Script | Shell command |
| --- | --- |
| `start` | `react-scripts start` |
| `build` | `react-scripts build` |
| `test` | `react-scripts test` |
| `eject` | `react-scripts eject` |

Manifest: [frontend/package.json](../frontend/package.json).

### package.json

| Script | Shell command |
| --- | --- |
| `install-backend` | `cd backend && npm install` |
| `install-frontend` | `cd frontend && npm install` |
| `install-all` | `npm run install-backend && npm run install-frontend` |
| `dev-backend` | `cd backend && npm run dev` |
| `dev-frontend` | `cd frontend && npm start` |
| `build` | `cd frontend && npm run build` |
| `start` | `cd backend && npm start` |
| `dev` | `concurrently "npm run dev-backend" "npm run dev-frontend"` |
| `heroku-postbuild` | `npm run install-all && npm run build` |

Manifest: [package.json](../package.json).

## Configuration names

Names below are declared by source or example files. Example-only entries may be stale; consult the linked reader and project guide before relying on them. Secret values are intentionally omitted.

| Name | Declared/read in |
| --- | --- |
| `JWT_SECRET` | [backend/middleware/auth.js](../backend/middleware/auth.js) |
| `MONGO_URI` | [backend/server.js](../backend/server.js) |
| `NODE_ENV` | [backend/server.js](../backend/server.js) |
| `PORT` | [backend/server.js](../backend/server.js) |

## HTTP route declarations

Paths are **as declared in each source file**. Router/blueprint mount prefixes from the entry point must be prepended; the project guide describes the active entry point and common prefixes. Alternate entry points (such as SQLite) are listed separately by file. Authentication, request bodies, and response schemas live in the linked handlers/models.

| Source | Method | Declared path | Handler |
| --- | --- | --- | --- |
| [backend/routes/skills.js](../backend/routes/skills.js) | POST | `/` | `` |
| [backend/routes/skills.js](../backend/routes/skills.js) | GET | `/` | `` |
| [backend/routes/skills.js](../backend/routes/skills.js) | GET | `/my` | `` |
| [backend/routes/skills.js](../backend/routes/skills.js) | GET | `/search` | `` |
| [backend/routes/skills.js](../backend/routes/skills.js) | GET | `/:id` | `` |
| [backend/routes/skills.js](../backend/routes/skills.js) | PUT | `/:id` | `` |
| [backend/routes/skills.js](../backend/routes/skills.js) | DELETE | `/:id` | `` |
| [backend/routes/skills.js](../backend/routes/skills.js) | GET | `/categories/stats` | `` |
| [backend/routes/users.js](../backend/routes/users.js) | POST | `/signup` | `` |
| [backend/routes/users.js](../backend/routes/users.js) | POST | `/login` | `` |
| [backend/routes/users.js](../backend/routes/users.js) | GET | `/profile` | `` |
| [backend/routes/users.js](../backend/routes/users.js) | PUT | `/profile` | `` |
| [backend/routes/users.js](../backend/routes/users.js) | GET | `/search` | `` |
| [backend/routes/users.js](../backend/routes/users.js) | GET | `/:id` | `` |
| [backend/server.js](../backend/server.js) | GET | `/api/health` | `` |
| [backend/server.js](../backend/server.js) | GET | `*` | `` |

## Existing documentation

Historical plans/reports describe their own revision; use current source when they disagree.

- [README.md](../README.md)

## Source and configuration map

Generated lockfiles, binary assets, compiled output, vendored dependencies, and cached bytecode are omitted. Test files remain listed so coverage can be located.

- [backend/middleware/auth.js](../backend/middleware/auth.js)
- [backend/middleware/validation.js](../backend/middleware/validation.js)
- [backend/models/Skill.js](../backend/models/Skill.js)
- [backend/models/User.js](../backend/models/User.js)
- [backend/package.json](../backend/package.json)
- [backend/routes/skills.js](../backend/routes/skills.js)
- [backend/routes/users.js](../backend/routes/users.js)
- [backend/server.js](../backend/server.js)
- [frontend/package.json](../frontend/package.json)
- [frontend/public/index.html](../frontend/public/index.html)
- [frontend/public/manifest.json](../frontend/public/manifest.json)
- [frontend/src/App.js](../frontend/src/App.js)
- [frontend/src/components/Login.js](../frontend/src/components/Login.js)
- [frontend/src/components/Navbar.js](../frontend/src/components/Navbar.js)
- [frontend/src/components/PrivateRoute.js](../frontend/src/components/PrivateRoute.js)
- [frontend/src/components/Signup.js](../frontend/src/components/Signup.js)
- [frontend/src/context/AuthContext.js](../frontend/src/context/AuthContext.js)
- [frontend/src/index.css](../frontend/src/index.css)
- [frontend/src/index.js](../frontend/src/index.js)
- [frontend/src/pages/AddSkill.js](../frontend/src/pages/AddSkill.js)
- [frontend/src/pages/AuthPage.js](../frontend/src/pages/AuthPage.js)
- [frontend/src/pages/Dashboard.js](../frontend/src/pages/Dashboard.js)
- [frontend/src/pages/EditSkill.js](../frontend/src/pages/EditSkill.js)
- [frontend/src/pages/Profile.js](../frontend/src/pages/Profile.js)
- [frontend/src/pages/Search.js](../frontend/src/pages/Search.js)
- [package.json](../package.json)
