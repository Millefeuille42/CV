class Player {
  constructor() {
    this.pos = new Vector(12.5, 10.5)
    this.dir = new Vector(1, 0)
    this.plan = new Vector(0, 0.66)
    this.view_off = 0
  }

  forward() {
    let n_pos
    let dir = new Vector(this.dir.x, this.dir.y)

    n_pos = new Vector(this.pos.x + dir.x / 5, this.pos.y + dir.y / 5)
    if (map[floor(n_pos.y + dir.y / 2)][floor(n_pos.x + dir.x / 2)] == 1) {
      return ;
    }
    this.pos.x = n_pos.x
    this.pos.y = n_pos.y
  }

  backward() {
    let n_pos
    let dir = new Vector(this.dir.x, this.dir.y)

    n_pos = new Vector(this.pos.x - dir.x / 5, this.pos.y - dir.y / 5)
    if (map[floor(n_pos.y - dir.y / 2)][floor(n_pos.x - dir.x / 2)] == 1) {
      return ;
    }
    this.pos.x = n_pos.x
    this.pos.y = n_pos.y
  }

  left() {
    let n_pos
    let dir = new Vector(this.dir.x, this.dir.y)

    dir.rotate(90)
    n_pos = new Vector(this.pos.x + dir.x / 5, this.pos.y + dir.y / 5)
    if (map[floor(n_pos.y + dir.y / 2)][floor(n_pos.x + dir.x / 2)] == 1) {
      return ;
    }
    this.pos.x = n_pos.x
    this.pos.y = n_pos.y
  }

  right() {
    let n_pos
    let dir = new Vector(this.dir.x, this.dir.y)

    dir.rotate(90)
    n_pos = new Vector(this.pos.x - dir.x / 5, this.pos.y - dir.y / 5)
    if (map[floor(n_pos.y - dir.y / 2)][floor(n_pos.x - dir.x / 2)] == 1) {
      return ;
    }
    this.pos.x = n_pos.x
    this.pos.y = n_pos.y
  }

  look_left() {
    this.dir.rotate(-5)
    this.plan.rotate(-5)
  }

  look_right() {
    this.dir.rotate(5)
    this.plan.rotate(5)
  }

  look_up() {
    if (this.view_off < 100)
      this.view_off += 10
  }

  look_down() {
    if (this.view_off > -100)
      this.view_off -= 10
  }
}
