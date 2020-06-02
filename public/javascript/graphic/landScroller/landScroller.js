let flying = 0
let w = 1200
let h = 1000
let rows
let cols

let fps = 60;
let scl = 30

function setup() {
  setAttributes('antialias', true);
  canvas = createCanvas(windowWidth / 1.5, windowHeight / 1.5, WEBGL);
  canvas.parent('p5container')
  frameRate(fps)

  cols = floor(w / scl)
  rows = floor(h / scl)
}

function setRes(value, min, max)
{
  if (value < min)
		value = min;
	if (value > max)
		value = max;
  scl = value;

  cols = floor(w / scl)
  rows = floor(h / scl)
}

function setMH(value, min, max)
{
	if (value < min)
		value = min;
	if (value > max)
		value = max;
  h = value

  rows = floor(h / scl)
}

function setMW(value, min, max)
{
  if (value < min)
		value = min;
	if (value > max)
		value = max;
  w = value

  cols = floor(w / scl)
}

function display_change(value, id)
{
	document.getElementById(
		`${id}`).innerHTML = value;
}

function draw() {
  let terrain

  resizeCanvas(windowWidth / 1.5, windowHeight / 1.5)

  background(0);

  if (document.getElementById("stroke").checked === true) {
    stroke(100, 100, 100)
  } else {
    noStroke()
  }

  translate(width / 2, height / 2 - 50)
  rotateX(PI / 2.5)
  translate(-width / 2 - w / 2, -h + 30 * 6)


  terrain = Array(cols)

  flying -= 0.1

  let yoff = flying
  for (let y = 0; y < rows; y++) {
    let xoff = 0
    terrain[y] = Array(rows)
    for (let x = 0; x < cols; x++) {
      terrain[y][x] = map(noise(xoff,yoff), 0, 1, -100, 100)
      xoff += 0.2
    }
    yoff += 0.2
  }

  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP)
    for (let x = 0; x < cols; x++) {

      if (document.getElementById("fill").checked == true) {
        fill(map(terrain[y][x], -100, 100, 0, 255), 0, 100)
      } else {
        noFill()
      }

      vertex(x * scl, y * scl, terrain[y][x])
      vertex(x * scl, (y + 1) * scl, terrain[y + 1][x])
    }
    endShape()
  }

}
