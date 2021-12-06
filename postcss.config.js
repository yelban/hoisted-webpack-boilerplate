module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      browsers: [
        'last 2 versions',
        'ie > 10',
      ],
      // stage: 0,
    },
    //   'cssnano': {},
  },
};
