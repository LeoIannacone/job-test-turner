import _ from 'lodash'
import React from 'react'

import TweetListItem from './tweet-list-item'

export default React.createClass({
  displayName: 'TweetList',

  propTypes: {
    account: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    tweets: React.PropTypes.array
  },

  getDefaultProps() {
    return {
      tweets: [],
      error: null
    }
  },

  render() {
    const {account, tweets, error} = this.props
    let body
    if (error) {
      body = (
        <div className='TweetList-error'>
          <h1>Error getting {account} tweets</h1>
          <h2>{error}</h2>
        </div>
      )
    } else if (_.isEmpty(tweets)) {
      body = (
        <div className='TweetList-empty'>
          <h1>Looks like {account} has no tweet!</h1>
        </div>
      )
    } else {
      const children = _.map(tweets, (tweet, i) => {
        return <TweetListItem tweet={tweet} key={i} />
      })
      body = (
        <div className='TweetList-list'>
          <h1>Latest {tweets.length} tweets of {account}</h1>
          {children}
        </div>
      )
    }

    return (
      <div className='TweetList'>
        {body}
      </div>
    )
  }
})
