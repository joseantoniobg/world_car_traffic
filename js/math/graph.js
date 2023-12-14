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

  addSegment(segment) {
    this.segments.push(segment);
  }

  tryAddPoint(point) {
    if (!this.constainsPoint(point)) {
      this.addPoint(point);
      return true;
    }

    return false;
  }

  tryAddSegment(segment) {
    if (!this.constainsSegment(segment) && !segment.p1.equals(segment.p2)) {
      this.addSegment(segment);
      return true;
    }

    return false;
  }

  constainsPoint(point) {
    return this.points.find(p => p.equals(point));
  }

  constainsSegment(segment) {
    return this.segments.find(s => s.equals(segment));
  }

  removeSegment(segment) {
    this.segments.splice(this.segments.indexOf(segment), 1);
  }

  getSegmentsWithPoint(point) {
    return this.segments.filter(s => s.includes(point));
  }

  removePoint(point) {
    const segs = this.getSegmentsWithPoint(point);
    for (const seg of segs) {
      this.removeSegment(seg);
    }
    this.points.splice(this.points.indexOf(point), 1);
  }

  dispose() {
    this.points.length = 0;
    this.segments.length = 0;
  }
}