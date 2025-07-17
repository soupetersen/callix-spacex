import { Router } from 'express';
import { LaunchController } from '../controllers/launchController';

const router: Router = Router();

router.get('/spacex/next-launch', LaunchController.getNextLaunch);

router.get('/spacex/latest-launch', LaunchController.getLatestLaunch);

router.get('/spacex/upcoming-launches', LaunchController.getUpcomingLaunches);

router.get('/spacex/past-launches', LaunchController.getPastLaunches);

router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'SpaceX API',
  });
});

export default router;
