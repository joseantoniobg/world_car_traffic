const myCanvas = document.getElementById("myCanvas");

myCanvas.width = 600;
myCanvas.height = 600;

const ctx = myCanvas.getContext("2d");

const p1 = new Point(200, 200);
const p2 = new Point(500, 200);
const p3 = new Point(400, 400);
const p4 = new Point(100, 300);

const s1 = new Segment(p1, p2);
const s2 = new Segment(p1, p3);
const s3 = new Segment(p1, p4);
const s4 = new Segment(p3, p2);

const graph = new Graph([p1, p2, p3, p4], [s1, s2, s3, s4]);

graph.draw(ctx);

function addRandomPoint() {
  graph.addPoint(new Point(Math.random() * myCanvas.width, Math.random() * myCanvas.height));
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  graph.draw(ctx);
}
