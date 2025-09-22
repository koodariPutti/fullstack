const mongoose = require('mongoose')
const { MONGODB_URI, PORT } = require('./utils/config')
const logger = require('./utils/logger')
const app = require('./app')

mongoose.set('strictQuery', false)
mongoose.connect(MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`))
  })
  .catch(err => logger.error('error connecting to MongoDB:', err.message))
