class Wall
{
    constructor(x1, y1, x2, y2, color)
    {
        this.a = new Vector(x1, y1);
        this.b = new Vector(x2, y2);
        this.color = color;
    }

    show(ctx)
    {
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.a.x, this.a.y);
        ctx.lineTo(this.b.x, this.b.y);
        ctx.closePath();
        ctx.stroke();
    }
}