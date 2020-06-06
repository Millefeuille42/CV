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

	rotate(angle) {
		let old = new Vector(this.x, this.y)

		this.x = old.x * Math.cos(radians(angle)) - old.y * Math.sin(radians(angle))
		this.y = old.x * Math.sin(radians(angle)) + old.y * Math.cos(radians(angle))
	}
}
