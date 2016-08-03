import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const rowStyle = {
    height: '60px'
};

var Row = React.createClass({
    render: function() {
        const rowID = this.props.rowID;
        const select = this.props.select;
        const playerTurn = this.props.playerTurn;
        return <div className="Row" style={rowStyle}>
            {this.props.row.map((col, colID)=> {
                return <Tile key={rowID + '-' + colID } 
                            row={rowID} 
                            column={colID}
                            val={col}
                            select={select}
                            playerTurn={playerTurn}/>;
            })}
        </div>;
    }
});

const style = {
    display: 'inline-block',
    width: '50px',
    height: '50px',
    border: 'solid 1px black',
    marginRight: '4px',
    verticalAlign: 'top'
};

var Tile = React.createClass({
    mixins: [PureRenderMixin],
	render: function() {
        return <div style={style}
            onClick={() =>
                this.props.select({
                    team: this.props.playerTurn,
                    column: this.props.column,
                    row: this.props.row
                })
            }
        >{this.props.val == 1? 'O':(this.props.val == 2?'X':'')}</div>;
    }
});

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
      if(this.props.winner)
        return <button onClick={()=>
            this.props.reset()
        }>Reset</button>
    return <div className="board">
        {this.props.board.map((row,rowID)=> {
            return <Row key={rowID} rowID={rowID} row={row} {...this.props} />;
        })}
    </div>;
  }
});


