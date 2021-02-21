'use strict'

const http = require('http')
const config = require('config')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const ProducerService = require('./service/ProducerService')
const ConsumerService = require('./service/ConsumerService')
const EventController = require('./controllers/Events')
const logger = require('./common/logger')

const serverProducerPort = config.PRODUCER_PORT

// Extending payload size
app.use(bodyParser.json({limit: '2mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '2mb', extended: true}))
app.post('/event', function (req, res) {
  EventController.postEvent(req, res)
})
// Initializing the kafka producer init function
ProducerService.init()
  .then(() => {
    http.createServer(app).listen(serverProducerPort, function () {
      logger.info(`Your server is listening on port ${serverProducerPort} (http://localhost:${serverProducerPort})`)
      // logger.info(`Swagger-ui is available on http://localhost:${serverProducerPort}/docs`)
    })
  })
ConsumerService.init()
// })
