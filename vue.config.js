module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts',
      title: 'BitcoinApp',
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/bitcoin-app/'
    : '/',
}
