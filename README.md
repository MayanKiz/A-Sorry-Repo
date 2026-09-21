 # I'm Sorry

An interactive apology website built with Next.js, React, Framer Motion, and Tailwind CSS. It guides visitors through a small animated story with diary entries, an apology letter, interactive forgiveness questions, local music, and a gift reveal.

## Features

- Animated multi-step apology experience
- Starry background and Framer Motion page transitions
- Local GIF, image, and audio assets from `public/`
- Background music toggle
- Interactive forgiveness and friendship questions
- Optional Telegram notifications for submitted answers
- Responsive layout for desktop and mobile screens

## Tech Stack

- Next.js 16 with the App Router
- React 19
- Framer Motion
- Lucide React
- Tailwind CSS 4

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

```bash
npm install
```

### Environment variables

Telegram notifications are optional. To enable them, create a `.env.local` file in the project root:

```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

Keep these values private. They are read only by the server-side API route at `/api/telegram`.

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run the configured lint command |

## Project Structure

```text
src/
	app/
		page.jsx              # Main page state and experience flow
		layout.js             # Root layout and metadata
		globals.css           # Global styles
		api/telegram/route.js # Optional Telegram notification endpoint
	components/
		OpeningPage.jsx
		DiaryPage.jsx
		ApologyPage.jsx
		LetterPage.jsx
		HugPage.jsx
		GiftPage.jsx
		last.jsx
		MusicPlayer.jsx
		StarryBackground.jsx
public/
	audio/                  # Background music and voice note
	gifs/                   # Animated visual assets
	images/                 # Image assets
```

The main experience is controlled by `src/app/page.jsx`, which switches between the individual page components without changing the browser route.

## Deployment

The project can be deployed to any platform that supports Next.js, including Vercel:

```bash
npm run build
npm run start
```

When deploying, add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` to the hosting provider's server-side environment variables if Telegram notifications are required.

## Customization

- Edit the page components in `src/components/` to change the story and interaction flow.
- Replace files in `public/audio/`, `public/gifs/`, or `public/images/` to use different media.
- Update the metadata in `src/app/layout.js` to change the page title and description.


