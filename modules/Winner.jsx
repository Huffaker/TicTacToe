import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    render: function() {
        switch(this.props.winner) {
            case 0:
                return <h3 className="winner">Cats Game!</h3>
            case 1:
                return <h3 className="winner">Winner is Team O</h3>;
            case 2:
                return <h3 className="winner">Winner is Team X</h3>;
            default:
                if(this.props.playerTurn == 1)
                    return <h3 className="team">Current Turn: Champion</h3>
                else
                    return <h3 className="team">Current Turn: Crowd</h3>
        }
    }
});