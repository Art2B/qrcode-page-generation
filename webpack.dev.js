const { mergeWithRules  } = require('webpack-merge');
const _ = require('lodash');

const common = require('./webpack.common.js');

module.exports = mergeWithRules(
  {
    module: {
      rules: {
        test: "match",
        use: {
          loader: "match",
          options: "replace",
        },
      },
    },
  }
)(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
   rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
   ],
 },
});