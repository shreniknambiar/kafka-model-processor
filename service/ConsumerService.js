
const config = require('config')
const Kafka = require('no-kafka')
const logger = require('../common/logger')
// Start kafka consumer
logger.info('Starting kafka consumer')
// create consumer
// const consumer = new Kafka.GroupConsumer(helper.getKafkaOptions())
const consumer = new Kafka.GroupConsumer()
/*
 * Data handler linked with Kafka consumer
 * Whenever a new message is received by Kafka consumer,
 * this function will be invoked
 */
const dataHandler = (messageSet, topic, partition) => Promise.each(messageSet, async (m) => {
  const message = m.message.value.toString('utf8')
  logger.info(`Handle Kafka event message; Topic: ${topic}; Partition: ${partition}; Offset: ${
    m.offset}; Message: ${message}.`)
  let messageJSON
  try {
    messageJSON = JSON.parse(message)
  } catch (e) {
    logger.error('Invalid message JSON.')
    logger.logFullError(e)

    // commit the message and ignore it
    await consumer.commitOffset({ topic, partition, offset: m.offset })
    return
  }

  if (messageJSON.topic !== topic) {
    logger.error(`The message topic ${messageJSON.topic} doesn't match the Kafka topic ${topic}.`)

    // commit the message and ignore it
    await consumer.commitOffset({ topic, partition, offset: m.offset })
    return
  }
  await consumer.commitOffset({ topic, partition, offset: m.offset })
})
const topics = [config.LOOKUP_CREATE_TOPIC]
async function init () {
  await consumer
    .init([{
      subscriptions: topics,
      handler: dataHandler
    }])
    // consume configured topics
    .then(() => {
      logger.info('Initialized.......')
      logger.info('Adding topics successfully.......')
      logger.info(topics)
      logger.info('Kick Start.......')
    })
    .catch((error) => {
      return error
    })
}

module.exports = {
  init
}
