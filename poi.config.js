module.exports = {
  presets: [require('poi-preset-react')()],
  entry: './src/index.jsx',
  webpack: config => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.alias,
        Babel: '@babel/standalone',
      },
    },
  }),
  homepage: 'https://mmiller42.github.io/jsx-to-rjs/',
  dist: 'docs',
}
