/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _compression = __webpack_require__(3);

	var _compression2 = _interopRequireDefault(_compression);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(5);

	var _reactRouter = __webpack_require__(6);

	var _routes = __webpack_require__(7);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)();

	app.use((0, _compression2.default)());

	__dirname = _path2.default.resolve();

	// serve our static stuff like index.css
	app.use(_express2.default.static(_path2.default.join(__dirname, 'dist'), { index: false }));

	// send all requests to index.html so browserHistory works
	app.get('*', function (req, res) {
	  res.sendFile(_path2.default.join(__dirname, 'dist', 'index.html'));
	});

	var PORT = process.env.PORT || 8080;
	app.listen(PORT, function () {
	  console.log('Production Express server running at localhost:' + PORT);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	var _App = __webpack_require__(8);

	var _App2 = _interopRequireDefault(_App);

	var _Home = __webpack_require__(9);

	var _About = __webpack_require__(15);

	var _About2 = _interopRequireDefault(_About);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home.HomeContainer }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/about', component: _About2.default })
	);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'App',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { style: { margin: '25px' } },
	      _react2.default.createElement(
	        'h1',
	        null,
	        'Lets Play Tick Tack Toe!'
	      ),
	      this.props.children
	    );
	  }
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.HomeContainer = undefined;

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactAddonsPureRenderMixin = __webpack_require__(10);

	var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

	var _reactRedux = __webpack_require__(11);

	var _Winner = __webpack_require__(12);

	var _Winner2 = _interopRequireDefault(_Winner);

	var _Board = __webpack_require__(13);

	var _Board2 = _interopRequireDefault(_Board);

	var _action_creators = __webpack_require__(14);

	var actionCreators = _interopRequireWildcard(_action_creators);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Home = _react2.default.createClass({
	  displayName: 'Home',

	  mixins: [_reactAddonsPureRenderMixin2.default],
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(_Board2.default, this.props),
	      _react2.default.createElement(_Winner2.default, { ref: 'winner', winner: this.props.winner, playerTurn: this.props.playerTurn })
	    );
	  }
	});

	var mapStateToProps = function mapStateToProps(state) {
	  return {
	    board: state.get('board'),
	    playerTurn: state.get('playerTurn'),
	    winner: state.get('winner')
	  };
	};
	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	  return {
	    select: function select(entry) {
	      dispatch(actionCreators.selectSquare(entry));
	    },
	    reset: function reset() {
	      dispatch(actionCreators.resetGame());
	    }
	  };
	};

	var HomeContainer = exports.HomeContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Home);

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("react-addons-pure-render-mixin");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactAddonsPureRenderMixin = __webpack_require__(10);

	var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	    displayName: 'Winner',

	    mixins: [_reactAddonsPureRenderMixin2.default],
	    render: function render() {
	        switch (this.props.winner) {
	            case 0:
	                return _react2.default.createElement(
	                    'h3',
	                    { className: 'winner' },
	                    'Cats Game!'
	                );
	            case 1:
	                return _react2.default.createElement(
	                    'h3',
	                    { className: 'winner' },
	                    'Winner is Team O'
	                );
	            case 2:
	                return _react2.default.createElement(
	                    'h3',
	                    { className: 'winner' },
	                    'Winner is Team X'
	                );
	            default:
	                if (this.props.playerTurn == 1) return _react2.default.createElement(
	                    'h3',
	                    { className: 'team' },
	                    'Current Turn: Team O'
	                );else return _react2.default.createElement(
	                    'h3',
	                    { className: 'team' },
	                    'Current Turn: Team X'
	                );
	        }
	    }
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactAddonsPureRenderMixin = __webpack_require__(10);

	var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MarkO = _react2.default.createClass({
	    displayName: 'MarkO',

	    render: function render() {
	        return _react2.default.createElement(
	            'svg',
	            { xmlns: 'http://www.w3.org/2000/svg', width: '100', height: '100', viewBox: '0 0 100 100', style: { paddingLeft: '6px' } },
	            _react2.default.createElement(
	                'g',
	                { fill: '#444', transform: 'scale(0.1 0.1)' },
	                _react2.default.createElement('path', { d: 'M438.857 201.143q-84.571 0-156 41.714t-113.143 113.143-41.714 156 41.714 156 113.143 113.143 156 41.714 156-41.714 113.143-113.143 41.714-156-41.714-156-113.143-113.143-156-41.714zM877.714 512q0 119.429-58.857 220.286t-159.714 159.714-220.286 58.857-220.286-58.857-159.714-159.714-58.857-220.286 58.857-220.286 159.714-159.714 220.286-58.857 220.286 58.857 159.714 159.714 58.857 220.286z' })
	            )
	        );
	    } });

	var MarkX = _react2.default.createClass({
	    displayName: 'MarkX',

	    render: function render() {
	        return _react2.default.createElement(
	            'svg',
	            { xmlns: 'http://www.w3.org/2000/svg', width: '100', height: '100', viewBox: '0 0 100 100' },
	            _react2.default.createElement(
	                'g',
	                { fill: '#444', transform: 'scale(0.1 0.1)' },
	                _react2.default.createElement('path', { d: 'M960 780.736l-268.992-268.736 268.992-268.736-179.264-179.264-268.736 268.864-268.864-268.864-179.136 179.264 268.736 268.736-268.736 268.736 179.136 179.264 268.864-268.864 268.736 268.864z' })
	            )
	        );
	    } });

	var rowStyle = {
	    height: '106px'
	};

	var Row = _react2.default.createClass({
	    displayName: 'Row',

	    render: function render() {
	        var rowID = this.props.rowID;
	        var select = this.props.select;
	        var playerTurn = this.props.playerTurn;
	        return _react2.default.createElement(
	            'div',
	            { className: 'Row', style: rowStyle },
	            this.props.row.map(function (col, colID) {
	                return _react2.default.createElement(Tile, { key: rowID + '-' + colID,
	                    row: rowID,
	                    column: colID,
	                    val: col,
	                    select: select,
	                    playerTurn: playerTurn });
	            })
	        );
	    }
	});

	var style = {
	    display: 'inline-block',
	    width: '100px',
	    height: '100px',
	    border: 'solid 1px #666',
	    marginRight: '4px',
	    verticalAlign: 'top'
	};

	var Tile = _react2.default.createClass({
	    displayName: 'Tile',

	    mixins: [_reactAddonsPureRenderMixin2.default],
	    render: function render() {
	        var _this = this;

	        var svg = '';
	        if (this.props.val == 1) svg = _react2.default.createElement(MarkO, null);else if (this.props.val == 2) svg = _react2.default.createElement(MarkX, null);
	        return _react2.default.createElement(
	            'div',
	            { style: style,
	                onClick: function onClick() {
	                    return _this.props.select({
	                        team: _this.props.playerTurn,
	                        column: _this.props.column,
	                        row: _this.props.row
	                    });
	                }
	            },
	            svg
	        );
	    }
	});

	exports.default = _react2.default.createClass({
	    displayName: 'Board',

	    mixins: [_reactAddonsPureRenderMixin2.default],
	    render: function render() {
	        var _this2 = this;

	        var reset = '';
	        if (this.props.winner > -1) {
	            reset = _react2.default.createElement(
	                'button',
	                { onClick: function onClick() {
	                        return _this2.props.reset();
	                    } },
	                'Reset'
	            );
	        }
	        return _react2.default.createElement(
	            'div',
	            { className: 'board' },
	            this.props.board.map(function (row, rowID) {
	                return _react2.default.createElement(Row, _extends({ key: rowID, rowID: rowID, row: row }, _this2.props));
	            }),
	            ' ',
	            reset
	        );
	    }
	});

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.selectSquare = selectSquare;
	exports.resetGame = resetGame;
	function selectSquare(entry) {
	  return {
	    type: 'SELECT',
	    entry: entry
	  };
	}

	function resetGame() {
	  return {
	    type: 'RESET'
	  };
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactAddonsPureRenderMixin = __webpack_require__(10);

	var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'About',

	  mixins: [_reactAddonsPureRenderMixin2.default],
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      'About Page'
	    );
	  }
	});

/***/ }
/******/ ]);