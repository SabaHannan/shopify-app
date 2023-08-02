const path = require('path');

module.exports = {
  entry: './web/frontend/components/slickImage.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'extensions/js'),
  },
};
