'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown, Share2, User, Clock, BarChart3, ChevronDown, ChevronUp } from 'lucide-react'
import { Idea } from '../types'

interface IdeaCardProps {
  idea: Idea
  onVote: (ideaId: string, type: 'upvote' | 'downvote') => void
  onShare: (idea: Idea) => void
  showRank?: boolean
}

export default function IdeaCard({ idea, onVote, onShare, showRank = true }: IdeaCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [showScores, setShowScores] = useState(false)

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100'
    if (score >= 6) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const categories = [
    { key: 'feasibility', label: 'Feasibility' },
    { key: 'impact', label: 'Impact' },
    { key: 'innovation', label: 'Innovation' },
    { key: 'sustainability', label: 'Sustainability' },
    { key: 'scalability', label: 'Scalability' },
    { key: 'ethics', label: 'Ethics' },
    { key: 'cost', label: 'Cost Efficiency' },
    { key: 'timeframe', label: 'Timeframe' },
    { key: 'public_support', label: 'Public Support' },
    { key: 'implementation', label: 'Implementation' }
  ]

  return (
    <div className="card p-6 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <User className="h-4 w-4 text-gray-500" />
            <span className="font-semibold text-gray-800">{idea.name}</span>
            <Clock className="h-4 w-4 text-gray-400 ml-2" />
            <span className="text-sm text-gray-500">{formatDate(idea.timestamp)}</span>
          </div>
          
          {showRank && idea.rank && (
            <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-2">
              <BarChart3 className="h-3 w-3" />
              Rank #{idea.rank}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-800">{idea.totalScore}</div>
            <div className="text-sm text-gray-500">/ 100</div>
          </div>
        </div>
      </div>

      {/* Idea Content */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">
          {showDetails ? idea.idea : `${idea.idea.substring(0, 150)}${idea.idea.length > 150 ? '...' : ''}`}
        </p>
        
        {idea.idea.length > 150 && (
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 flex items-center gap-1"
          >
            {showDetails ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Read more
              </>
            )}
          </button>
        )}
      </div>

      {/* Score Breakdown */}
      <div className="mb-4">
        <button
          onClick={() => setShowScores(!showScores)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          <BarChart3 className="h-4 w-4" />
          Score Breakdown
          {showScores ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        
        {showScores && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {categories.map(({ key, label }) => (
              <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-600">{label}</span>
                <span className={`text-sm font-semibold px-2 py-1 rounded ${getScoreColor(idea.scores[key as keyof typeof idea.scores])}`}>
                  {idea.scores[key as keyof typeof idea.scores]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pros and Cons */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" />
            Pros
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {idea.pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-1">
            <ThumbsDown className="h-4 w-4" />
            Cons
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {idea.cons.map((con, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onVote(idea.id, 'upvote')}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          >
            <ThumbsUp className="h-4 w-4" />
            {idea.upvotes}
          </button>
          
          <button
            onClick={() => onVote(idea.id, 'downvote')}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <ThumbsDown className="h-4 w-4" />
            {idea.downvotes}
          </button>
        </div>
        
        <button
          onClick={() => onShare(idea)}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </div>
    </div>
  )
}