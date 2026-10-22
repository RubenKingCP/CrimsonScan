# CrimsonScan: folder structure and why

This is a starting skeleton. Every file has a one-line comment that says what it is for. The wiring files are written out in full: `lib/api.ts`, `middleware.ts`, `app.js`, `db.js`, `requireAuth.js`, the two models, `api/index.js` and `docker-compose.yml`. The rest are empty functions for you to fill in.

```
crimsonscan/
├── client/         Next.js frontend        → Vercel project 1
├── server/         Express API             → Vercel project 2
└── scanner-host/   ZAP + Semgrep (Docker)  → DigitalOcean droplet
```

## Why three top-level folders

Each folder is deployed to a different place, so the folder structure matches the architecture. Anyone opening the repo can see the client–server split straight away. That split is something you want to point to in the pitch, and it keeps secrets out of the browser. The scanners get their own folder because they can't run on Vercel: a scan takes minutes and Vercel functions stop after seconds.

## client/

| Part | Why it's there |
|---|---|
| `src/app/` (App Router) | One folder per URL, so the structure is the site map. `layout.tsx` is written once and wraps every page. |
| `page.tsx`, `login/`, `dashboard/`, `scans/[id]/` | One folder for each screen in the mock-ups. `[id]` is a dynamic route, so one page file serves every scan. |
| `components/` | Pieces that are reused, like `FindingCard`, `SeverityBadge` and `CodeSnippet`. Pages stay short, and this is the "component-based" architecture. |
| `components/ui/` | Kept separate for the shadcn/ui components, which you add with `npx shadcn add button`. Generic UI stays apart from CrimsonScan-specific components. |
| `lib/api.ts` | The **only** place that calls the server. If the server URL or the auth changes, you change one file. It also always sends the cookie with `credentials: "include"`. |
| `middleware.ts` | Redirects users who aren't logged in before the page loads, so they don't see protected pages flash on screen. The server still does the real check. |
| `tailwind.config.ts` | Defines the crimson brand colour once, for every component to use. |
| `.env.example` | Holds only the public server URL. The client never holds a secret. |

## server/

| Part | Why it's there |
|---|---|
| `src/app.js` | Sets up the app in one place: security headers (helmet), CORS for your client only, cookies, routes and the error handler. |
| `src/config/db.js` | Caches the Mongoose connection globally. Without that, every serverless request would open a new connection and Atlas's free tier would run out. |
| `middleware/requireAuth.js` | Login is checked once here and reused on every protected route, rather than repeated in each controller. |
| `middleware/errorHandler.js` | Every error reaches one handler, so users get clean messages and stack traces never leak. |
| `modules/` | The modular monolith. Each feature (auth, users, scans, github, scanner, checks, ai) has its own folder and talks to the others only through their service functions. It's one deploy, but it can be split up later. |
| `*.routes.js` / `*.controller.js` / `*.service.js` | Layers: routes map URLs, controllers handle HTTP, services hold the logic. The logic can be tested without Express, and each file stays small. |
| `users/user.model.js` | The User references its scans by id, because a user can have many scans that grow over time. |
| `scans/scan.model.js` | The findings are **embedded** in the scan. The app always reads a scan together with its findings, so that's one database read. It's also the natural MongoDB design the course teaches. |
| `github/`, `scanner/`, `ai/` | Each outside service sits behind one module. If you switch Gemini for Groq, or move the droplet, only that one file changes. |
| `checks/quickChecks.js` | Your own instant checks give results while ZAP is still running, and they show code you wrote yourself, not only tools. |
| `api/index.js` + `vercel.json` | This is how Express runs on Vercel. `vercel.json` sends every path to `api/index.js`, which connects to the database and passes the request to the Express app. |
| `src/server.local.js` | Runs the same app on port 4000 on your laptop for development. |
| `.env.example` | Lists every secret the server needs. The real `.env` is in `.gitignore`, and on Vercel these go under Environment Variables. |

## scanner-host/

| Part | Why it's there |
|---|---|
| `docker-compose.yml` | One command (`docker compose up -d`) starts ZAP and the Semgrep runner on the droplet. `restart: always` brings them back after a crash or reboot. |
| `semgrep-runner/server.js` | Semgrep is a command-line tool with no API of its own. This small service gives it one: it checks the API key, downloads the repo, runs the OWASP rules and returns JSON. |
| `semgrep-runner/Dockerfile` | Packs Semgrep and Node into one image, so the droplet only needs Docker installed. |
| `.env.example` | Holds the API keys that the server must send. Without them, anyone could use your scanner. |

## Root

| Part | Why it's there |
|---|---|
| `.gitignore` | Keeps `node_modules`, build output and every `.env` out of GitHub. |
| One repo, three folders | One place for the whole project, and one link to give your teacher. On Vercel you set each project's **Root Directory** to `client` or `server`. |

## Next steps

1. In `client/`, run `npx create-next-app@latest .` and keep these files, then run `npx shadcn@latest init`.
2. In `server/`, run `npm install`, copy `.env.example` to `.env` and fill it in, then run `npm run dev`.
3. On the droplet, copy `scanner-host/`, fill in `.env`, then run `docker compose up -d`.
