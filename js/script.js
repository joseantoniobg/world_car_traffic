const myCanvas = document.getElementById("myCanvas");
const mousex = document.getElementById("mousex");
const mousey = document.getElementById("mousey");

myCanvas.width = 600;
myCanvas.height = 600;

const ctx = myCanvas.getContext("2d");

const graphString = localStorage.getItem("graph");
const graphInfo = graphString ? JSON.parse(graphString) : null;
const graph = graphInfo ? Graph.load(graphInfo) : new Graph();
const world = new World(graph);
const viewPort = new ViewPort(myCanvas);
const graphEditor = new GraphEditor(viewPort, graph, { mousex, mousey });

animate();

function animate() {
  viewPort.reset();
  world.generate();
  world.draw(ctx);
  graphEditor.display();
  requestAnimationFrame(animate);
}

function dispose() {
  graphEditor.dispose();
}

function save() {
  localStorage.setItem("graph", JSON.stringify(graph));
}