# Kafka Model Processor

## Requirements

Nodejs: 14

## Local Kafka Setup

1. Download & Extract the Kafka binaries from https://kafka.apache.org/downloads

2. Make `data` directory inside the extracted kafka binaries.

```bash
mkdir data/zookeeper

mkdir data/kafka
```
3. For the below commands to work kafka path needs to be added to .bashrc

If not then all commands need to be run inside the kafka binaries folder (which is `kafka_2.13-2.7.0/`)

Edit Zookeeper & Kafka configs (present in config/zookeeper.properties for zookeeper and config/server.properties for kafka) using a text editor.

zookeeper.properties: dataDir=/your/path/to/data/zookeeper (in my case it is dataDir=/home/shrenik/kafka_2.13-2.7.0/data/zookeeper)

server.properties: log.dirs=/your/path/to/data/kafka (in my case it is dataDir=/home/shrenik/kafka_2.13-2.7.0/data/kafka)

4. Start Zookeeper first in one terminal window: 

```bash
zookeeper-server-start.sh config/zookeeper.properties
```

5. Start Kafka in another terminal window: 

```bash
kafka-server-start.sh config/server.properties
```

## Create a Kafka topic

As no-kafka package does not support creating topics, the topic needs to be manually created. (Kafka-node is a good alternative but in the forum it was explicitly mentioned to use no-kafka)

For the below command to work kafka path needs to be added to .bashrc

```bash
kafka-topics.sh --create --topic lookup.notification --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
```

## Local Node server setup

To deploy the server locally, run:

```bash
npm install
npm start
```

## Lint 

```bash
npm run lint
```

## Lint fix

```bash
npm run lint:fix
```

## Run the api in Postman (inside docs/)

Import the postman collection from `docs/`

## Validate if events have been sent 

```bash
kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic lookup.notification --from-beginning
```

You should get the req.body which you entered in api body


## Deploying the server in Heroku


### Pre-requisites

1. Heroku Installation (https://devcenter.heroku.com/articles/heroku-cli)

## Setup

1. Tracking the app in git 

```bash
git add .
git commit -m "My first commit"
```

2. For new heroku app, run both the below commands

```bash
heroku create
git remote -v
```

3. Deploying code

```bash
git push heroku master
```

4. Deploy from different branch

```bash
git push heroku testbranch:develop
```

## Code Structure

`ConsumerService` and `ProducerService` in services folder contains the business logic of the kafka consumer and producer. Any payload tranformation needs to be done in `ConsumerService`

`Events` inside controller folder controls the API request body. It send the request to the service.

`config` contains the environment variables

`logger.js` is used for logging into the console

`helper.js` contains functions like validating the event payload. Any error in the event structure will throw an error in the console (as done in tc-bus-api)

