let nodes
let order
let maxNodes
let count
let bestDist
let bestPathRecorded
let goal

function display_change(value, id)
{
	document.getElementById(
		`${id}`).innerHTML = value;
}

function setup() {
  canvas = createCanvas(windowWidth / 1.5, windowHeight / 1.5);
  canvas.parent('p5container')

  nodes = []
  order = []

  maxNodes = 0;

  for (let i = 0; i < maxNodes; i++) {
    nodes[i] = createVector(random(width), random(height / 3))
    order[i] = i
  }

  bestDist = getDist()
  bestPathRecorded = order.slice()

  goal = fact(maxNodes)
  count = 0

  noLoop()
}

function restart() {

  nodes = []
  order = []

  maxNodes = document.getElementById('nodeRange').value;

  for (let i = 0; i < maxNodes; i++) {
    nodes[i] = createVector(random(width), random(height / 3))
    order[i] = i
  }

  bestDist = getDist()
  bestPathRecorded = order.slice()

  goal = fact(maxNodes)
  count = 0

  loop()
}

function draw() {

  resizeCanvas(windowWidth / 1.5, windowHeight / 1.5)

  background(0);
  textSize(32)

  if (maxNodes == 0) {
    return
  }

  let frm = 60
  let curDist = getDist()

  if (curDist < bestDist) {
    console.log(bestDist)
    bestDist = curDist
    bestPathRecorded = order.slice()
  }

  let sTimeLeft = (((1/frm) * count) / count) * (goal - count) + 1
  let mTimeLeft = (sTimeLeft % 3600) / 60
  let hTimeLeft = sTimeLeft / 3600

  sTimeLeft = (sTimeLeft % 3600) % 60
  let timeString = ""

  if (hTimeLeft >= 1) {
    timeString += floor(hTimeLeft) + "h "
  }
  if (mTimeLeft >= 1) {
    timeString += floor(mTimeLeft) + "m "
  }
  if (sTimeLeft >= 1) {
    sTimeLeft =
    timeString += floor(sTimeLeft) + "s"
  }

  drawPath()
  drawBestPath()
  drawnodes(nodes, 255, 255, 255, 10)
  text(nf((count / goal) * 100, 1, 2) + "%", width / 16, height * 2.3 / 3);
  text(nf((frm / goal) * 100, 1, 5) + "%\/s", width / 2, height * 2.3 / 3);
  text(floor(frm) + " try\/s", width / 2, height * 2.5 / 3);
  text(nf(count) + " / " + nf(goal), width / 16, height * 2.5 / 3);
  text(timeString + " left ", width / 16, height * 2.7 / 3);

  count++;

  if (lexicoSwap() == -1) {
    background(0);
    text(nf((count / goal) * 100) + "%", width / 16, height * 2.3 / 3);
    text(nf(count) + " / " + nf(goal), width / 16, height * 2.5 / 3);
    translate(0, height / 3)
    drawBestPath()
    drawnodes(nodes, 255, 255, 255, 10)
    noLoop()
    console.log("done")
  }
}

function lexicoSwap(array) {
  let xMax = -1
  let yMax = -1

  for (let i = 0; i < maxNodes - 1; i++) {
    if (order[i] < order[i + 1]) {
      xMax = i
    }
  }

  for (let i2 = 0; i2 < maxNodes; i2++) {
    if (order[xMax] < order[i2]) {
      yMax = i2
    }
  }

  swap(order, xMax, yMax)

  let tempArray = order.splice(xMax + 1)
  tempArray.reverse()
  order = order.concat(tempArray)

  if (xMax == -1) {
      return -1
  }
  return 0
}

function getDist() {
  let curDist
  let sum = 0

  for (let i = 0; i < maxNodes - 1; i++) {
    let n = order[i]
    let n2 = order[i + 1]
    curDist = dist(nodes[n].x, nodes[n].y, nodes[n2].x, nodes[n2].y)
    sum += curDist
  }

  return sum;
}

function drawBestPath() {
  stroke(150, 150, 150)
  strokeWeight(5)
  noFill()
  beginShape()
  for (let i = 0; i < maxNodes; i++) {
    let n = bestPathRecorded[i]
    vertex(nodes[n].x, nodes[n].y)
  }
  endShape()
}

function drawPath() {
  translate(0, height / 3)
  stroke(255)
  strokeWeight(1)
  noFill()
  beginShape()
  for (let i = 0; i < maxNodes; i++) {
    let n = order[i]
    vertex(nodes[n].x, nodes[n].y)
  }
  endShape()
  translate(0, -height / 3)
}

function drawnodes(array, r, g, b, radius) {
  fill(r, g, b)
  noStroke()
  for (let i = 0; i < maxNodes; i++) {
    ellipse(array[i].x, array[i].y, radius, radius)
  }
}

function swap(array, i, i2) {
  let temp

  temp = array[i]
  array[i] = array[i2]
  array[i2] = temp
}

function fact(num)
{
    var rval=1;
    for (var i = 2; i <= num; i++)
        rval = rval * i;
    return rval;
}
