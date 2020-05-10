const { program } = require('commander')
const { parseString } = require('xml2js')
const { readFileSync } = require('fs')
const { execFileSync } = require('child_process')

const DrawIO = '/Applications/draw.io.app/Contents/MacOS/draw.io'

program
    .name('drawio-export')
    .usage('[options] <input-file>')
    .option('-o <path>', 'Output path', './')
    .option('-f <format>', 'Output format', 'png')
    .option('-t', 'Transparent output for png')
    .option('-t', 'Transparent output for png')
    .option(
        '--width <pixels>',
        'Fits the generated image/pdf into the specified width, preserves aspect ratio.',
    )
    .option(
        '--height <pixels>',
        'Fits the generated image/pdf into the specified height, preserves aspect ratio.',
    )
    .parse(process.argv)

if (program.args.length !== 1) {
    program.help()
}

const [inputFile] = program.args

let input = readFileSync(inputFile).toString()
input = input.replace(/<(\/?)mxfile/g, '<$1xml')
parseString(input, (error, data) => {
    if (error) {
        console.log(error)
        process.exit(1)
    }
    let tab = 0
    for (const d of data.xml.diagram) {
        const name = d.$.name
        const outputFile = program.O + name + '.' + program.F
        console.log('Generating ' + outputFile)
        const opts = ['-x', inputFile, '-p', tab, '-o', outputFile]
        if (program.T) {
            opts.push('--transparent')
        }
        if (program.width) {
            opts.push('--width', program.width)
        }
        if (program.height) {
            opts.push('--height', program.height)
        }
        execFileSync(DrawIO, opts)
        tab++
    }
})
