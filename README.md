# Iridium

A free, simple, open-source music app made by **sloes** <3

Iridium lets you search for music and listen to songs by combining the **iTunes Search API** with **YouTube**. It uses iTunes for music metadata and artwork, while YouTube is used to find and play the corresponding tracks.

## Features

* 🎵 Search for songs and artists
* 🔎 Music metadata powered by the iTunes Search API
* ▶️ Finds songs through YouTube
* 🖼️ Album artwork and track information
* 🆓 Free to use
* 🌱 Open source
* ⚡ Built with Next.js

## Tech Stack

* [Next.js](https://nextjs.org/)
* TypeScript
* iTunes Search API
* YouTube

## Getting Started

### Prerequisites

Make sure you have Node.js installed.

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/x87w/iridium.git
cd iridium
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Or with another package manager:

```bash
yarn dev
# or
pnpm dev
# or
bun dev
```

Then open http://localhost:3000 in your browser.

## How It Works

Iridium uses the iTunes Search API to search for songs and retrieve information such as titles, artists, albums, and artwork.

When a track is selected, Iridium searches YouTube for the corresponding song and uses the result for playback.

## Contributing

Contributions, suggestions, and improvements are welcome!

Feel free to open an issue or submit a pull request.


---

Made with <3 by **sloes**
