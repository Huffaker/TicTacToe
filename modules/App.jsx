import React from 'react'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>Lets Play Tick Tack Toe!</h1>
        {this.props.children}
      </div>
    )
  }
})