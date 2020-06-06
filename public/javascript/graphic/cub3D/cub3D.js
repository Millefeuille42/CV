let map =
	[
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,1,0,1,0,1,0,0,0,1],
		[1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,1],
		[1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,1,1,0,1,1,0,0,0,0,1,0,1,0,1,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	]

  let keyArray = []
  let res = 0
	let frm_avr

	const mode = (myArray) =>
	    myArray.reduce(
	        (a,b,i,arr)=>
	            (arr.filter(v=>v===a).length>=arr.filter(v=>v===b).length?a:b),
	        null)


  function display_change(value, id) {
  	document.getElementById(
  		`${id}`).innerHTML = value;
  }

  function setRes(value, min, max)
  {
  	if (value < min)
  		value = min;
  	if (value > max)
  		value = max;
  	res = value;
  }

  function draw_ray(ray, x, player) {
    let line_height
    let dist
    let start
    let end
    let wall = new Color(255, 55, 0)
    let ceil = new Color(50, 50, 50)
    let floor = new Color(20, 20, 20)

    if (ray.side == 0) {
      dist = (ray.mpos.x - player.pos.x + (1 - ray.step.x) / 2) / ray.dir.x
    } else {
      dist = (ray.mpos.y - player.pos.y + (1 - ray.step.y) / 2) / ray.dir.y
    }
    if (dist == 0) {
      line_height = 0
    } else {
      line_height = (int)(height / dist)
    }

    start = (int)(-line_height / 2 + height / 2 + player.view_off)
    end = (int)(line_height / 2 + height / 2 + player.view_off)

    stroke(ceil.r, ceil.g, ceil.b)
    line(x, 0, x, start)

    if (document.getElementById("shading").checked === true) {
      stroke(
        wall.shade(5, dist, 0, wall.r),
        wall.shade(5, dist, 0, wall.g),
        wall.shade(5, dist, 0, wall.b)
      )
    } else {
      stroke(wall.r, wall.g, wall.b)
    }
    line(x, start, x, end)

    stroke(floor.r, floor.g, floor.b)
    line(x, end, x, height)
  }

let _player

function OKeyDoKey(player) {
  if (keyArray[87] == 1) {
    player.forward()
  }
  else if (keyArray[83] == 1) {
    player.backward()
  }
  if (keyArray[68] == 1) {
    player.left()
  }
  else if (keyArray[65] == 1) {
    player.right()
  }
  if (keyArray[38] == 1) {
    player.look_up()
  }
  else if (keyArray[40] == 1) {
    player.look_down()
  }
  if (keyArray[37] == 1) {
    player.look_left()
  }
  else if (keyArray[39] == 1) {
    player.look_right()
  }
}

let count

function setup() {
  canvas = createCanvas(windowWidth / 1.5, windowHeight / 1.5);
  canvas.parent('p5container')

  _player = new Player()
	keyArray = []
	count = 0
	frm_avr = []
}

function draw() {
  resizeCanvas(windowWidth / 1.5, windowHeight / 1.5)
  background(0);

  let cam

	frm_avr[count % 60] = frameRate()
	count++
	OKeyDoKey(_player)

  for (let x = 0; x < width; x++) {
    cam = 2 * x / width - 1
    let ray = new Ray(_player, cam)
    ray.cast()
    for (let y = 0; y < res; y++) {
      draw_ray(ray, x, _player)
      x++
    }
    draw_ray(ray, x, _player)
  }
  if (document.getElementById("minimap").checked === true) {
  	draw_minimap(_player);
  }
	fill(0, 255, 0)
	noStroke()
	text(floor(mode(frm_avr)), (width / 8) * 7, height / 8)
}

function draw_minimap(player)
{
	let ratio_x = map[0].length * (width / 3000);
	let ratio_y = map.length * (height / 2000);

	for (let i in map) {
		for (let i2 in map[i]) {
			if (map[i][i2] == 1) {
        fill(255, 0, 0)
        stroke(255, 0, 0)
      }
			else {
        fill(0, 0, 255)
        stroke(0, 0, 255)
      }
		  rect(i2 * ratio_x, i * ratio_y, ratio_x, ratio_y);
		}
	}
  fill(255)
  stroke(255)
	rect(player.pos.x * ratio_x, player.pos.y * ratio_y, ratio_x, ratio_y);
}

function keyPressed() {
  keyArray[keyCode] = 1
}

function keyReleased() {
  keyArray[keyCode] = 0
}
