import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const style = {
    display: 'inline-block',
    width: '50px',
    height: '50px',
    border: 'solid 1px black',
    marginRight: '4px'
}

export default React.createClass({
    mixins: [PureRenderMixin],
	render: () => {
        return <div style={style} ></div>;
    }
});

// onClick={
//             this.props.selectSquare({
//                 team: this.props.playerTurn,
//                 column: this.props.col,
//                 row: this.props.row
//             })
//         }