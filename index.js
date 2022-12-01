
const yargs = require("yargs");
const fs = require('fs');
//const converter = require('json-2-csv')

const {
  Parser,
  transforms: { unwind, flatten },
} = require('json2csv');

const options = yargs
 .usage("Usage: <input.jsom> <output.txt>")
 //.option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
 .argv;

console.log({yargs});
console.log({options});

let paths = options._
let input = paths[0]
let output = paths[1]
let fields = [
	{label: 'ID', value:'items.item.id'},
	{label: 'Type', value:'items.item.type'},
	{label: 'Name', value:'items.item.name'},
	{label: 'Batter', value:'items.item.batters.batter.type'},
	{label: 'Topping', value:'items.item.topping.type'}
]
let unwinds = ''

console.log({input})
console.log({output})

let rawdata = fs.readFileSync(input);
let data = JSON.parse(rawdata);
console.log({data});

const json2csvParser = new Parser({
  fields,
  transforms: [unwind({ unwinds, blankOut: false }), flatten('__')],
});

const csv = json2csvParser.parse(data)

/*converter.json2csv(data, (err, csv) => {
    if (err) {
      throw err
    }
  
    // print CSV string
    console.log(csv)

    fs.writeFile(output, csv, err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
      })    
  })*/
 
 console.log(csv);
  
 fs.writeFile(output, csv, err => {
  if (err) {
     console.error(err)
     return
  }
  //file written successfully
 })    

  