import { Router, Request, Response, NextFunction } from 'express'
import { registerController } from '../controllers/auth.controller'

const router = Router()

router.post('/register', registerController)
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  res.send('register route')
})
router.post('/refresh-token', async (req: Request, res: Response, next: NextFunction) => {
  res.send('register route')
})
router.delete('/logout', async (req: Request, res: Response, next: NextFunction) => {
  res.send('register route')
})

export default router
