const withImages = require('next-images');

module.exports = withImages({
  esModule: true,
  images: {
    domains: [
      'googleusercontent.com',
      'lh3.googleusercontent.com',
      'lh4.googleusercontent.com',
      'lh5.googleusercontent.com',
      'lh6.googleusercontent.com',
    ],
  },
})