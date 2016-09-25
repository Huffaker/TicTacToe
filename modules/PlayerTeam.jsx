import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
      if(this.props.team == 'champion')
        return <div>
          <h2>Welcome {this.props.profile.get('name')}</h2>
          <h3>You are the current Champion</h3>
          </div>
    return <div>
              <h2>Welcome {this.props.profile.get('name')}</h2>
              <h3>You are of the Crowd</h3>
          </div>
  }
});