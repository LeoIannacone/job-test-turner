import React from 'react'
import twitterText from 'twitter-text'
import moment from 'moment'

export default React.createClass({
  displayName: 'TweetListItem',

  propTypes: {
    tweet: React.PropTypes.object.isRequired
  },

  _getTweetProp(prop) {
    const {tweet} = this.props
    if (tweet.retweeted_status) {
      return tweet.retweeted_status[prop]
    }
    return tweet[prop]
  },

  _getHeader() {
    const user = this._getTweetProp('user')
    return (
      <div className='TweetListItem-header'>
        <img className='TweetListItem-header-avatar' src={user.profile_image_url} />
        <span className='TweetListItem-header-name'>{user.name}</span>
      </div>
    )
  },

  _getFooter() {
    const created_at = this._getTweetProp('created_at')
    const time = moment(created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en')
      .format('hh:mm - l')

    return (
      <div className='TweetListItem-footer'>
        <span className='TweetListItem-footer-createdAt'>{time}</span>
      </div>
    )
  },

  _getContent() {
    const text = this._getTweetProp('text')
    const textHtml = twitterText.autoLink(text)
    return (
      <div className='TweetListItem-content'>
        <div className='TweetListItem-text'
          dangerouslySetInnerHTML={{__html: textHtml}}>
        </div>
      </div>
    )
  },

  render() {
    return (
      <div className='TweetListItem'>
        {this._getHeader()}
        {this._getContent()}
        {this._getFooter()}
      </div>
    )
  }
})
