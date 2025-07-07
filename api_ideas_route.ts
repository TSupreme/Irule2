import { NextRequest, NextResponse } from 'next/server'
import { get, set } from '@vercel/edge-config'
import { Idea } from '../../types'

// Mock AI evaluation function
function evaluateIdea(idea: string): {
  scores: Record<string, number>
  totalScore: number
  pros: string[]
  cons: string[]
} {
  // Simple scoring algorithm based on keywords and length
  const text = idea.toLowerCase()
  
  // Base scores
  const scores = {
    feasibility: Math.floor(Math.random() * 4) + 6, // 6-10
    impact: Math.floor(Math.random() * 4) + 6,
    innovation: Math.floor(Math.random() * 4) + 6,
    sustainability: Math.floor(Math.random() * 4) + 6,
    scalability: Math.floor(Math.random() * 4) + 6,
    ethics: Math.floor(Math.random() * 4) + 6,
    cost: Math.floor(Math.random() * 4) + 6,
    timeframe: Math.floor(Math.random() * 4) + 6,
    public_support: Math.floor(Math.random() * 4) + 6,
    implementation: Math.floor(Math.random() * 4) + 6
  }
  
  // Adjust scores based on content
  if (text.includes('sustainable') || text.includes('environment')) {
    scores.sustainability += 1
    scores.ethics += 1
  }
  
  if (text.includes('technology') || text.includes('digital')) {
    scores.innovation += 1
    scores.scalability += 1
  }
  
  if (text.includes('education') || text.includes('healthcare')) {
    scores.impact += 1
    scores.ethics += 1
  }
  
  if (text.includes('free') || text.includes('cost-effective')) {
    scores.cost += 1
  }
  
  if (text.includes('global') || text.includes('worldwide')) {
    scores.scalability += 1
    scores.impact += 1
  }
  
  // Ensure scores don't exceed 10
  Object.keys(scores).forEach(key => {
    scores[key as keyof typeof scores] = Math.min(scores[key as keyof typeof scores], 10)
  })
  
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0)
  
  // Generate pros and cons
  const allPros = [
    'Addresses a significant global issue',
    'Innovative approach to problem-solving',
    'Scalable solution with wide reach',
    'Cost-effective implementation',
    'Strong potential for positive impact',
    'Sustainable long-term solution',
    'Builds on existing infrastructure',
    'Addresses multiple stakeholder needs',
    'Clear implementation pathway',
    'Strong public appeal'
  ]
  
  const allCons = [
    'Implementation challenges may arise',
    'Requires significant initial investment',
    'May face regulatory hurdles',
    'Potential for unintended consequences',
    'Requires widespread adoption for success',
    'May be difficult to scale globally',
    'Could face political resistance',
    'Technical complexity may limit adoption',
    'May not address root causes',
    'Limited evidence of effectiveness'
  ]
  
  const pros = allPros.sort(() => Math.random() - 0.5).slice(0, 3)
  const cons = allCons.sort(() => Math.random() - 0.5).slice(0, 3)
  
  return { scores, totalScore, pros, cons }
}

export async function GET() {
  try {
    const ideas = await get('ideas') as Idea[] || []
    
    // Sort by score and add rankings
    const sortedIdeas = ideas
      .sort((a, b) => (b.totalScore + (b.upvotes - b.downvotes) * 2) - (a.totalScore + (a.upvotes - a.downvotes) * 2))
      .map((idea, index) => ({ ...idea, rank: index + 1 }))
    
    return NextResponse.json(sortedIdeas)
  } catch (error) {
    console.error('Error fetching ideas:', error)
    return NextResponse.json({ error: 'Failed to fetch ideas' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, idea } = await request.json()
    
    if (!name || !email || !idea) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // Get existing ideas
    const existingIdeas = await get('ideas') as Idea[] || []
    
    // Evaluate the idea
    const evaluation = evaluateIdea(idea)
    
    // Create new idea
    const newIdea: Idea = {
      id: Date.now().toString(),
      name,
      email,
      idea,
      timestamp: new Date().toISOString(),
      ...evaluation,
      upvotes: 0,
      downvotes: 0
    }
    
    // Add to ideas array
    const updatedIdeas = [newIdea, ...existingIdeas]
    
    // Store in Edge Config
    await set('ideas', updatedIdeas)
    
    return NextResponse.json(newIdea, { status: 201 })
  } catch (error) {
    console.error('Error creating idea:', error)
    return NextResponse.json({ error: 'Failed to create idea' }, { status: 500 })
  }
}