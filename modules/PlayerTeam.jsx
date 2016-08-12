import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
      if(this.props.team == 'champion')
        return <h2>You are the current Champion</h2>
    return <h2>You are of the Crowd</h2>
  }
});