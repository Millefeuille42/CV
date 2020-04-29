var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

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
	];

let player = new Player(90, {x: 15, y: 16}, 48);

let walls = init_walls([]);

resize_canvas();
window.addEventListener("resize", resize_canvas);
setInterval(KeyHandler, 1);

function setFov(value)
{
	player.fov = value;
	if (player.fov < 40)
		player.fov = 40;
	if (player.fov > 140)
		player.fov = 140;
	sketch();
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
	sketch();
}

function KeyHandler()
{
	document.onkeydown = function(evt) {
		if (evt.keyCode == 87) {
			player.forward(map);
			sketch();
		}
		if (evt.keyCode == 83) {
			player.backward(map);
			sketch();
		}
		if (evt.keyCode == 65) {
			player.strafe_left(map);
			sketch();
		}
		if (evt.keyCode == 68) {
			player.strafe_right(map);
			sketch();
		}
		if (evt.keyCode == 38) {
			player.look_up();
			sketch();
		}
		if (evt.keyCode == 40) {
			player.look_down();
			sketch();
		}
		if (evt.keyCode == 37) {
			player.look_left();
			sketch();
		}
		if (evt.keyCode == 39) {
			player.look_right();
			sketch();
		}
	};
}

function init_walls(walls)
{
	for (let r = 0; r < map.length; r++)
	{
		let row = map[r];
		for (let s = 0; s < row.length; s++)
		{
			let spot = row[s];
			if (spot == 1)
			{
				let left = Math.floor(s);
				let up = Math.floor(r);
				let right = Math.floor(s + 1);
				let down = Math.floor(r + 1);

				walls.push(new Wall(left, up , left, down, "red"));
				walls.push(new Wall(right, up , right, down, "red"));
				walls.push(new Wall(left, up , right, up, "red"));
				walls.push(new Wall(left, down , right, down, "red"));
			}
		}
	}
	return (walls);
}

function sketch()
{
	let screen_prop = new Vector(canvas.offsetWidth, canvas.offsetHeight);
	let x = 0;
	let inc = player.fov / screen_prop.x;
	let ray;

	ctx.clearRect(0,0, screen_prop.x,  screen_prop.y);

	for (let angle = player.dir - player.fov / 2; angle < player.dir + player.fov / 2; angle += inc)
	{
		ray = new Ray(player.pos.x, player.pos.y, angle);
		ray.cast(walls, screen_prop, player, x, ctx);
		x++;
	}
	if (document.getElementById("minimap").checked === true)
		draw_minimap();
}

function draw_minimap()
{

	let ratio_x = map[0].length * (canvas.width / 3000);
	let ratio_y = map.length * (canvas.height / 2000);

	for (var i in map)
	{
		for (var i2 in map[i])
		{
			if (map[i][i2] == 1)
				ctx.fillStyle = 'red';
			else
				ctx.fillStyle = 'blue';
			ctx.fillRect(i2 * ratio_x, i * ratio_y, ratio_x, ratio_y);
		}
	}
	ctx.fillStyle = 'white';
	ctx.fillRect(player.pos.x * ratio_x, player.pos.y * ratio_y, ratio_x, ratio_y);
}