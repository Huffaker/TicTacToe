import React from 'react'

export default React.createClass({
  render() {
    return (
      <div style={{margin:'25px'}}>
        <h1>Lets Play Tic Tac Toe!</h1>
        {this.props.children}
      </div>
    )
  }
})