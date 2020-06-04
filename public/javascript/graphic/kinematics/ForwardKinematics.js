let defOff = 0.1
let tentMax = 1

function display_change(value, id)
{
	document.getElementById(
		`${id}`).innerHTML = value;
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
}

class Segment {
	constructor(x, y, len, angle, _color = 255, parent = undefined)
	{
		if (parent != undefined) {
			this.aPos = parent.bPos
			this.xoff = defOff + parent.xoff
			this.weight = parent.weight * 0.96
		} else {
			this.aPos = new Vector(x, y)
			this.xoff = defOff
			this.weight = 30
		}

		this.parent = parent
		this.child = undefined
		this.color = _color
		this.len = len
		this.angle = angle
		this.selfAngle = angle

		this.bPos = new Vector(
			this.aPos.x + this.len * cos(radians(this.angle)),
			this.aPos.y + this.len * sin(radians(this.angle)))
	}

	calculateB() {
		this.bPos.x = this.aPos.x + this.len * cos(radians(this.angle))
		this.bPos.y = this.aPos.y + this.len * sin(radians(this.angle))
	}

	wiggle(maxAn, minAn) {
		let dMaxAn = degrees(maxAn)
		let dMinAn = degrees(minAn)

		this.selfAngle = map(sin(this.xoff), -1, 1 , dMaxAn, dMinAn)
		this.xoff += 0.03
		if (this.child != undefined) {
			this.child.wiggle(maxAn, minAn)
		}
	}

	update() {
		this.angle = this.selfAngle
		if (this.parent != undefined) {
			this.aPos = this.parent.bPos
			this.angle += this.parent.angle
		} else {
			this.angle += - 90
		}
		this.calculateB()
		if (this.child != undefined) {
			this.child.update()
		}
	}

	spawn(angle) {
		if (this.child != undefined) {
			this.child.spawn(angle)
		} else {
			this.child = new Segment(0, 0, this.len, angle,
				this.color, this)
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
		if (this.child != undefined) {
			this.child.show()
		}
	}
}

let tentacles

function setup() {
	canvas = createCanvas(windowWidth / 1.2, windowHeight / 1.2);
	canvas.parent('p5container')

	frameRate(60)
	restart()
}

function restart() {
	tentacles = []
	for (let i2 = 0; i2 < tentMax; i2++) {
		tentacles[i2] = new Segment(0, height, 10, -90)
		tentacles[i2].aPos.x = width / (parseInt(tentMax) + 1) * (i2 + 1)
		for (let i = 0; i < 50; i++) {
			tentacles[i2].spawn(0)
		}
	}
}

function draw() {
	resizeCanvas(windowWidth / 1.2, windowHeight / 1.2)
	background(0);

	for (let i = 0; i < tentMax; i++) {
		let mxAn = 0.03
		let mnAn = -0.03

		if (i % 2 == 0) {
			mxAn *= -1
			mnAn *= -1
		}

		tentacles[i].wiggle(mxAn, mnAn)
		tentacles[i].update()
		tentacles[i].show()
	}
}
