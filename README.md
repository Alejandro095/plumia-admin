# PlumIA · Management Dashboard

**Web platform for shopping malls to manage their smart parking in real time.**

<p align="center">
  <img src="assets/visitors.png" alt="PlumIA dashboard showing the daily visitor log" width="900">
</p>

`plumia-admin` is the management dashboard of **PlumIA**, a smart parking gate system for shopping malls developed as my capstone graduation project for an engineering degree. It gives mall administrators full control over their parking operation: they can configure their parking spots and hourly rate, monitor occupancy and follow every visit of the day as it happens.

PlumIA replaces the traditional paper ticket with a fully contactless experience. Gates equipped with computer vision recognize each vehicle's license plate, a parking spot is assigned automatically and drivers receive all the information about their stay through a conversational assistant. This dashboard is where the mall manages the whole operation behind that experience.

## Highlights

- **Multi-tenant platform.** Each administrator signs up with their own mall and only has access to their own parking spots, rates and visitors.
- **Parking spot management.** Register spots with their GPS coordinates, check their status and remove them from the system.
- **Real-time occupancy.** Each spot shows whether it is available or occupied, based on the visits registered by the gates.
- **Live visitor log.** Daily record of every visit with driver, vehicle, assigned spot, entry and exit times, elapsed hours and status.
- **Rate configuration.** The hourly rate is set by each mall and used automatically to calculate the cost of every stay.
- **Secure authentication.** JWT sessions stored in HTTP-only cookies, hashed passwords and server-side validation on every form.
- **Server-side rendering.** Built with Astro in SSR mode and deployed as serverless functions on Vercel.

## System architecture

PlumIA is built as a distributed system made up of three components:

