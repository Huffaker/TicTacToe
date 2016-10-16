import React from 'react'

let headerStyle = {
  'background-color': "#0275d8",
  'color': '#ffffff',
  'padding':'25px'
};


export default React.createClass({
  render() {
    return (
      <div>
        <div class="bs-docs-header" id="content" tabindex="-1" style={headerStyle} >
          <div class="container" >
            <h1>Lets Play Tic Tac Toe!</h1>
          </div>
        </div>
        <div class="container" style={{'margin-left': '25px'}} >
          {this.props.children}
        </div>
    </div>
    )
  }
})