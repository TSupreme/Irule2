'use client'

import { Trophy, Medal, Award, Crown } from 'lucide-react'
import { Idea } from '../types'
import IdeaCard from './IdeaCard'

interface LeaderboardProps {
  ideas: Idea[]
  onVote: (ideaId: string, type: 'upvote' | 'downvote') => void
  onShare: (idea: Idea) => void
}

export default function Leaderboard({ ideas, onVote, onShare }: LeaderboardProps) {
  const sortedIdeas = [...ideas].sort((a, b) => {
    const scoreA = a.totalScore + (a.upvotes - a.downvotes) * 2
    const scoreB = b.totalScore + (b.upvotes - b.downvotes) * 2
    return scoreB - scoreA
  })

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Trophy className="h-6 w-6 text-gray-400" />
      case 3:
        return <Medal className="h-6 w-6 text-orange-600" />
      default:
        return <Award className="h-6 w-6 text-blue-500" />
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white'
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white'
      default:
        return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
    }
  }

  if (ideas.length === 0) {
    return (
      <div className="text-center py-12">
        <Crown className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Ideas Yet</h3>
        <p className="text-gray-500">Be the first to submit a world-changing idea!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top 3 Podium */}
      {sortedIdeas.length >= 3 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* 2nd Place */}
          <div className="text-center order-1">
            <div className="bg-gradient-to-r from-gray-300 to-gray-500 rounded-xl p-6 mb-4 h-32 flex items-center justify-center">
              <div className="text-center">
                <Trophy className="h-8 w-8 text-white mx-auto mb-2" />
                <span className="text-white font-bold text-lg">2nd</span>
              </div>
            </div>
            <div className="card p-4">
              <h4 className="font-semibold text-sm mb-1">{sortedIdeas[1].name}</h4>
              <p className="text-xs text-gray-600 mb-2 truncate">{sortedIdeas[1].idea}</p>
              <div className="flex justify-center items-center gap-2">
                <span className="text-sm font-bold text-gray-600">{sortedIdeas[1].totalScore}</span>
                <span className="text-xs text-gray-500">pts</span>
              </div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="text-center order-2">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl p-6 mb-4 h-40 flex items-center justify-center">
              <div className="text-center">
                <Crown className="h-10 w-10 text-white mx-auto mb-2" />
                <span className="text-white font-bold text-xl">1st</span>
              </div>
            </div>
            <div className="card p-4 ring-2 ring-yellow-400">
              <h4 className="font-semibold text-sm mb-1">{sortedIdeas[0].name}</h4>
              <p className="text-xs text-gray-600 mb-2 truncate">{sortedIdeas[0].idea}</p>
              <div className="flex justify-center items-center gap-2">
                <span className="text-sm font-bold text-yellow-600">{sortedIdeas[0].totalScore}</span>
                <span className="text-xs text-gray-500">pts</span>
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="text-center order-3">
            <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl p-6 mb-4 h-32 flex items-center justify-center">
              <div className="text-center">
                <Medal className="h-8 w-8 text-white mx-auto mb-2" />
                <span className="text-white font-bold text-lg">3rd</span>
              </div>
            </div>
            <div className="card p-4">
              <h4 className="font-semibold text-sm mb-1">{sortedIdeas[2].name}</h4>
              <p className="text-xs text-gray-600 mb-2 truncate">{sortedIdeas[2].idea}</p>
              <div className="flex justify-center items-center gap-2">
                <span className="text-sm font-bold text-orange-600">{sortedIdeas[2].totalScore}</span>
                <span className="text-xs text-gray-500">pts</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Leaderboard */}
      <div className="space-y-4">
        {sortedIdeas.map((idea, index) => (
          <div key={idea.id} className="relative">
            {/* Rank Badge */}
            <div className="absolute -left-2 -top-2 z-10">
              <div className={`${getRankBadge(index + 1)} rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg`}>
                {index + 1}
              </div>
            </div>
            
            {/* Idea Card */}
            <div className={`${index < 3 ? 'ring-2 ring-opacity-50' : ''} ${
              index === 0 ? 'ring-yellow-400' : 
              index === 1 ? 'ring-gray-400' : 
              index === 2 ? 'ring-orange-400' : ''
            }`}>
              <IdeaCard
                idea={idea}
                onVote={onVote}
                onShare={onShare}
                showRank={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}