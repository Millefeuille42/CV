class Ray {
  constructor(player, cam) {
    this.origin = new Vector(player.pos.x, player.pos.y)
    this.dir = new Vector(
      player.dir.x + player.plan.x * cam,
      player.dir.y + player.plan.y * cam,
    )
    this.mpos = new Vector(floor(player.pos.x), floor(player.pos.y))
    this.dist = new Vector(
      (this.dir.x == 0) ? 1 : 0,
      (this.dir.y == 0) ? 1 : 0
    )
    if (this.dir.x != 0 && this.dir.y != 0) {
      this.dist.x = abs(1 / this.dir.x)
      this.dist.y = abs(1 / this.dir.y)
    }
    this.step = new Vector(1, 1)
    this.sdist = new Vector(
      (this.mpos.x + 1.0 - player.pos.x) * this.dist.x,
      (this.mpos.y + 1.0 - player.pos.y) * this.dist.y
    )
    if (this.dir.x < 0) {
      this.step.x = -1
      this.sdist.x = (player.pos.x - this.mpos.x) * this.dist.x
    }
    if (this.dir.y < 0) {
      this.step.y = -1
      this.sdist.y = (player.pos.y - this.mpos.y) * this.dist.y
    }
    this.hit = 0
    this.side = 0
  }

  cast() {
    while (this.hit == 0) {
      if (this.sdist.x < this.sdist.y) {
        this.side = 0
        this.sdist.x += this.dist.x
        this.mpos.x += this.step.x
      } else {
        this.side = 1
        this.sdist.y += this.dist.y
        this.mpos.y += this.step.y
      }
      if (map[floor(this.mpos.y)][floor(this.mpos.x)] == 1) {
        this.hit = 1
      }
    }
  }
}
