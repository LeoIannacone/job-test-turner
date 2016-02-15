import _ from 'lodash'
import proxyquire from 'proxyquire'

const stubListElem = React.createClass({
  propTypes: {
    tweet: React.PropTypes.number.isRequired
  },
  render() {
    return <div className='stubListElem' />
  }
})

const TweetList = proxyquire('../../views/components/tweet-list', {
  './tweet-list-item': stubListElem
})

describe('TweetList', () => {
  it('renders tweets', () => {
    const size = 7
    const fakeTweets = _.range(0, size)
    const account = 'Test Name'
    const elem = $R(TestUtils.renderIntoDocument(
      <TweetList account={account} tweets={fakeTweets} />
    ))

    expect(elem.find('.TweetList-error')).to.have.length(0)
    expect(elem.find('.TweetList-empty')).to.have.length(0)
    expect(elem.find('h1').text()).to.contains(account)
    expect(elem.find('h1').text()).to.contains(`Latest ${size} tweets`)
    expect(elem.find('.stubListElem')).to.have.length(size)
  })

  it('renders error', () => {
    const error = 'This is a error'
    const account = 'Test Name'
    const elem = $R(TestUtils.renderIntoDocument(
      <TweetList account={account} error={error} />
    ))

    expect(elem.find('.stubListElem')).to.have.length(0)
    expect(elem.find('.TweetList-error')).to.have.length(1)
    expect(elem.find('h1').html()).to.contains(account)
    expect(elem.find('h2').html()).to.contains(error)
  })

  it('renders empty list', () => {
    const account = 'Test Name'
    const elem = $R(TestUtils.renderIntoDocument(
      <TweetList account={account} tweets={[]} />
    ))

    expect(elem.find('.stubListElem')).to.have.length(0)
    expect(elem.find('.TweetList-error')).to.have.length(0)
    expect(elem.find('.TweetList-empty')).to.have.length(1)
    expect(elem.find('h1').html()).to.contains(account)
    expect(elem.find('h1').html()).to.contains('has no tweet!')
  })
})
