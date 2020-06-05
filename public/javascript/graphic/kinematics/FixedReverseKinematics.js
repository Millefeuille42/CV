let tentMax = 1
let joints = 25
let len = 20

let tentacles = []
let ball;

function display_change(value, id)
{
	document.getElementById(
		`${id}`).innerHTML = value;
}

function setLen(value, min, max)
{
	if (value < min)
		value = min;
	if (value > max)
		value = max;
	len = value;
	restart()
}

function setJoints(value, min, max)
{
	if (value < min)
		value = min;
	if (value > max)
		value = max;
	joints = value;
	restart()
}

function setTents(value, min, max)
{
	if (value < min)
		value = min;
	if (value > max)
		value = max;
	tentMax = value;
	restart()
}

class Vector
{
	constructor(x = 0, y = 0)
	{
		this.x = x;
		this.y = y;
	}

	translate(dir) {
		this.x += dir.x;
		this.y += dir.y;
	}
}

class Ball {
	constructor(pos_x, pos_y, dir_x, dir_y) {
		this.pos = new Vector(pos_x, pos_y)
		this.dir = new Vector(dir_x, dir_y)
		this.r = 255;
		this.g = 0;
		this.b = 0;
	}

	move() {
		this.pos.translate(this.dir)

		if (this.pos.x >= width - 25 || this.pos.x <= 25) {
			this.bounce(1)
		} else if (this.pos.y >= height - 25 || this.pos.y <= 25) {
			this.bounce(0)
		}

		this.pos.translate(this.dir)
	}

	bounce(way) {
		if (way == 1) {
			this.dir.x = -this.dir.x
		} else {
			this.dir.y = -this.dir.y
		}
		this.r = random(0, 255)
		this.g = random(0, 255)
		this.b = random(0, 255)
	}

	show() {
		noStroke()
		fill(this.r, this.g, this.b, 100)
		ellipse(this.pos.x, this.pos.y, 50, 50)
		fill(255, 255, 255, 50)
		ellipse(this.pos.x, this.pos.y, 20, 20)
	}
}

class Segment {
	constructor(x, y, len, angle, _color = 255, child = undefined)
	{
		this.color = _color
		this.len = len
		this.angle = angle
		this.child = child
		this.parent = undefined
		this.weight = 5 * (1.15 / tentMax)

		this.basePos = new Vector(x, y)

		if (child != undefined) {
			this.bPos = new Vector(child.aPos.x , child.aPos.y)
			this.aPos = new Vector(
				this.bPos.x - this.len * cos(radians(this.angle)),
				this.bPos.y - this.len * sin(radians(this.angle)))
			this.child.parent = this
		} else {
			this.aPos = new Vector(x, y)
			this.bPos = new Vector(
				this.aPos.x + this.len * cos(radians(this.angle)),
				this.aPos.y + this.len * sin(radians(this.angle)))
		}
	}

	calculateB() {
		let nBPos = new Vector(
			this.aPos.x + this.len * cos(radians(this.angle)),
			this.aPos.y + this.len * sin(radians(this.angle)))

		this.bPos.x = nBPos.x
		this.bPos.y = nBPos.y

		if (this.parent != undefined) {
			this.parent.calculateB()
		}
	}

	update() {
		this.calculateB()

		if (this.parent != undefined) {
			this.parent.update()
		}
	}

	pointSpot(x, y) {
		this.angle = degrees(Math.atan2((this.aPos.x - x),
			(y - this.aPos.y))) + 90

		let nAPos = new Vector(
			x - this.len * cos(radians(this.angle)),
			y - this.len * sin(radians(this.angle)))

		if (this.parent != undefined) {
			this.aPos.x = nAPos.x
			this.aPos.y = nAPos.y
			this.parent.pointSpot(this.aPos.x, this.aPos.y)
		} else {
			this.aPos.x = this.basePos.x
			this.aPos.y = this.basePos.y
		}
	}

	getOrigin() {
		let curTen = this

		while (curTen.parent != undefined) {
			curTen = curTen.parent
		}

		return curTen
	}

	glue() {

		if (this.parent != undefined) {
			this.aPos.x = this.parent.bPos.x
			this.aPos.y = this.parent.bPos.y
		}

		this.calculateB()
		if (this.child != undefined) {
			this.child.glue()
		}
	}

	spawn(angle) {
		if (this.parent != undefined) {
			this.parent.spawn(angle)
		} else {
			new Segment(this.basePos.x, this.basePos.y, this.len, angle, 255, this)
			this.parent.weight = this.weight * 1.05
			if (this.parent.weight >= 10) {
				this.parent.weight = 10
			}
		}
	}

	show() {
		let col = color(this.color, this.color, this.color)
		if (document.getElementById("seeJoints").checked === true) {
			col.setAlpha(200)
		}
		stroke(col)
		strokeWeight(this.weight)
		line(this.aPos.x, this.aPos.y, this.bPos.x, this.bPos.y)

		if (this.parent != undefined) {
			this.parent.show()
		}
	}
}


function setup() {
	canvas = createCanvas(windowWidth / 1.2, windowHeight / 1.2);
	canvas.parent('p5container')

	frameRate(60)
	restart()
}

function restart() {
	tentacles = []
	ball = new Ball(200, 200, 2, 2)
	for (let i2 = 0; i2 < tentMax; i2++) {
		tentacles[i2] = new Segment(width / (parseInt(tentMax,10) + 1) * (i2 + 1), height, len, -90)
		for (let i = 0; i < joints - 1; i++) {
			tentacles[i2].spawn(0)
		}
	}
}

function draw() {
	resizeCanvas(windowWidth / 1.2, windowHeight / 1.2)
	background(0);


	if (document.getElementById("ball").checked === true) {
		ball.move()
		ball.show()
	}

	for (let i = 0; i < tentMax; i++) {
		if (document.getElementById("ball").checked === false) {
			tentacles[i].pointSpot(mouseX, mouseY)
		} else {
			tentacles[i].pointSpot(ball.pos.x, ball.pos.y)
		}
		tentacles[i].update()
		let or = tentacles[i].getOrigin()
		or.glue()
		tentacles[i].show()
	}
}