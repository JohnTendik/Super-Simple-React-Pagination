"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./pagination.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LEFT_PAGE = 'LEFT';
var RIGHT_PAGE = 'RIGHT';

var Pagination =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Pagination, _React$Component);

  function Pagination(props) {
    var _this;

    _classCallCheck(this, Pagination);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Pagination).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "range", function (from, to) {
      var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var i = from;
      var range = [];

      while (i <= to) {
        range.push(i);
        i += step;
      }

      return range;
    });

    _defineProperty(_assertThisInitialized(_this), "updatePage", function (i) {
      var page = i;

      _this.setState({
        page: page
      });
    });

    _defineProperty(_assertThisInitialized(_this), "fetchPageNumbers", function () {
      var totalPages = Math.ceil(_this.state.totalItems / _this.state.itemPerPage);
      var currentPage = _this.state.page;
      var pageNeighbours = _this.state.pageNeighbours;
      /**
       * totalNumbers: the total page numbers to show on the control
       * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
       */

      var totalNumbers = pageNeighbours * 2 + 3;
      var totalBlocks = totalNumbers + 2;

      if (totalPages > totalBlocks) {
        var startPage = Math.max(2, currentPage - pageNeighbours);
        var endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

        var pages = _this.range(startPage, endPage);
        /**
         * hasLeftSpill: has hidden pages to the left
         * hasRightSpill: has hidden pages to the right
         * spillOffset: number of hidden pages either to the left or to the right
         */


        var hasLeftSpill = startPage > 2;
        var hasRightSpill = totalPages - endPage > 1;
        var spillOffset = totalNumbers - (pages.length + 1);

        switch (true) {
          // handle: (1) < {5 6} [7] {8 9} (10)
          case hasLeftSpill && !hasRightSpill:
            {
              var extraPages = _this.range(startPage - spillOffset, startPage - 1);

              pages = [LEFT_PAGE].concat(_toConsumableArray(extraPages), _toConsumableArray(pages));
              break;
            }
          // handle: (1) {2 3} [4] {5 6} > (10)

          case !hasLeftSpill && hasRightSpill:
            {
              var _extraPages = _this.range(endPage + 1, endPage + spillOffset);

              pages = [].concat(_toConsumableArray(pages), _toConsumableArray(_extraPages), [RIGHT_PAGE]);
              break;
            }
          // handle: (1) < {4 5} [6] {7 8} > (10)

          case hasLeftSpill && hasRightSpill:
          default:
            {
              pages = [LEFT_PAGE].concat(_toConsumableArray(pages), [RIGHT_PAGE]);
              break;
            }
        }

        return [1].concat(_toConsumableArray(pages), [totalPages]);
      }

      return _this.range(1, totalPages);
    });

    _defineProperty(_assertThisInitialized(_this), "renderPagination", function () {
      var pages = _this.fetchPageNumbers();

      return _react["default"].createElement("nav", {
        className: "jt-pagination ".concat(_this.props.className)
      }, pages.map(function (page) {
        return page === LEFT_PAGE ? _react["default"].createElement("button", {
          className: _this.state.page === page ? 'here' : '',
          key: page,
          onClick: function onClick() {
            return _this.updatePage(_this.state.page - 1);
          }
        }, _this.state.prevText) : page === RIGHT_PAGE ? _react["default"].createElement("button", {
          className: _this.state.page === page ? 'here' : '',
          key: page,
          onClick: function onClick() {
            return _this.updatePage(_this.state.page + 1);
          }
        }, _this.state.nextText) : _react["default"].createElement("button", {
          key: page,
          className: _this.state.page === page ? 'here' : '',
          onClick: function onClick() {
            return _this.updatePage(page);
          }
        }, page);
      }));
    });

    _this.state = {
      page: 1,
      // current page number
      pageNeighbours: props.pageNeighbours,
      // how many neighbours should the center item have (1) < {5 6} [7] {8 9} (10)
      itemPerPage: props.itemPerPage,
      // length of items per page
      totalItems: _react["default"].Children.toArray(props.children).length,
      // total number of items
      prevText: props.prevText,
      nextText: props.nextText
    };
    return _this;
  }

  _createClass(Pagination, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: "jt-pagination-container"
      }, this.props.paginationBefore && this.renderPagination(), _react["default"].createElement("main", {
        className: "jt-pagination-children"
      }, _react["default"].Children.toArray(this.props.children).splice((this.state.page - 1) * this.state.itemPerPage, this.state.itemPerPage)), this.renderPagination());
    }
  }]);

  return Pagination;
}(_react["default"].Component);

Pagination.defaultProps = {
  itemPerPage: 10,
  prevText: 'Prev',
  nextText: 'Next',
  pageNeighbours: 1,
  className: '',
  paginationBefore: false
};
Pagination.propTypes = {
  className: _propTypes["default"].string,
  itemPerPage: _propTypes["default"].number,
  prevText: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string]),
  nextText: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string]),
  paginationBefore: _propTypes["default"].bool,
  children: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].node), _propTypes["default"].node]).isRequired
};
var _default = Pagination;
exports["default"] = _default;