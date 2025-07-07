'use client'

import { useState, useEffect } from 'react'
import { Crown, Lightbulb, TrendingUp, Share2, ThumbsUp, ThumbsDown, Send, Globe, Sparkles, Users, Target, Zap } from 'lucide-react'
import IdeaForm from './components/IdeaForm'
import Leaderboard from './components/Leaderboard'
import IdeaCard from './components/IdeaCard'
import { Idea } from './types'

export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('submit')
  const [notification, setNotification] = useState<string | null>(null)

  useEffect(() => {
    fetchIdeas()
  }, [])

  const fetchIdeas = async () => {
    try {
      const response = await fetch('/api/ideas')
      if (response.ok) {
        const data = await response.json()
        setIdeas(data)
      }
    } catch (error) {
      console.error('Error fetching ideas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleIdeaSubmit = async (ideaData: { name: string; email: string; idea: string }) => {
    try {
      const response = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ideaData),
      })
      
      if (response.ok) {
        const newIdea = await response.json()
        setIdeas(prev => [newIdea, ...prev])
        setNotification('🎉 Your idea has been submitted and evaluated!')
        setTimeout(() => setNotification(null), 3000)
        setActiveTab('leaderboard')
      }
    } catch (error) {
      console.error('Error submitting idea:', error)
      setNotification('❌ Error submitting idea. Please try again.')
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const handleVote = async (ideaId: string, type: 'upvote' | 'downvote') => {
    try {
      const response = await fetch(`/api/ideas/${ideaId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      })
      
      if (response.ok) {
        const updatedIdea = await response.json()
        setIdeas(prev => prev.map(idea => 
          idea.id === ideaId ? updatedIdea : idea
        ))
      }
    } catch (error) {
      console.error('Error voting:', error)
    }
  }

  const handleShare = async (idea: Idea) => {
    const shareText = `Check out this world-changing idea: "${idea.idea}" - Scored ${idea.totalScore}/100 on If I Ruled the World pt 2!`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'If I Ruled the World pt 2',
          text: shareText,
          url: window.location.href,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      await navigator.clipboard.writeText(shareText)
      setNotification('📋 Idea copied to clipboard!')
      setTimeout(() => setNotification(null), 2000)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 animate-float">
          <p className="text-sm font-medium text-gray-800">{notification}</p>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x"></div>
        <div className="relative z-10 px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
              <Crown className="h-5 w-5 text-yellow-300" />
              <span className="text-white font-semibold">If I Ruled the World pt 2</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Share Your World-Changing 
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Ideas
              </span>
            </h1>
            
            <p className="text-xl text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
              Submit your revolutionary ideas and see how they stack up against others. 
              Our AI evaluates each idea across 10 categories and ranks them on the leaderboard.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                <Target className="h-4 w-4 text-white" />
                <span className="text-white text-sm">10 Evaluation Categories</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                <Users className="h-4 w-4 text-white" />
                <span className="text-white text-sm">Community Voting</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
                <Zap className="h-4 w-4 text-white" />
                <span className="text-white text-sm">Instant AI Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('submit')}
              className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'submit'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Send className="h-4 w-4" />
              Submit Idea
            </button>
            
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'leaderboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              Leaderboard
            </button>
            
            <button
              onClick={() => setActiveTab('explore')}
              className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'explore'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Globe className="h-4 w-4" />
              Explore Ideas
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'submit' && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Lightbulb className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Submit Your Idea</h2>
              <p className="text-gray-600">
                Share your world-changing idea and get instant AI feedback across 10 categories
              </p>
            </div>
            <IdeaForm onSubmit={handleIdeaSubmit} />
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div>
            <div className="text-center mb-8">
              <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h2>
              <p className="text-gray-600">
                Top-ranked ideas based on AI evaluation and community votes
              </p>
            </div>
            <Leaderboard ideas={ideas} onVote={handleVote} onShare={handleShare} />
          </div>
        )}

        {activeTab === 'explore' && (
          <div>
            <div className="text-center mb-8">
              <Sparkles className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore All Ideas</h2>
              <p className="text-gray-600">
                Browse through all submitted ideas and discover creative solutions
              </p>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {ideas.map((idea) => (
                  <IdeaCard
                    key={idea.id}
                    idea={idea}
                    onVote={handleVote}
                    onShare={handleShare}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="h-6 w-6 text-yellow-400" />
            <span className="text-xl font-bold">If I Ruled the World pt 2</span>
          </div>
          <p className="text-gray-400">
            Empowering world-changing ideas through AI evaluation and community engagement
          </p>
        </div>
      </footer>
    </div>
  )
}