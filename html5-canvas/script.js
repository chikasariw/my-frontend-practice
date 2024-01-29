// Menggunakan Fabric.js
var canvasFabric = new fabric.Canvas('canvas-fabric', { backgroundColor: '#ffffff' });

// Menggunakan Konva.js
var stageKonva = new Konva.Stage({
    container: 'container',
    width: 800,
    height: 400,
});

var layer = new Konva.Layer();
stageKonva.add(layer);

// Menambahkan objek gambar ke Fabric.js
var rect = new fabric.Rect({
    left: 100,
    top: 100,
    width: 100,
    height: 100,
    fill: 'red'
});
canvasFabric.add(rect);

// Menambahkan objek gambar ke Konva.js
var rectKonva = new Konva.Rect({
    x: 200,
    y: 100,
    width: 100,
    height: 100,
    fill: 'blue',
});
layer.add(rectKonva);
layer.draw();
