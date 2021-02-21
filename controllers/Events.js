'use strict'

const ProducerService = require('../service/ProducerService')
// const helper = require('../common/helper')
// const config = require('config')
const utils = require('../utils/writer.js')

module.exports.postEvent = function postEvent (req, res) {
  // helper.verifyTokenScope(req, config.SCOPES.writeBusApi)
  ProducerService
    .postEvent(req.body)
    .then(() => {
      utils.writeJson(res, null, 204)
    })
}
