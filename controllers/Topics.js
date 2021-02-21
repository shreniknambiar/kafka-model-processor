'use strict'

const utils = require('../utils/writer.js')
const ProducerService = require('../service/ProducerService')
// const helper = require('../common/helper')
// const config = require('config')

module.exports.getTopics = function getTopics (req, res, next) {
  // helper.verifyTokenScope(req, config.SCOPES.readBusTopics)
  ProducerService
    .getAllTopics()
    .then(topics => {
      console.log(topics)
      utils.writeJson(res, topics)
      return topics
    })
}
