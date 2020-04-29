class Player
{
    constructor(fov, pos, dir)
    {
        this.fov = fov;
        this.pos = new Vector(pos.x, pos.y);
        this.dir = dir;
        this.view_angle = 0;
    }

    forward(map)
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
    backward(map)
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
    strafe_left(map)
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
    strafe_right(map)
    {
        var n_pos = new Vector(this.pos.x, this.pos.y);

        n_pos.x += Math.cos((this.dir + 90) * Math.PI / 180) / 5;
        n_pos.y += Math.sin((this.dir + 90) * Math.PI / 180) / 5;

        if (map[Math.floor(n_pos.y)][Math.floor(n_pos.x)] == '0')
        {
            this.pos.x = n_pos.x;
            this.pos.y = n_pos.y;
        }
    }
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