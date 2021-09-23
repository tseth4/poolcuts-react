const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@views': path.resolve(__dirname, 'src/views/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
    },
  },
};