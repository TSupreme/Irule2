export interface Idea {
  id: string
  name: string
  email: string
  idea: string
  timestamp: string
  scores: {
    feasibility: number
    impact: number
    innovation: number
    sustainability: number
    scalability: number
    ethics: number
    cost: number
    timeframe: number
    public_support: number
    implementation: number
  }
  totalScore: number
  pros: string[]
  cons: string[]
  upvotes: number
  downvotes: number
  rank?: number
}

export interface IdeaSubmission {
  name: string
  email: string
  idea: string
}