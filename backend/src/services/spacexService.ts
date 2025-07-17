import { Launch, launchSchema } from '@/schemas/spacex';
import { z } from 'zod';

const SPACEX_API_BASE = process.env.SPACEX_API_BASE || 'https://api.spacexdata.com/v5';

export class SpaceXService {
  private static async fetchFromSpaceX<T>(endpoint: string, schema: z.ZodSchema<T>): Promise<T> {
    const url = `${SPACEX_API_BASE}${endpoint}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`SpaceX API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      return schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`SpaceX API response validation failed: ${error.message}`);
      }
      
      throw new Error(`Failed to fetch from SpaceX API: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private static async querySpaceX<T>(query: object, options: object, schema: z.ZodSchema<T>): Promise<T> {
    const url = `${SPACEX_API_BASE}/launches/query`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          options,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`SpaceX API error: ${response.statusText}`);
      }
      
      const data = await response.json();
      return schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`SpaceX API response validation failed: ${error.message}`);
      }
      
      throw new Error(`Failed to fetch from SpaceX API: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Next launch
   */
  static async getNextLaunch(): Promise<Launch> {
    return this.fetchFromSpaceX('/launches/next', launchSchema);
  }

  /**
   * Latest launch
   */
  static async getLatestLaunch(): Promise<Launch> {
    return this.fetchFromSpaceX('/launches/latest', launchSchema);
  }

  /**
   * Upcoming launches
   */
  static async getUpcomingLaunches(): Promise<Launch[]> {
    const queryResult = await this.querySpaceX(
      { upcoming: true },
      { 
        sort: { date_utc: 'asc' },
      },
      z.object({
        docs: z.array(launchSchema),
        totalDocs: z.number(),
      })
    );
    
    return queryResult.docs;
  }

  /**
   * Past launches
   */
  static async getPastLaunches(): Promise<Launch[]> {
    const queryResult = await this.querySpaceX(
      { upcoming: false },
      { 
        sort: { date_utc: 'desc' },
      },
      z.object({
        docs: z.array(launchSchema),
        totalDocs: z.number(),
      })
    );
    
    console.log('Past launches found:', queryResult.docs.length, 'of', queryResult.totalDocs);
    return queryResult.docs;
  }
}
