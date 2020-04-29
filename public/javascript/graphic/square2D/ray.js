class Ray
{
    constructor(x, y, angle)
    {
        this.pos = new Vector(x, y)
        this.dir = new Vector(Math.cos(angle * Math.PI / 180), Math.sin(angle * Math.PI / 180));
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

    cast(walls)
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
        {
            ctx.strokeStyle = "white";
            ctx.beginPath();
            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(pt.x, pt.y);
            ctx.closePath();
            ctx.stroke();
        }
    }

    show(ctx)
    {
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(this.pos.x + this.dir.x, this.pos.y + this.dir.y);
        ctx.closePath();
        ctx.stroke();
    }
}