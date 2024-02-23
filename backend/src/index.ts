import app from './app'
import config from './config/dotenvConfig'
import { logger } from './utils/logger'

app.listen(config.PORT, async () => {
  logger.info(`The server has started on port ${config.PORT}`)
})
