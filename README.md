# Diabetes Risk Assessment Application

A full-stack web application for diabetes risk assessment with WhatsApp integration.

## Features

- Patient information collection and storage
- Diabetes risk assessment using medical parameters
- WhatsApp integration for sending assessment results
- Patient history tracking
- Real-time risk prediction
- Responsive UI with Tailwind CSS

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Express.js + TypeScript
- Database: SQLite with better-sqlite3
- Styling: Tailwind CSS
- WhatsApp Integration: whatsapp-web.js

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/diabetes-risk-assessment.git
cd diabetes-risk-assessment
```

2. Install dependencies:
```bash
npm install
```

3. Start the development servers:
```bash
npm run dev & npm run dev:server
```

4. Scan the WhatsApp QR code that appears in the console to enable WhatsApp integration.

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```
PORT=3001
```

## Project Structure

```
├── src/
│   ├── components/      # React components
│   ├── server/         # Express backend
│   │   ├── db.ts      # Database configuration
│   │   ├── index.ts   # Server entry point
│   │   └── whatsapp.ts # WhatsApp service
│   ├── App.tsx        # Main React component
│   └── main.tsx       # React entry point
├── public/            # Static assets
└── package.json       # Project dependencies
```

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request