import { Request, Response, NextFunction } from 'express';
import { SpaceXService } from '../services/spacexService';

export class LaunchController {
  /**
   * Next launch
   */
  static async getNextLaunch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const launch = await SpaceXService.getNextLaunch();
      res.json({
        status: 'success',
        message: 'Próximo lançamento encontrado',
        data: launch,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Latest launch
   */
  static async getLatestLaunch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const launch = await SpaceXService.getLatestLaunch();
      res.json({
        status: 'success',
        message: 'Último lançamento encontrado',
        data: launch,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Upcoming launches
   */
  static async getUpcomingLaunches(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const launches = await SpaceXService.getUpcomingLaunches();
      
      res.json({
        status: 'success',
        message: 'Próximos lançamentos encontrados',
        data: launches,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Past launches
   */
  static async getPastLaunches(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const launches = await SpaceXService.getPastLaunches();
      
      res.json({
        status: 'success',
        message: 'Lançamentos passados encontrados',
        data: launches,
      });
    } catch (error) {
      next(error);
    }
  }
}
