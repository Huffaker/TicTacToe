import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Tile from './Tile'

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return <div className="board">
        {this.props.board.map((row,rowID)=> {
            return <div key={rowID}> {row.map((col, colID)=>{
                return <Tile key={rowID + '-' + colID } row={rowID} column={colID} />;
            })}</div>
        })}
    </div>;
  }
});


