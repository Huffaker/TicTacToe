import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  getInitialState: function() {
    return {tempScreenName: ''};
  },
  onInputChange: function(e) {
    this.setState({tempScreenName: e.target.value});
  },
  onSubmit: function(e,r) {
        e.preventDefault();
        r.props.login({
            playerName: r.state.tempScreenName
        })
  },
  render: function() {
    return <form  onSubmit={(e,r)=>this.onSubmit(e,this)} >
            <h2>Enter your ScreenName:</h2>
            <input type="text" onChange={this.onInputChange} />
            <input type="submit" />
        </form>;
  }
});