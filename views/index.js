import _ from 'lodash'
import React from 'react'

import TweetsList from './components/tweet-list'

export default React.createClass({

  propTypes: {
    account: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      account: ''
    }
  },

  _getEmptyMessage() {
    return (
      <div className='emptyMessage'>
        You must specify a Twitter account in the URL.
      </div>
    )
  },

  render() {
    const {account, tweets} = this.props

    let title = 'Job Test Turner'
    let body
    let scripts

    if (_.isEmpty(account)) {
      body = this._getEmptyMessage()
    } else {
      title = `${account} tweets - ${title}`
      body = <TweetsList tweets={tweets} account={account} />
    }

    return (
      <html>
        <head>
          <meta charset='utf-8' />
          <title>{title}</title>
          <meta name='description' content='Show last 10 Tweets.' />
          <meta itemprop='name' content='Turner Tweets' />
          <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
          <link rel='stylesheet' href='/stylesheets/style.css' />
        </head>
        <body>
          {body}
        </body>
        {scripts}
      </html>
    )
  }
})
