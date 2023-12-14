class GraphEditor {
  constructor(canvas, graph, properties) {
    this.canvas = canvas;
    this.graph = graph;
    this.selected = null;
    this.hovered = null;
    this.dragging = false;
    this.properties = properties;
    this.mouse = null;

    this.ctx = this.canvas.getContext("2d");

    this.#addEventListenrs();
  }

  #addEventListenrs() {
    this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
    this.canvas.addEventListener("mouseleave", this.#handleMouseLeave.bind(this));
    this.canvas.addEventListener("mouseup", () => this.dragging = false);
    this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  #handleMouseDown(e) {
    if (e.button === 2) { // right click
      if (this.selected) {
        this.selected = null;
      } else if (this.hovered) {
        this.#removePoint(this.hovered);
      }
    }

    if (e.button === 0) { // left click
      if (this.hovered) {
        this.#select(this.hovered);
        this.dragging = true;
        return;
      }
      this.graph.tryAddPoint(this.mouse);
      this.#select(this.mouse);
      this.hovered = mouse;
    }
  }

  #handleMouseMove(e) {
    this.properties.mousex.innerHTML = e.offsetX;
    this.properties.mousey.innerHTML = e.offsetY;

    this.mouse = new Point(e.offsetX, e.offsetY);
    this.hovered = getNearestPoint(this.mouse, this.graph.points, 10);

    if (this.dragging) {
      this.selected.x = this.mouse.x;
      this.selected.y = this.mouse.y;
    }
  }

  #handleMouseLeave() {
    this.properties.mousex.innerHTML = 0;
    this.properties.mousey.innerHTML = 0;
  }

  #select(point) {
    if (this.selected) {
      this.graph.tryAddSegment(new Segment(this.selected, point));
    }
    this.selected = point;
  }

  #removePoint(point) {
    this.graph.removePoint(point);
    this.hovered = null;
    if (this.selected === point) {
      this.selected = null;
    }
  }

  display() {
    this.graph.draw(this.ctx);

    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }

    if (this.selected) {
      const intent = this.hovered ?? this.mouse;
      new Segment(this.selected, intent).draw(this.ctx, { dash: [3, 3], hovered: this.hovered, color: "grey" });
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}