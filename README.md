# drawio-export

Uses [drawio-desktop](https://github.com/jgraph/drawio-desktop) to export all diagrams in a drawio file into one png or svg per page.

## Usage

npm install -g drawio-export

```
Usage: drawio-export [options] <input-file>

Options:
  -o <path>          Output path (default: "./")
  -f <format>        Output format (default: "png")
  -t                 Transparent output for png
  --scale <scale>    Scale for png
  --watch            Watch input file for changes
  --width <pixels>   Fits the generated image/pdf into the specified width, preserves aspect ratio.
  --height <pixels>  Fits the generated image/pdf into the specified height, preserves aspect ratio.
  -h, --help         display help for command
```
