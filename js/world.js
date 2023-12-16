class World {
  constructor(graph, roadWidth = 60, roadRoundness = 20) {
    this.graph = graph;
    this.roadWidth = roadWidth;
    this.roadRoundness = roadRoundness;

    this.envelopes = [];
    this.roadBorders = [];

    this.generate();
  }

  generate() {
  this.envelopes.length = 0;
    for (const segment of this.graph.segments) {
      const envelope = new Envelope(segment, this.roadWidth, this.roadRoundness);
      this.envelopes.push(envelope);
    }

    //this.intersections = Polygon.break(this.envelopes[0].poly, this.envelopes[1].poly);
    this.roadBorders = Polygon.union(this.envelopes.map(e => e.poly));
  }

  draw(ctx) {
    for (const envelope of this.envelopes) {
      envelope.draw(ctx, { fill: "#BBB", strokeStyle: "#BBB", lineWidth: 15 });
    }

    for (const segments of this.graph.segments) {
      segments.draw(ctx, { color: "white", width: 4, dash: [10, 10] });
    }

    for (const segment of this.roadBorders) {
      segment.draw(ctx, { color: "white", width: 4 });
    }
  }
}