const withImages = require('next-images');

module.exports = withImages({
  esModule: true,
  images: {
    domains: [
      'googleusercontent.com',
      'lh3.googleusercontent.com'
    ],
  },
})