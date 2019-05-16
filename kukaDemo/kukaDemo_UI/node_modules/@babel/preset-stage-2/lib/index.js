"use strict";

exports.__esModule = true;
exports.default = void 0;

var _helperPluginUtils = require("@babel/helper-plugin-utils");

var _presetStage = _interopRequireDefault(require("@babel/preset-stage-3"));

var _pluginProposalFunctionSent = _interopRequireDefault(require("@babel/plugin-proposal-function-sent"));

var _pluginProposalExportNamespaceFrom = _interopRequireDefault(require("@babel/plugin-proposal-export-namespace-from"));

var _pluginProposalNumericSeparator = _interopRequireDefault(require("@babel/plugin-proposal-numeric-separator"));

var _pluginProposalThrowExpressions = _interopRequireDefault(require("@babel/plugin-proposal-throw-expressions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _helperPluginUtils.declare)(function (api, opts) {
  api.assertVersion(7);
  var loose = false;
  var useBuiltIns = false;

  if (opts !== undefined) {
    if (opts.loose !== undefined) loose = opts.loose;
    if (opts.useBuiltIns !== undefined) useBuiltIns = opts.useBuiltIns;
  }

  if (typeof loose !== "boolean") {
    throw new Error("@babel/preset-stage-2 'loose' option must be a boolean.");
  }

  if (typeof useBuiltIns !== "boolean") {
    throw new Error("@babel/preset-stage-2 'useBuiltIns' option must be a boolean.");
  }

  return {
    presets: [[_presetStage.default, {
      loose: loose,
      useBuiltIns: useBuiltIns
    }]],
    plugins: [_pluginProposalFunctionSent.default, _pluginProposalExportNamespaceFrom.default, _pluginProposalNumericSeparator.default, _pluginProposalThrowExpressions.default]
  };
});

exports.default = _default;