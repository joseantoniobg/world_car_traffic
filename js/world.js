class World {
  constructor(graph,
              roadWidth = 60,
              roadRoundness = 20,
              buildingWidth = 150,
              buldingMinLength = 100,
              spacing = 50,
    ) {
    this.graph = graph;
    this.roadWidth = roadWidth;
    this.roadRoundness = roadRoundness;
    this.buildingWidth = buildingWidth;
    this.buldingMinLength = buldingMinLength;
    this.spacing = spacing;

    this.envelopes = [];
    this.roadBorders = [];
    this.buildings = [];

    this.generate();
  }

  #generateBuildings() {
    const tempEnvelopes = [];
    for (const seg of this.graph.segments) {
      tempEnvelopes.push(new Envelope(seg, this.roadWidth + this.buildingWidth + this.spacing * 2, this.roadRoundness));
    }

    const guides = Polygon.union(tempEnvelopes.map(e => e.poly));

    for (let i = 0; i < guides.length; i++) {
      const seg = guides[i];
      if (seg.length() < this.buldingMinLength) {
        guides.splice(i, 1);
        i--;
      }
    }

    const supports = [];

    for (const seg of guides) {
      const len = seg.length() + this.spacing;
      const buildingCount = Math.floor(len / (this.buildingminLength + this.spacing));
      const buildingLength = len / buildingCount - this.spacing;

      const direction = seg.directionVector();

      let q1 = seg.p1;
      let q2 = add(q1, scale(direction, buildingLength));
      supports.push(new Segment(q1, q2));
    }


    return supports;
  }

  generate() {
  this.envelopes.length = 0;
    for (const segment of this.graph.segments) {
      const envelope = new Envelope(segment, this.roadWidth, this.roadRoundness);
      this.envelopes.push(envelope);
    }

    //this.intersections = Polygon.break(this.envelopes[0].poly, this.envelopes[1].poly);
    this.roadBorders = Polygon.union(this.envelopes.map(e => e.poly));
    this.buildings = this.#generateBuildings();
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

    for (const building of this.buildings) {
      building.draw(ctx);
    }
  }
}