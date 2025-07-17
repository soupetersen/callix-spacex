import { z } from 'zod'

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api/spacex'

class ApiError extends Error {
  public status: number
  
  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {},
  schema?: z.ZodSchema<T>
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new ApiError(response.status, `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (schema) {
      return schema.parse(data)
    }

    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    
    if (error instanceof z.ZodError) {
      throw new Error(`API response validation failed: ${error.message}`)
    }

    throw new Error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export { ApiError }
