import TweetListItem from '../../views/components/tweet-list-item'

const retweet = {
  retweeted_status: {
    text: 'Brilliant, simple and elegant. http://t.co/pIdioUP4xo',
    created_at: 'Thu May 14 10:13:07 +0000 2015',
    user: {
      profile_image_url: 'http://pbs.twimg.com/profile_images/1891304362/puppet_normal.jpeg',
      name: 'Nik Molnar'
    }
  }
}

const normalTweet = {
  text: 'Farewell, Saruman.\n\nhttp://t.co/O9dpvPNPnU',
  created_at: 'Thu Jun 11 15:57:31 +0000 2015',
  user: {
    profile_image_url: 'http://pbs.twimg.com/profile_images/' +
                       '378800000820012800/49028180b796d804080a41be2d7a3ec3_normal.png',
    name: 'Leo Iannacone'
  }
}

describe('TweetListItem', () => {
  it('render normal tweet', () => {
    const elem = $R(TestUtils.renderIntoDocument(
      <TweetListItem tweet={normalTweet} />
    ))

    expect(elem.find('.TweetListItem-header-name').text()).to.be.equal(normalTweet.user.name)
    expect(elem.find('.TweetListItem-header-avatar').get(0))
      .to.have.prop('src', normalTweet.user.profile_image_url)
    expect(elem.find('.TweetListItem-header-avatar').get(0))
      .to.have.prop('src', normalTweet.user.profile_image_url)

    expect(elem.find('.TweetListItem-text').html()).to.be.equal('Farewell, Saruman.\n\n' +
      '<a href="http://t.co/O9dpvPNPnU" rel="nofollow">http://t.co/O9dpvPNPnU</a>')
  })

  it('render retweet', () => {
    const elem = $R(TestUtils.renderIntoDocument(
      <TweetListItem tweet={retweet} />
    ))

    expect(elem.find('.TweetListItem-header-name').text())
      .to.be.equal(retweet.retweeted_status.user.name)
    expect(elem.find('.TweetListItem-header-avatar').get(0))
      .to.have.prop('src', retweet.retweeted_status.user.profile_image_url)
    expect(elem.find('.TweetListItem-header-avatar').get(0))
      .to.have.prop('src', retweet.retweeted_status.user.profile_image_url)

    expect(elem.find('.TweetListItem-text').html()).to.be.equal('Brilliant, simple and elegant. ' +
      '<a href="http://t.co/pIdioUP4xo" rel="nofollow">http://t.co/pIdioUP4xo</a>')
  })
})
