class Player
{
    constructor(fov, pos, dir, canvs)
    {
        this.fov = fov;
        this.pos = new Vector(pos.x, pos.y);
        this.c_pos = new Vector((pos.x / 24) * canvs.width,  (pos.x / 24) * canvs.height);
        this.dir = dir;
        this.view_angle = 0;
    }

    update_pos(canvs)
    {
        this.c_pos = new Vector((this.pos.x / 24) * canvs.width,  (this.pos.y / 24) * canvs.height);
    }

    forward(map)
    {
        var n_pos = new Vector(this.pos.x, this.pos.y);
        var shift = new Vector(Math.cos(this.dir * Math.PI / 180) / 10,
            Math.sin(this.dir * Math.PI / 180) / 10)

        n_pos.x += shift.x;
        n_pos.y += shift.y;

        if (map[Math.floor(n_pos.y + shift.y)][Math.floor(n_pos.x + shift.x)] == '0')
        {
            this.pos.x = n_pos.x;
            this.pos.y = n_pos.y;
        }
    }
    backward(map)
    {
        var n_pos = new Vector(this.pos.x, this.pos.y);
        var shift = new Vector(Math.cos(this.dir * Math.PI / 180) / 10,
            Math.sin(this.dir * Math.PI / 180) / 10)

        n_pos.x -= shift.x;
        n_pos.y -= shift.y;
        if (map[Math.floor(n_pos.y - shift.y)][Math.floor(n_pos.x - shift.x)] == '0')
        {
            this.pos.x = n_pos.x;
            this.pos.y = n_pos.y;
        }
    }
    strafe_left(map)
    {
        var n_pos = new Vector(this.pos.x, this.pos.y);
        var shift = new Vector(Math.cos((this.dir + 90) * Math.PI / 180) / 10,
            Math.sin((this.dir + 90) * Math.PI / 180) / 10)

        n_pos.x -= shift.x;
        n_pos.y -= shift.y;
        if (map[Math.floor(n_pos.y - shift.y)][Math.floor(n_pos.x - shift.x)] == '0')
        {
            this.pos.x = n_pos.x;
            this.pos.y = n_pos.y;
        }
    }
    strafe_right(map)
    {
        var n_pos = new Vector(this.pos.x, this.pos.y);
        var shift = new Vector(Math.cos((this.dir + 90) * Math.PI / 180) / 10,
            Math.sin((this.dir + 90) * Math.PI / 180) / 10)

        n_pos.x += shift.x;
        n_pos.y += shift.y;

        if (map[Math.floor(n_pos.y + shift.y)][Math.floor(n_pos.x + shift.x)] == '0')        {
            this.pos.x = n_pos.x;
            this.pos.y = n_pos.y;
        }
    }
    look_left()
    {
        this.dir -= 3;
        if (this.dir <= 0)
            this.dir = 360 - Math.abs(this.dir);
    }
    look_right()
    {
        this.dir += 3;
        if (this.dir >= 360)
            this.dir = this.dir - 360;
    }
}