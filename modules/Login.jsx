import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  getInitialState: function() {
    return {tempScreenName: ''};
  },
  onInputChange: function(e) {
    this.setState({tempScreenName: e.target.value});
  },
  onSumbit: function() {
        this.props.login({
            playerName: this.state.tempScreenName
        })
  },
  render: function() {
    return <div>
            <h2>Enter your ScreenName:</h2>
            <input type="text" onChange={this.onInputChange} />
            <button onClick={this.onSumbit}>Submit</button>
        </div>;
  }
});