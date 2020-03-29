var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

class Color
{
	r;
	g;
	b;

	constructor(r, g, b)
	{
		this.r = r;
		this.g = g;
		this.b = b;
	}

	shade(intensity, dist, way, color)
	{
		var ret;

		if (color >= 255 - 20)
			color = 255 - 20;
		ret = ((color/255.0) + 0.1) * (intensity * (255.0/dist));
		if (way == 1)
			ret = ((color/255.0) + 0.1) * (intensity * (dist/255.0));

		ret = ret > color + 20 ? color + 20 : ret;
		ret = ret < 0 ? 0 : ret;
		
		return (ret);
	}
}

class Vector
{
	x;
	y;

	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}
}

class Player
{
	view_angle;
	fov;
	pos;
	dir;

	constructor(fov, pos, dir)
	{
		this.fov = fov;
		this.pos = new Vector(pos.x, pos.y);
		this.dir = dir;
		this.view_angle = 0;
	}

	forward()
	{
		var n_pos = new Vector(this.pos.x, this.pos.y);

		n_pos.x += Math.cos(this.dir * Math.PI / 180) / 5;
		n_pos.y += Math.sin(this.dir * Math.PI / 180) / 5;

		if (map[Math.floor(n_pos.y)][Math.floor(n_pos.x)] == '0')
		{
			this.pos.x = n_pos.x;
			this.pos.y = n_pos.y;
		}
	}
	backward()
	{
		var n_pos = new Vector(this.pos.x, this.pos.y);

		n_pos.x -= Math.cos(this.dir * Math.PI / 180) / 5;
		n_pos.y -= Math.sin(this.dir * Math.PI / 180) / 5;

		if (map[Math.floor(n_pos.y)][Math.floor(n_pos.x)] == '0')
		{
			this.pos.x = n_pos.x;
			this.pos.y = n_pos.y;
		}
	}
	strafe_left()
	{
		var n_pos = new Vector(this.pos.x, this.pos.y);

		n_pos.x -= Math.cos((this.dir + 90) * Math.PI / 180) / 5;
		n_pos.y -= Math.sin((this.dir + 90) * Math.PI / 180) / 5;

		if (map[Math.floor(n_pos.y)][Math.floor(n_pos.x)] == '0')
		{
			this.pos.x = n_pos.x;
			this.pos.y = n_pos.y;
		}
	}
	strafe_right()
	{
		var n_pos = new Vector(this.pos.x, this.pos.y);

		n_pos.x += Math.cos((this.dir + 90) * Math.PI / 180) / 5;
		n_pos.y += Math.sin((this.dir + 90) * Math.PI / 180) / 5;

		if (map[Math.floor(n_pos.y)][Math.floor(n_pos.x)] == '0')
		{
			this.pos.x = n_pos.x;
			this.pos.y = n_pos.y;
		}	}
	look_left()
	{
		this.dir -= 10;
		if (this.dir <= 0)
			this.dir = 360 - Math.abs(this.dir);
	}
	look_right()
	{
		this.dir += 10;
		if (this.dir >= 360)
			this.dir = this.dir - 360;
	}
	look_up()
	{
		if (this.view_angle < 100)
			this.view_angle += 20;
	}
	look_down()
	{
		if (this.view_angle > -100)
			this.view_angle -= 20;
	}
}

class Ray
{
	c_pos;
	dir;
	m_pos;

	constructor(c_pos, dir)
	{
		this.c_pos =  new Vector(c_pos.x, c_pos.y);
		this.m_pos = new Vector(Math.floor(c_pos.x), Math.floor(c_pos.y));
		while ((dir > 269.999995 && dir <= 270.0000005)
		|| (dir > 179.999995 && dir <= 180.0000005)
		|| (dir > 89.999995 && dir <= 90.0000005)
		|| (dir > 359.999995 && dir <= 360.0000005)
		|| (dir > -1.0000005 && dir <= 0.0000005))
			dir -= 0.04;
		this.dir = new Vector(Math.cos(dir * Math.PI / 180), Math.sin(dir * Math.PI / 180));
	}

	send_ray()
	{
		while (map[this.m_pos.y][this.m_pos.x] == '0')
		{
			this.c_pos.x += this.dir.x / (5 * Math.pow(10, precision));
			this.c_pos.y += this.dir.y / (5 * Math.pow(10, precision));
			this.m_pos.x = Math.floor(this.c_pos.x);
			this.m_pos.y = Math.floor(this.c_pos.y);
		}
	}
}

var map =
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
	];

