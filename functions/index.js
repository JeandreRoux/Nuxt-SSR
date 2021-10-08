// const functions = require('firebase-functions');
// const { Nuxt } = require('nuxt-start');

// const nuxtConfig = require('./nuxt.config.js');

// const config = {
//   ...nuxtConfig,
//   dev: true,
//   debug: true,
//   buildDir: 'nuxt',
// };
// const nuxt = new Nuxt(config);

// exports.ssrapp = functions.https.onRequest(async (req, res) => {
//   await nuxt.ready();
//   nuxt.render(req, res);
// });

const functions = require('firebase-functions');
const express = require('express');
const { Nuxt } = require('nuxt');
const config = {
  dev: false,
  buildDir: 'nuxt',
  // Your config
};
const nuxt = new Nuxt(config);
const app = express();

nuxt.ready(); // <---------- Add this!

async function handleRequest(req, res) {
  res.set('Cache-Control', 'public, max-age=1, s-maxage=1');
  await nuxt.render(req, res);
}

app.get('*', handleRequest);
app.use(handleRequest);

exports.ssrapp = functions.https.onRequest(app);