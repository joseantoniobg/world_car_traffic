class World {
  constructor(graph, roadWidth = 60, roadRoundness = 3) {
    this.graph = graph;
    this.roadWidth = roadWidth;
    this.roadRoundness = roadRoundness;

    this.envelopes = [];

    this.generate();
  }

  generate() {
  this.envelopes.length = 0;
    for (const segment of this.graph.segments) {
      const envelope = new Envelope(segment, this.roadWidth, this.roadRoundness);
      this.envelopes.push(envelope);
    }

    //this.intersections = Polygon.break(this.envelopes[0].poly, this.envelopes[1].poly);
    Polygon.multiBreak(this.envelopes.map(e => e.poly));
  }

  draw(ctx) {
    for (const envelope of this.envelopes) {
      envelope.draw(ctx);
    }
  }
}