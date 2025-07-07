import { NextRequest, NextResponse } from 'next/server'
import { get, set } from '@vercel/edge-config'
import { Idea } from '../../../../types'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { type } = await request.json()
    const ideaId = params.id
    
    if (!type || !['upvote', 'downvote'].includes(type)) {
      return NextResponse.json({ error: 'Invalid vote type' }, { status: 400 })
    }
    
    // Get existing ideas
    const ideas = await get('ideas') as Idea[] || []
    
    // Find the idea to vote on
    const ideaIndex = ideas.findIndex(idea => idea.id === ideaId)
    
    if (ideaIndex === -1) {
      return NextResponse.json({ error: 'Idea not found' }, { status: 404 })
    }
    
    // Update the vote count
    const updatedIdea = { ...ideas[ideaIndex] }
    if (type === 'upvote') {
      updatedIdea.upvotes += 1
    } else {
      updatedIdea.downvotes += 1
    }
    
    // Update the ideas array
    const updatedIdeas = [...ideas]
    updatedIdeas[ideaIndex] = updatedIdea
    
    // Store in Edge Config
    await set('ideas', updatedIdeas)
    
    return NextResponse.json(updatedIdea)
  } catch (error) {
    console.error('Error voting on idea:', error)
    return NextResponse.json({ error: 'Failed to vote' }, { status: 500 })
  }
}