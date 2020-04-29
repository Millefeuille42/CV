class Color
{
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