// Grid of cells
let grid;
// Grid of neighbors
let nGrid;
// Min / Max for cell Survival
const min = 2;
const max = 3;

const cellSize = 25;
function init()
{
    // 5 rows
    grid = new Array(5); 
    for(let row = 0; row < grid.length; row++)
    {
        // for Each row +col w/ grid amount of spaces
        grid[row] = new Array(grid.length);
    }

    for(let row = 0; row < grid.length; row++)
    {
        for(let col = 0; col < grid.length; col++)
        {
            //Find boolean
            let randState = Math.random() >= 0.50; 
            grid[row][col] = new cell(randState);
            grid[row][col].setLoc(col,row);
        }
    }
    // Grid Complete //
    // nGrid
    nGrid = new Array(5);
    for(let row = 0; row < nGrid.length; row++)
    {
      // Add ngrid amount of spaces per col
      nGrid[row] = new Array(nGrid.length);
    }
    
    console.log(grid);
}
function setup()
{
    // Init Grid
    init();
    frameRate(1);
    // 5x5 Grid of 25x25
    createCanvas(125,125); 
    background(0);
   }
function display(){
    for(let row = 0; row < grid.length; row++)
    {
        for(let col = 0; col < grid[row].length; col++)
        {
            if(grid[row][col].getState()){
                let loc = grid[row][col].getLoc();
                fill(255);
                rect(loc.x*cellSize,loc.y*cellSize,cellSize,cellSize);
            }
            else{
              let loc = grid[row][col].getLoc();
              fill(0);
              rect(loc.x*cellSize,loc.y*cellSize,cellSize,cellSize);
            }
          }
    }
}

function neighbors(){
  for(let row = 0; row < grid.length; row++)
  {
    for(let col = 0; col < grid[row].length; col++)
    {
        /* for each invidiual cell, in x row and y col grab the states of the nearby  cells -
        if row is == to 4 there is no row beyond that and the same applies to col -
        filter out all undefined values in order to remove the situations where the information does not align */
      let neighbors = [
        row < 4 && grid[row+1][col].getState() === true,
        row > 0 && grid[row-1][col].getState() === true,
        col < 4 && grid[row][col+1].getState() === true,
        col > 0 && grid[row][col-1].getState() === true
      ].filter(v => v).length;
      // Create a parallel grid, with empty slots and add in the neighbor count to see whether or not the grid array gets modified
      //console.log(neighbors);
      nGrid[row][col] = neighbors;
    }
  }
}

function verify()
{
  if(nGrid.length == grid.length){
    for(let row = 0; row < grid.length; row++)
    {
      for(let col = 0; col < grid.length; col++)
      {
          if(nGrid[row][col] <= max && nGrid[row][col] >= min)
          {

            grid[row][col].setState(true);
          }
          else{
            grid[row][col].setState(false);
          }
          
        }
      }
    } 
  }


function update(){
  //Check for neighbors
  neighbors();
  //Verify set of conditions to ascertain the cell can move-on to the next generation
  verify();
}


function draw(){
  display();
  update();
}


