const myCanvas = document.getElementById("myCanvas");
const mousex = document.getElementById("mousex");
const mousey = document.getElementById("mousey");
const showHideGraphElementsButton = document.getElementById("showHideGraphElements");
let globalAlpha = 1;

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
  ctx.globalAlpha = globalAlpha;
  graphEditor.display();
  requestAnimationFrame(animate);
}

function dispose() {
  graphEditor.dispose();
}

function save() {
  localStorage.setItem("graph", JSON.stringify(graph));
}

function showHideGraphElements() {
  if (showHideGraphElementsButton.innerText.startsWith('Hide')) {
    globalAlpha = 0;
    showHideGraphElementsButton.innerText = "Show Graph Editing Elements";
    return;
  }

  globalAlpha = 1;
  showHideGraphElementsButton.innerText = "Hide Graph Editing Elements";
}