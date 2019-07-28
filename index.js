const blessed = require('blessed');

let a = [];
let height = 16;
let width  = 16;

function init() {
  for (let i=0; i<height; i++){
    for (let j=0; j<width; j++){
      a[i*width + j] = 0;
    }
  }  
}

function pprint() {
  for (let i=0; i<height; i++){
    let ln = "";
    for (let j=0; j<width; j++){
      ln += a[i*width + j] ? "*" : ".";
      //ln += " ";
    }
    console.log(ln);
  }
}

let toCheck = [-1*(width+1), -1*width, -1*(width-1), -1, 1, width -1, width, width+1];

function step() {
  for (let i=0; i<height; i++){
    for (let j=0; j<width; j++){
      let curCell = i*width + j;
      let isAlive = a[curCell];
      let liveCount = 0;
      for (let x=0; x<toCheck.length; x++) {
        if (curCell+toCheck[x] >= 0) {
          liveCount += a[curCell+toCheck[x]] ? 1 : 0;
        }        
      }
      if (isAlive && liveCount < 2) {
        a[i*width + j] = 0;
      } else if (isAlive && (liveCount == 2 || liveCount == 3)) {
        //a[i*width + j] = 0;
      } else if (isAlive && liveCount > 3) {
        a[i*width + j] = 0;
      } else if (!isAlive && liveCount == 3) {
        a[i*width + j] = 1;
      } 
    }
  }  
}

init();

a[16+4] = 1;
a[16+5] = 1;
a[(2*16)+5] = 1;


// To make it last forever enable these cells as well
a[(3*16)+5] = 1;

a[(4*16)+5] = 1;

a[(6*16)+4] = 1;
a[(6*16)+5] = 1;

a[(7*16)+3] = 1;
a[(7*16)+4] = 1;

a[(8*16)+6] = 1;

a[(9*16)+5] = 1;


var screen = blessed.screen({
  smartCSR: true
});


screen.title = 'Life';

var text = blessed.text({
  top: 'center',
  left: 'center',
  width: width+2,
  height: height+2,
  content: 'Hello {bold}world{/bold}!',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
});

text.setText(a.join(''));

text.key('enter', function(ch, key) {
  step();
  text.setText(a.join(''));
  screen.render();
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Append our text to the screen.
screen.append(text);

// Focus our element.
text.focus();

// Render the screen.
screen.render();