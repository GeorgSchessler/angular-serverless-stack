const dust = require('dustjs-linkedin');
const fs = require('fs');
const https = require('https');
const request = require('request')
const csv = require('csvtojson')
const package = require('./package.json');

let events = []

csv()
    .fromStream(request.get(package.config.eventcsv))
    .on('json', (csvRow) => {
        events.push(csvRow);
    })
    .on('done', (error) => {
        if (error) console.log('ERROR occurred while downloading and parsing csv file: ', error);

        generate('rss.template.tpl', './src/assets/news.xml');
        generate('json.template.tpl', './src/app/events/events.ts');
    })

const generate = function (template, output) {
    const src = fs.readFileSync(template, 'utf8');
    const compiled = dust.compile(src, template);
    dust.loadSource(compiled);
    dust.render(template, { events: events }, function (err, out) {
        fs.writeFile(output, out, (err) => {
            if (err) console.log(err);
        });
    });
}