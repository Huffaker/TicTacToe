import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const MarkO = React.createClass({
    render: function() {return <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" style={{paddingLeft: '6px'}}><g fill="#444" transform="scale(0.1 0.1)"><path d="M438.857 201.143q-84.571 0-156 41.714t-113.143 113.143-41.714 156 41.714 156 113.143 113.143 156 41.714 156-41.714 113.143-113.143 41.714-156-41.714-156-113.143-113.143-156-41.714zM877.714 512q0 119.429-58.857 220.286t-159.714 159.714-220.286 58.857-220.286-58.857-159.714-159.714-58.857-220.286 58.857-220.286 159.714-159.714 220.286-58.857 220.286 58.857 159.714 159.714 58.857 220.286z" /></g></svg>;
}});

const MarkX = React.createClass({
    render: function() {return <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><g fill="#444" transform="scale(0.1 0.1)"><path d="M960 780.736l-268.992-268.736 268.992-268.736-179.264-179.264-268.736 268.864-268.864-268.864-179.136 179.264 268.736 268.736-268.736 268.736 179.136 179.264 268.864-268.864 268.736 268.864z" /></g></svg>;
}});

const rowStyle = {
    height: '106px'
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
    width: '100px',
    height: '100px',
    border: 'solid 1px #666',
    marginRight: '4px',
    verticalAlign: 'top'
};


var Tile = React.createClass({
    mixins: [PureRenderMixin],
	render: function() {
        let svg = '';
        if(this.props.val == 1)
            svg = <MarkO/>
        else if(this.props.val == 2)
            svg = <MarkX/>
        return <div style={style}
            onClick={() =>
                this.props.select({
                    team: this.props.playerTurn,
                    column: this.props.column,
                    row: this.props.row
                })
            }
        >{svg}</div>;
    }
});

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
      let reset = '';
        if(this.props.winner > -1) {
            reset = <button onClick={()=>
                    this.props.reset()
                }>Reset</button>;
        }
        return <div className="board">
            {this.props.board.map((row,rowID)=> {
	            return	<Row key={rowID} rowID={rowID} row={row} {...this.props} />;
            })} {reset}
            </div> ;
  }
});


