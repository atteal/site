const Metalsmith = require('metalsmith');
const contentful = require('contentful-metalsmith');
const debug = require('metalsmith-debug');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown');
const permalinks  = require('metalsmith-permalinks');

console.log(JSON.stringify(process.env, null, 2));

Metalsmith(__dirname)
    .source('./app')
    .destination('./public')
    .ignore([
        '**/*.scss',
        '**/*.pug',
        'partials'
    ])
    .clean(true)
    .use(contentful({
        'access_token': process.env.CONTENTFUL_API_KEY,
        'space_id': process.env.CONTENTFUL_SPACE_ID
    }))
    .use(permalinks({
        relative: false
    }))
    .use(layouts({
        directory: 'app/layouts',
        engine: 'pug'
    }))
    .use(markdown({
        smartypants: true
    }))
    .use(debug())
    .build(function (err) {
        if (err) console.log(err);
    });