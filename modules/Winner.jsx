import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    switch(this.props.winner) {
        case 0:
            return <div className="winner">Cats Game!</div>
        case 1:
            return <div className="winner">Winner is Team O</div>;
        case 2:
            return <div className="winner">Winner is Team X</div>;
        default:
            if(this.props.playerTurn == 1)
                return <div className="team">Turn: Team O</div>
            else
                return <div className="team">Turn: Team X</div>
    }
  }
});