import React from 'react'

export default React.createClass({
  render() {
    return (
      <html>
        <head><title>Error</title></head>
        <body>
          <h1>Error</h1>
          <h2>{this.props.message}</h2>
        </body>
      </html>
    )
  }
})
