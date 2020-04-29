class Ray
{
    constructor(x, y, angle)
    {
        this.pos = new Vector(x, y)
        this.dir = new Vector(Math.cos(angle * Math.PI / 180), Math.sin(angle * Math.PI / 180));
        this.angle = angle;
    }

    check(wall)
    {
        let x1 = wall.a.x;
        let y1 = wall.a.y;
        let x2 = wall.b.x;
        let y2 = wall.b.y;

        let x3 = this.pos.x;
        let y3 = this.pos.y;
        let x4 = this.pos.x + this.dir.x;
        let y4 = this.pos.y + this.dir.y;

        let den;
        let t;
        let u;
        let hit = new Vector();

        den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0)
            return ;
        t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        u = - ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
        if (t > 0 && t < 1 && u > 0)
        {
            hit.x = x1 + t * (x2 - x1);
            hit.y = y1 + t * (y2 - y1);
            return (hit);
        }
    }

    cast(walls, screen_prop, player, x, ctx)
    {
        let pt;
        let dist = Infinity;

        for (let i in walls)
        {
            let wall = walls[i];
            let cur_pt;
            let cur_dist;

            cur_pt = this.check(wall)
            if (cur_pt)
                cur_dist = Math.sqrt(Math.pow(this.pos.x - cur_pt.x, 2)
                        + Math.pow(this.pos.y - cur_pt.y, 2))
            if (cur_pt && cur_dist < dist)
            {
                dist = cur_dist;
                pt = cur_pt;
            }
        }
        if (pt)
            this.draw_wall(pt, dist, screen_prop, player, x, ctx);
    }

    draw_wall(pt, dist, screen_prop, player, x, ctx)
    {
        let line_height;
        let line_start;
        let line_end;

        var wall = new Color(54, 36, 171);
        var floor = new Color(44, 149, 193);
        var ceil = new Color(83, 104, 173);

        dist = Math.cos((this.angle - player.dir) * (Math.PI / 180)) * dist;
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
}