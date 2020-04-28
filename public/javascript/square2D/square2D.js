var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

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

var player = new Player(90, {x: 3, y: 6},0, canvas);

resize_canvas();
window.addEventListener("resize", resize_canvas);
setInterval(keyHandler(), 1);

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

function setFov(value)
{
    player.fov = value;
    if (player.fov < 40)
        player.fov = 40;
    if (player.fov > 140)
        player.fov = 140;
    sketch();
}

function keyHandler()
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

function sketch()
{
    let screen_prop = new Vector(canvas.offsetWidth, canvas.offsetHeight);

    ctx.clearRect(0,0, screen_prop.x,  screen_prop.y);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let walls = [];
    let ray;

    player.update_pos(canvas);

    for (let r = 0; r < map.length; r++)
    {
        let row = map[r];

        for (let s = 0; s < row.length; s++)
        {
            let spot = row[s];

            if (spot == 1)
            {
                let left = Math.floor((s / row.length) * canvas.width);
                let up = Math.floor((r / map.length) * canvas.height);
                let right = Math.floor(((s + 1) / row.length) * canvas.width);
                let down = Math.floor(((r + 1) / map.length) * canvas.height);

                walls.push(new Wall(left, up , left, down, "red"));
                walls.push(new Wall(right, up , right, down, "red"));
                walls.push(new Wall(left, up , right, up, "red"));
                walls.push(new Wall(left, down , right, down, "red"));
            }
        }
    }

    for (let i in walls)
    {
        let wall = walls[i];
        wall.show(ctx);
    }

    for (let angle = player.dir - player.fov / 2; angle < player.dir + player.fov / 2; angle += 1)
    {
        ray = new Ray(player.c_pos.x, player.c_pos.y, angle);
        ray.show(ctx);
        ray.cast(walls);
    }
}