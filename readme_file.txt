# If I Ruled the World pt 2

A web application game where users can submit their world-changing ideas and have them evaluated by AI across 10 categories, then ranked on a community leaderboard.

## Features

- **Idea Submission**: Users enter their name, email, and world-changing idea
- **AI Evaluation**: Each idea is automatically evaluated across 10 categories:
  - Feasibility
  - Impact
  - Innovation
  - Sustainability
  - Scalability
  - Ethics
  - Cost Efficiency
  - Timeframe
  - Public Support
  - Implementation
- **Scoring System**: Ideas receive scores out of 10 for each category (total score out of 100)
- **Leaderboard**: Ideas are ranked by total score plus community votes
- **Community Voting**: Users can upvote/downvote ideas
- **Pros & Cons**: AI-generated analysis of each idea's strengths and weaknesses
- **Sharing**: Users can share ideas via native sharing or copy to clipboard
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Vercel Edge Config
- **Deployment**: Vercel
- **Icons**: Lucide React

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- A Vercel account
- Git installed

### Local Development

1. Clone the repository:
```bash
git clone <your-repo-url>
cd if-i-ruled-the-world-pt2
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Go to your Vercel dashboard
   - Create a new Edge Config store
   - Copy the Edge Config URL
   - Create a `.env.local` file in the root directory:
```bash
EDGE_CONFIG=your_edge_config_url_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Deployment to Vercel

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "New Project" and import your GitHub repository

4. Configure environment variables:
   - In the Vercel project settings, go to "Environment Variables"
   - Add `EDGE_CONFIG` with your Edge Config URL

5. Deploy the project

6. Your app will be available at `https://your-app-name.vercel.app`

## Edge Config Setup

1. In your Vercel dashboard, go to "Storage"
2. Click "Create Database" and select "Edge Config"
3. Name your Edge Config store (e.g., "ideas-store")
4. Copy the connection string
5. Add it to your environment variables as `EDGE_CONFIG`

The Edge Config will automatically store:
- User submissions (name, email, idea)
- AI evaluation scores and analysis
- Vote counts
- Timestamps

## Project Structure

```
if-i-ruled-the-world-pt2/
├── app/
│   ├── api/
│   │   └── ideas/
│   │       ├── route.ts          # GET/POST ideas
│   │       └── [id]/vote/
│   │           └── route.ts      # Vote on ideas
│   ├── components/
│   │   ├── IdeaForm.tsx         # Idea submission form
│   │   ├── IdeaCard.tsx         # Individual idea display
│   │   └── Leaderboard.tsx      # Ranked ideas display
│   ├── globals.css              # Global styles
│   ├── layout.tsx              # App layout
│   ├── page.tsx                # Main page
│   └── types.ts                # TypeScript types
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## API Endpoints

- `GET /api/ideas` - Fetch all ideas with rankings
- `POST /api/ideas` - Submit a new idea
- `POST /api/ideas/[id]/vote` - Vote on an idea

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes.

## Support

If you encounter any issues:
1. Check the Vercel deployment logs
2. Ensure Edge Config is properly configured
3. Verify environment variables are set
4. Check browser console for errors

For additional help, create an issue in the GitHub repository.