var wall = new Color(54, 36, 171);
var floor = new Color(44, 149, 193);
var ceil = new Color(83, 104, 173);
var player = new Player(90, {x: 15, y: 16}, 0);
var scale = 5;
var precision = 1;

resize_canvas();
window.addEventListener("resize", resize_canvas);
setInterval(main, 1);

function setScale(value)
{
	scale = value;
	if (scale <= 0)
		scale = 1;
	f();
}

function setFov(value)
{
	player.fov = value;
	if (player.fov < 40)
		player.fov = 40;
	if (player.fov > 140)
		player.fov = 140;
	f();
}

function setPrecision(value)
{
	precision = value;
	if (precision < 1)
		precision = 1;
	if (precision > 2)
		precision = 2;
	f();
}

function display_change(value, id)
{
	document.getElementById(
		`${id}`).innerHTML = value;
}

function resize_canvas()
{
	canvas.width  = window.innerWidth / 1.5;
	canvas.height = window.innerHeight / 1.5;
	f();
}

function main()
{
	document.onkeydown = function(evt) {
		if (evt.keyCode == 87) {
			player.forward();
			f();
		}
		if (evt.keyCode == 83) {
			player.backward();
			f();
		}
		if (evt.keyCode == 65) {
			player.strafe_left();
			f();
		}
		if (evt.keyCode == 68) {
			player.strafe_right();
			f();
		}
		if (evt.keyCode == 38) {
			player.look_up();
			f();
		}
		if (evt.keyCode == 40) {
			player.look_down();
			f();
		}
		if (evt.keyCode == 37) {
			player.look_left();
			f();
		}
		if (evt.keyCode == 39) {
			player.look_right();
			f();
		}
	};
}

function f()
{
	var screen_prop = new Vector(canvas.offsetWidth, canvas.offsetHeight);
	var x = 0;
	var inc = player.fov / screen_prop.x;
	var i = player.dir - player.fov / 2;

	ctx.clearRect(0,0, screen_prop.x,  screen_prop.y);
	while (i < player.dir + player.fov / 2)
	{
		var ray = new Ray(player.pos, i);
		ray.send_ray();
		for (var scale_i = 0; scale_i < scale; scale_i++)
		{
			draw_line(ray, screen_prop, x, i);
			x++;
		}
		for (scale_i = 0; scale_i < scale; scale_i++)
			i = i + inc;
	}
	if (document.getElementById("minimap").checked === true)
		draw_minimap();
}

function draw_line(ray, screen_prop, x, i)
{
	var dist;
	var line_height;
	var line_start;
	var line_end;
	dist = Math.sqrt(Math.pow(player.pos.x - ray.c_pos.x, 2)
		+ Math.pow(player.pos.y - ray.c_pos.y, 2));
	dist = Math.cos((i - player.dir) * (Math.PI / 180)) * dist;
	if (dist === 0)
		line_height = 0;
	else
		line_height = screen_prop.y / dist;
	line_start = -line_height / 2 + screen_prop.y / 2 + player.view_angle;
	line_end = line_height / 2 + screen_prop.y / 2 + player.view_angle;

	ctx.strokeStyle = `rgb(${ceil.r}, ${ceil.g}, ${ceil.b})`;
	ctx.beginPath();
	ctx.moveTo(x, 0);
	ctx.lineTo(x, line_start);
	ctx.closePath();
	ctx.stroke();

	if (document.getElementById("shading").checked === true)
		ctx.strokeStyle = `rgb(${wall.shade(2, dist, 0, wall.r)},
			${wall.shade(2, dist, 0, wall.g)},
			${wall.shade(2, dist, 0, wall.b)})`;
	else
		ctx.strokeStyle = `rgb(${wall.r}, ${wall.g}, ${wall.b})`;
	ctx.beginPath();
	ctx.moveTo(x, line_start);
	ctx.lineTo(x, line_end);
	ctx.closePath();
	ctx.stroke();

	ctx.strokeStyle = `rgb(${floor.r}, ${floor.g}, ${floor.b})`;
	ctx.beginPath();
	ctx.moveTo(x, line_end);
	ctx.lineTo(x, screen_prop.y);
	ctx.closePath();
	ctx.stroke();
}

function draw_minimap()
{
	for (var i in map)
	{
		for (var i2 in map[i])
		{
			if (map[i][i2] == 1)
				ctx.fillStyle = 'red';
			else
				ctx.fillStyle = 'blue';
			ctx.fillRect(i2 * 4, i * 4, 4, 4);
		}
	}
	ctx.fillStyle = 'white';
	ctx.fillRect(player.pos.x * 4, player.pos.y * 4, 4, 4);
}