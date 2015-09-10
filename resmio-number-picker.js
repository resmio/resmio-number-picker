"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var PersonPicker = (function (_React$Component) {
  _inherits(PersonPicker, _React$Component);

  _createClass(PersonPicker, [{
    key: "render",
    value: function render() {
      return _reactAddons2["default"].createElement(
        "div",
        { className: "panel__input" },
        _reactAddons2["default"].createElement(
          "span",
          { className: "component__label" },
          "People"
        ),
        _reactAddons2["default"].createElement(
          "div",
          { className: "person-picker__container" },
          this._renderPreviousButton(),
          this._renderListOfNumbers(),
          this._renderNextButton()
        )
      );
    }
  }]);

  function PersonPicker(props) {
    _classCallCheck(this, PersonPicker);

    _get(Object.getPrototypeOf(PersonPicker.prototype), "constructor", this).call(this, props);
    // We trigger the action to get the availabilities for today from here
    // This will update the state , so we render it properly
    this.state = {};
    this.state.numberElements = this._generateViewArray();
    this.state.groupWithSelectedElement = this._getGroupWithSelectedElement();
    this.state.numberOfGroups = this._getNumberOfGroups();
    // We need to bind functions here so this won't refer to React
    // Will be solved in ES7
    this._handleNumberClick = this._handleNumberClick.bind(this);
    this._handleNextButtonClick = this._handleNextButtonClick.bind(this);
    this._handlePreviousButtonClick = this._handlePreviousButtonClick.bind(this);
  }

  // -----------------------------------------------------------------------------
  // Props validation
  // -----------------------------------------------------------------------------

  // -----------------------------------------------------------------------------
  // State changers
  // -----------------------------------------------------------------------------

  _createClass(PersonPicker, [{
    key: "_generateViewArray",
    value: function _generateViewArray() {
      var _this = this;

      // Creates an array with the numbers for the covers
      // We want it to start at one hence the +1 there
      var availableCovers = Array.from(new Array(this.props.numbersInTotal), function (x, i) {
        return i + 1;
      });

      // Now  we split it into several arrays
      var availableCoversUiGroups = availableCovers.map(function (element, index) {
        return index % _this.props.numbersPerGroup === 0 ? availableCovers.slice(index, index + _this.props.numbersPerGroup) : null;
      })
      // We filter to remove the arrays with null
      .filter(function (element) {
        return element;
      });

      return availableCoversUiGroups;
    }
  }, {
    key: "_getGroupWithSelectedElement",
    value: function _getGroupWithSelectedElement() {
      return Math.floor(this.props.selectedNumber / (this.props.numbersPerGroup + 1));
    }
  }, {
    key: "_getNumberOfGroups",
    value: function _getNumberOfGroups() {
      return Math.ceil(this.props.numbersInTotal / this.props.numbersPerGroup);
    }

    // -----------------------------------------------------------------------------
    // Html Generators
    // -----------------------------------------------------------------------------

  }, {
    key: "_renderListOfNumbers",
    value: function _renderListOfNumbers() {
      return _reactAddons2["default"].createElement(
        "ul",
        {
          className: "person-picker__list-container",
          onClick: this._handlePersonPickerClick },
        this._renderNumbers()
      );
    }
  }, {
    key: "_renderNumbers",
    value: function _renderNumbers() {
      var _this2 = this;

      return this.state.numberElements[this.state.groupWithSelectedElement].map(function (number) {
        return _reactAddons2["default"].createElement(
          "li",
          {
            className: number === _this2.props.selectedNumber ? 'person-picker__number--selected' : 'person-picker__number',
            key: number,
            onClick: _this2._handleNumberClick.bind(_this2, number)
          },
          number
        );
      });
    }
  }, {
    key: "_renderNextButton",
    value: function _renderNextButton() {
      // We check this before the state.groupWithSelectedElement is changed,
      // so we add one to the check
      if (this.state.groupWithSelectedElement + 1 !== this.state.numberOfGroups) {
        return _reactAddons2["default"].createElement(
          "a",
          { href: "#",
            className: "person-picker__button--next",
            onClick: this._handleNextButtonClick },
          "❯"
        );
      }
    }
  }, {
    key: "_renderPreviousButton",
    value: function _renderPreviousButton() {
      if (this.state.groupWithSelectedElement !== 0) {
        return _reactAddons2["default"].createElement(
          "a",
          { href: "#",
            className: "person-picker__button--previous",
            onClick: this._handlePreviousButtonClick },
          "❮"
        );
      }
      return _reactAddons2["default"].createElement(
        "a",
        { href: "#",
          className: "person-picker__button--disabled"
        },
        "❮"
      );
    }

    // -----------------------------------------------------------------------------
    // Event handlers
    // -----------------------------------------------------------------------------

  }, {
    key: "_handleNumberClick",
    value: function _handleNumberClick(number) {
      this.actionWhenSelected(number);
    }
  }, {
    key: "_handleNextButtonClick",
    value: function _handleNextButtonClick() {
      this.setState({ groupWithSelectedElement: this.state.groupWithSelectedElement + 1 });
    }
  }, {
    key: "_handlePreviousButtonClick",
    value: function _handlePreviousButtonClick() {
      this.setState({ groupWithSelectedElement: this.state.groupWithSelectedElement - 1 });
    }
  }]);

  return PersonPicker;
})(_reactAddons2["default"].Component);

exports["default"] = PersonPicker;
PersonPicker.propTypes = {
  actionWhenSelected: _reactAddons2["default"].PropTypes.func.isRequired,
  selectedNumber: _reactAddons2["default"].PropTypes.number.isRequired,
  numbersInTotal: _reactAddons2["default"].PropTypes.number.isRequired,
  numbersPerGroup: _reactAddons2["default"].PropTypes.number.isRequired
};
module.exports = exports["default"];