| Repository | Layer | Responsibility |
| --- | --- | --- |
| [plumia-rasp](https://github.com/Alejandro095/plumia-rasp) | Edge device | Raspberry Pi at the gate. License plate recognition with computer vision, barrier control, sensors and OLED display. |
| [plumia-bot](https://github.com/Alejandro095/plumia-bot) | Backend | REST API and conversational assistant. Manages visits and parking spot allocation, and notifies drivers in real time. |
| [plumia-admin](https://github.com/Alejandro095/plumia-admin) | Management | Web dashboard for mall administrators (this repository). Manages parking spots, rates and the visitor log. |

```
┌──────────────────────┐   license plate   ┌──────────────────────┐   notifications   ┌──────────────┐
│     Edge device      │ ────────────────▶ │      plumia-bot      │ ────────────────▶ │    Driver    │
│    (Raspberry Pi)    │                   │  REST API + chatbot  │ ◀──────────────── │  (Telegram)  │
│  ALPR · servo ·      │ ◀──────────────── │                      │     messages      └──────────────┘
│  sensors · OLED      │  visit / spots    └──────────┬───────────┘
└──────────────────────┘                              │
                                                      ▼
                                           ┌──────────────────────┐                   ┌──────────────┐
                                           │      PostgreSQL      │ ◀──────────────── │ plumia-admin │
                                           │       database       │                   │   (Astro)    │
                                           └──────────────────────┘                   └──────────────┘
```

The dashboard and the backend share the same PostgreSQL database. Changes made by the administrator, such as new parking spots or an updated rate, take effect immediately for the gates and the assistant.

## Features

### Parking spots

The **Spots** module is the core of the parking configuration:

| Column | Description |
| --- | --- |
| Spot | Identifier of the parking spot |
| Latitude / Longitude | GPS coordinates, sent to drivers as a map pin when the spot is assigned |
| Status | Available or occupied, updated in real time by the visits |
| Action | Remove the spot (only allowed while it is available) |

New spots are added from a modal form, and their coordinates are validated to be within valid latitude and longitude ranges.

<p align="center">
  <img src="assets/spots.png" alt="Parking spots module" width="900">
</p>

### Visitors

The **Visitors** module shows the activity of the day:

| Column | Description |
| --- | --- |
| Visitor | Driver's name, vehicle model and license plate |
| Spot | Parking spot assigned to the vehicle |
| Entry date | Time the vehicle entered the parking lot |
| Exit date | Time the vehicle left the parking lot |
| Hours | Duration of the stay, calculated in real time for ongoing visits |
| Status | In progress or finished |

<p align="center">
  <img src="assets/visitors.png" alt="Visitors module" width="900">
</p>

### Account and mall information

The **Information** module lets the administrator update their profile, the name of the mall, the hourly parking rate and their password.

<p align="center">
  <img src="assets/information.png" alt="Account and mall information module" width="900">
</p>

### Authentication

- Sign up creates both the administrator account and their mall in a single step.
- Passwords are stored as SHA-512 hashes, never in plain text.
- Sessions use signed JSON Web Tokens stored in `httpOnly`, `secure` and `sameSite=strict` cookies.
- Every dashboard page and API route verifies the session on the server.
- All forms are validated on the server with Zod schemas, returning descriptive error messages.

<p align="center">
  <img src="assets/sign-in.png" alt="Sign in page" width="700">
</p>

## Internal API

The dashboard exposes its own server-side endpoints, implemented as Astro API routes:

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/sign-up` | Creates an administrator account and its mall. |
| `POST` | `/api/auth/sign-in` | Authenticates the administrator and starts a session. |
| `POST` | `/api/auth/sign-out` | Ends the session. |
| `POST` | `/api/spots/create` | Registers a new parking spot. |
| `POST` | `/api/spots/delete/{id}` | Removes a parking spot. |
| `POST` | `/api/information/update/information` | Updates the administrator's profile, mall name and rate. |
| `POST` | `/api/information/update/password` | Updates the administrator's password. |

## Tech stack

**Management dashboard (this repository)**
- [Astro](https://astro.build/) (SSR) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) + [Flowbite](https://flowbite.com/) – UI components
- [Vercel Postgres](https://vercel.com/storage/postgres) – serverless PostgreSQL database
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) – session tokens
- [Zod](https://zod.dev/) – schema validation
- Day.js – date formatting
- Vercel – serverless deployment

**Backend**
- Node.js + TypeScript
- Express – REST API
- Telegraf – Telegram bot framework
- Joi – request validation

**Edge device**
- Python on Raspberry Pi
- YOLOv8 – license plate detection
- OpenCV – digital image processing
- EasyOCR – character recognition
- gpiozero + luma.oled – barrier, sensors and display

## Project structure

```
src/
├── pages/
│   ├── auth/               # Sign in and sign up pages
│   ├── dashboard/          # Spots, visitors and information modules
│   └── api/                # Server-side API routes
├── components/             # Navbar, sidebar, breadcrumb and footer
├── layouts/                # Base document and dashboard layout
├── controllers/            # Business logic
├── repositories/           # Data access with parameterized SQL queries
├── services/               # Authentication, JWT and password hashing
├── schemas/                # Zod validation schemas
├── types/                  # Domain types
└── utils/                  # Request parsing and error handling
```

## Getting started

Requirements: Node.js 18+ and a PostgreSQL database (Vercel Postgres).

1. Clone the repository and install the dependencies:

   ```bash
   git clone https://github.com/Alejandro095/plumia-admin.git
   cd plumia-admin
   npm install
   ```

2. Create a `.env.local` file from the example and fill in your database credentials and a secret key:

   ```bash
   cp .env.example .env.local
   ```

   ```env
   POSTGRES_URL="postgres://user:password@host:5432/database?sslmode=require"
   AUTH_SECRET="your-secret-key"
   ```

   The database schema is created from the [plumia-bot](https://github.com/Alejandro095/plumia-bot) repository with `npm run db:create`.

3. Start the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:4321](http://localhost:4321) and create an administrator account.

4. Build for production:

   ```bash
   npm run build
   ```

## Author

**Javier Alejandro Monsivais Tovar**
