const myCanvas = document.getElementById("myCanvas");
const mousex = document.getElementById("mousex");
const mousey = document.getElementById("mousey");

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
const viewPort = new ViewPort(myCanvas, graph);
const graphEditor = new GraphEditor(myCanvas, graph, { mousex, mousey  });

animate();

function animate() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  graphEditor.display();
  requestAnimationFrame(animate);
}

// graph.draw(ctx);

// function redraw() {
//   ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
//   graph.draw(ctx);
// }

// function addRandomPoint() {
//   const resp = graph.tryAddPoint(new Point(Math.random() * myCanvas.width, Math.random() * myCanvas.height));
//   if (resp) {
//     redraw();
//   }
//   console.log(resp);
// }

// function addRandomSegment() {
//   const index1 = Math.floor(Math.random() * graph.points.length);
//   const index2 = Math.floor(Math.random() * graph.points.length);
//   const success = graph.tryAddSegment(new Segment(graph.points[index1], graph.points[index2]));

//   if (success) {
//     redraw();
//   }

//   console.log(success);
// }

// function removeRandomSegment() {
//   if (graph.segments.length === 0) {
//     return;
//   }
//   const index = Math.floor(Math.random() * graph.segments.length);
//   graph.removeSegment(graph.segments[index]);
//   redraw();
// }

// function removeRandomPoint() {
//   if (graph.points.length === 0) {
//     return;
//   }
//   const index = Math.floor(Math.random() * graph.points.length);
//   graph.removePoint(graph.points[index]);
//   redraw();
// }

// function removeAll() {
//   graph.dispose();
//   redraw();
// }