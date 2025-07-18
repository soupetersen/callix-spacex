import type { SpacexLaunch } from '../types/api'

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api/spacex'

interface ApiResponse<T> {
  data: T
}

export async function getNextLaunch(): Promise<SpacexLaunch> {
  const response = await fetch(`${API_BASE_URL}/next-launch`)
  if (!response.ok) {
    throw new Error('Erro ao carregar próximo lançamento')
  }
  const result: ApiResponse<SpacexLaunch> = await response.json()
  return result.data
}

export async function getLatestLaunch(): Promise<SpacexLaunch> {
  const response = await fetch(`${API_BASE_URL}/latest-launch`)
  if (!response.ok) {
    throw new Error('Erro ao carregar último lançamento')
  }
  const result: ApiResponse<SpacexLaunch> = await response.json()
  return result.data
}

export async function getUpcomingLaunches(): Promise<SpacexLaunch[]> {
  const response = await fetch(`${API_BASE_URL}/upcoming-launches`)
  if (!response.ok) {
    throw new Error('Erro ao carregar próximos lançamentos')
  }
  const result: ApiResponse<SpacexLaunch[]> = await response.json()
  return result.data
}

export async function getPastLaunches(): Promise<SpacexLaunch[]> {
  const response = await fetch(`${API_BASE_URL}/past-launches`)
  if (!response.ok) {
    throw new Error('Erro ao carregar lançamentos passados')
  }
  const result: ApiResponse<SpacexLaunch[]> = await response.json()
  return result.data
}

export const spacexApi = {
  getNextLaunch,
  getLatestLaunch,
  getUpcomingLaunches,
  getPastLaunches,
}