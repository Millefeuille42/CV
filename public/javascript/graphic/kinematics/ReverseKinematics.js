let joints = 50
let len = 20

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

class Segment {
	constructor(x, y, len, angle, _color = 255, child = undefined)
	{
		this.color = _color
		this.len = len
		this.angle = angle
		this.child = child
		this.parent = undefined
		this.weight = 15

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

		this.aPos.x = nAPos.x
		this.aPos.y = nAPos.y

		if (this.parent != undefined) {
			this.parent.pointSpot(this.aPos.x, this.aPos.y)
		}
	}

	spawn(angle) {
		if (this.parent != undefined) {
			this.parent.spawn(angle)
		} else {
			new Segment(0, 0, this.len, angle, 255, this)
			this.parent.weight = this.weight / 1.05
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

let tentacle

function setup() {
	canvas = createCanvas(windowWidth / 1.2, windowHeight / 1.2);
	canvas.parent('p5container')

	frameRate(60)
	restart()
}

function restart() {
	tentacle = new Segment(200, height / 2, len, -90)

	for (let i = 0; i < joints - 1; i++) {
		tentacle.spawn(0)
	}
}

function draw() {
	resizeCanvas(windowWidth / 1.2, windowHeight / 1.2)
	background(0);

	tentacle.pointSpot(mouseX, mouseY)
	tentacle.update()

	tentacle.show()
}
