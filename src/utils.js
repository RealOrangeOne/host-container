const IN_TEST = process.env.NODE_ENV === 'test';

module.exports = {
  SERVE_DIR: IN_TEST ? 'site/' : process.argv[process.argv.length - 1],
  PORT: process.env.PORT || 5000,
  IN_TEST,
  IN_PRODUCTION: process.env.NODE_ENV === 'production'
};
