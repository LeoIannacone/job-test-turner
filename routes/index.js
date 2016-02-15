import _ from 'lodash'
import express from 'express'
import Twitter from 'twitter'

import config from '../config.json'

const router = express.Router()

const client = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
})

const render_tweets = (account, res) => {
  client.get('/statuses/user_timeline.json', {
    count: config.twitter.number_of_tweets,
    screen_name: account
  }, (error, tweets) => {
    if (error) {
      res.render('error', {message: error[0].message})
    } else {
      res.render('index', {account, tweets})
    }
  })
}

router.get('/cnnbrk-tweets', (req, res, next) => {
  render_tweets('cnnbrk', res)
})

router.get('/*', (req, res, next) => {
  const {path} = req
  const account = path.indexOf('/') === 0 ? path.substring(1) : path
  if (_.isEmpty(account)) {
    res.redirect('/cnnbrk-tweets')
  } else {
    render_tweets(account, res)
  }
})

module.exports = router
