'use client'

import { useState } from 'react'
import { Send, User, Mail, Lightbulb, Loader2 } from 'lucide-react'

interface IdeaFormProps {
  onSubmit: (data: { name: string; email: string; idea: string }) => Promise<void>
}

export default function IdeaForm({ onSubmit }: IdeaFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    idea: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.idea.trim()) {
      newErrors.idea = 'Idea is required'
    } else if (formData.idea.trim().length < 10) {
      newErrors.idea = 'Idea must be at least 10 characters long'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      setFormData({ name: '', email: '', idea: '' })
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="card p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <User className="h-4 w-4" />
            Your Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`input-field ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Enter your full name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Mail className="h-4 w-4" />
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`input-field ${errors.email ? 'border-red-500' : ''}`}
            placeholder="Enter your email address"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Idea Field */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Lightbulb className="h-4 w-4" />
            Your World-Changing Idea
          </label>
          <textarea
            value={formData.idea}
            onChange={(e) => handleChange('idea', e.target.value)}
            className={`input-field min-h-[120px] resize-none ${errors.idea ? 'border-red-500' : ''}`}
            placeholder="If you ruled the world, what would you change? Describe your idea in detail..."
            disabled={isSubmitting}
          />
          {errors.idea && (
            <p className="mt-1 text-sm text-red-600">{errors.idea}</p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            {formData.idea.length}/500 characters
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Analyzing Your Idea...
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Submit My Idea
            </>
          )}
        </button>
      </form>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">How It Works</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Submit your world-changing idea</li>
          <li>• Our AI evaluates it across 10 categories</li>
          <li>• Get instant feedback on pros and cons</li>
          <li>• See how it ranks on the leaderboard</li>
          <li>• Share with friends and get community votes</li>
        </ul>
      </div>
    </div>
  )
}