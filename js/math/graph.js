class Graph {
  constructor (points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  draw(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }

  addPoint(point) {
    this.points.push(point);
  }

  constainsPoint(point) {
    return this.points.find(p => p.equals(point));
  }
}