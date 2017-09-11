const dust = require('dustjs-linkedin');
const fs = require('fs');
const https = require('https');
const request=require('request')
const csv=require('csvtojson')

let events = []

// Read csv from google and transform to json
csv()
.fromStream(request.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vTQWap9RdXHW4WyFWv5Dv31S2WGfNQNtB0dPpKfaF4gvtONU4mrdaz9ae54NoQEmjqN7vFxKpyGCIKL/pub?gid=0&single=true&output=csv'))
.on('json',(csvRow)=>{
    events.push(csvRow);
})
.on('done',(error)=>{
    if (error) console.log('ERROR occurred while downloading and parsing csv file: ', error);

    gernate('rss.template.tpl', './src/assets/news.xml');
    gernate('json.template.tpl', './src/app/events/events.ts');
})

const gernate = function(template, output) {
    const src = fs.readFileSync(template, 'utf8');
    const compiled = dust.compile(src, template);
    dust.loadSource(compiled);
    dust.render(template, { events: events }, function (err, out) {
        fs.writeFile(output, out, (err) => {  
            if (err) console.log(err);
        });
    });
}