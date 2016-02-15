import React from 'react'

export default React.createClass({
  displayName: 'Error',

  render() {
    return (
      <html>
        <head>
          <title>Error</title>
          <link rel='stylesheet' href='/stylesheets/style.css' />
        </head>
        <body className='body--error'>
          <div className='Error-main'>
            <h1>Error</h1>
            <h2>{this.props.message}</h2>
          </div>
        </body>
      </html>
    )
  }
})
