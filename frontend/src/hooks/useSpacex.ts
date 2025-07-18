import { useState, useEffect } from 'react'
import type { SpacexLaunch } from '../types/api'
import { getLatestLaunch, getNextLaunch, getPastLaunches, getUpcomingLaunches } from '@/lib/api'

interface UseSpacex {
  nextLaunch: SpacexLaunch | null
  latestLaunch: SpacexLaunch | null
  upcomingLaunches: SpacexLaunch[]
  pastLaunches: SpacexLaunch[]
  loading: {
    nextLaunch: boolean
    latestLaunch: boolean
    upcomingLaunches: boolean
    pastLaunches: boolean
  }
  error: {
    nextLaunch: string | null
    latestLaunch: string | null
    upcomingLaunches: string | null
    pastLaunches: string | null
  }
  refetch: () => void
}

export const useSpacex = (): UseSpacex => {
  const [nextLaunch, setNextLaunch] = useState<SpacexLaunch | null>(null)
  const [latestLaunch, setLatestLaunch] = useState<SpacexLaunch | null>(null)
  const [upcomingLaunches, setUpcomingLaunches] = useState<SpacexLaunch[]>([])
  const [pastLaunches, setPastLaunches] = useState<SpacexLaunch[]>([])
  
  const [loading, setLoading] = useState({
    nextLaunch: false,
    latestLaunch: false,
    upcomingLaunches: false,
    pastLaunches: false,
  })
  
  const [error, setError] = useState({
    nextLaunch: null as string | null,
    latestLaunch: null as string | null,
    upcomingLaunches: null as string | null,
    pastLaunches: null as string | null,
  })

  const fetchNextLaunch = async () => {
    setLoading(prev => ({ ...prev, nextLaunch: true }))
    setError(prev => ({ ...prev, nextLaunch: null }))
    
    try {
      const data = await getNextLaunch()
      setNextLaunch(data)
    } catch (err) {
      setError(prev => ({ ...prev, nextLaunch: err instanceof Error ? err.message : 'Erro desconhecido' }))
    } finally {
      setLoading(prev => ({ ...prev, nextLaunch: false }))
    }
  }

  const fetchLatestLaunch = async () => {
    setLoading(prev => ({ ...prev, latestLaunch: true }))
    setError(prev => ({ ...prev, latestLaunch: null }))
    
    try {
      const data = await getLatestLaunch()
      setLatestLaunch(data)
    } catch (err) {
      setError(prev => ({ ...prev, latestLaunch: err instanceof Error ? err.message : 'Erro desconhecido' }))
    } finally {
      setLoading(prev => ({ ...prev, latestLaunch: false }))
    }
  }

  const fetchUpcomingLaunches = async () => {
    setLoading(prev => ({ ...prev, upcomingLaunches: true }))
    setError(prev => ({ ...prev, upcomingLaunches: null }))
    
    try {
      const data = await getUpcomingLaunches()
      setUpcomingLaunches(data)
    } catch (err) {
      setError(prev => ({ ...prev, upcomingLaunches: err instanceof Error ? err.message : 'Erro desconhecido' }))
    } finally {
      setLoading(prev => ({ ...prev, upcomingLaunches: false }))
    }
  }

  const fetchPastLaunches = async () => {
    setLoading(prev => ({ ...prev, pastLaunches: true }))
    setError(prev => ({ ...prev, pastLaunches: null }))
    
    try {
      const data = await getPastLaunches()
      setPastLaunches(data)
    } catch (err) {
      setError(prev => ({ ...prev, pastLaunches: err instanceof Error ? err.message : 'Erro desconhecido' }))
    } finally {
      setLoading(prev => ({ ...prev, pastLaunches: false }))
    }
  }

  const fetchData = async () => {
    await Promise.allSettled([
      fetchNextLaunch(),
      fetchLatestLaunch(),
      fetchUpcomingLaunches(),
      fetchPastLaunches(),
    ])
  }

  useEffect(() => {
    const loadData = async () => {
      await Promise.allSettled([
        fetchNextLaunch(),
        fetchLatestLaunch(),
        fetchUpcomingLaunches(),
        fetchPastLaunches(),
      ])
    }
    loadData()
  }, [])

  return {
    nextLaunch,
    latestLaunch,
    upcomingLaunches,
    pastLaunches,
    loading,
    error,
    refetch: fetchData,
  }
}
