//constant
var BAR_COUNT = 100
var BARCODE_WIDTH = 0.80;
var BARCODE_HEIGHT = 0.60
var MOTION_SPEED = 0.5;
var BAR_SIZE = 1/150;


function affichage() {
    canvas  = document.getElementById('canvas');
    canvas.width = 800;
    canvas.height = 800;
    canvas.style.backgroundColor="white";
    context = canvas.getContext('2d');

    window.addEventListener('resize', resizeCanvas, false);
    
    
    
    function resizeCanvas() {
            canvas.width = document.getElementById('simulation_graphique').offsetWidth;
            canvas.height = window.innerHeight*0.90;
            canvas.style.backgroundColor="white";                    
    }
    resizeCanvas();
    globalID = requestAnimationFrame(graphic_design);

}

var array = initialize();

function graphic_design() {
    context.globalCompositeOperation = 'destination-over';
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "black";
    var widthBarCodes = canvas.width * BARCODE_WIDTH;
    var heightBarCodes = canvas.height * BARCODE_HEIGHT;
    var heightMaxBarCodes = (canvas.height - heightBarCodes) / 2;
    var widthMaxBarCodes = (canvas.width - widthBarCodes) / 2;
    
    var cos = 0;
    for(var i = 0; i < array.length; i++) {
        array[i].position = (array[i].position+(MOTION_SPEED/100)*(2-Math.abs(Math.cos(array[i].position))))%(2*Math.PI);
        cos = (Math.cos(array[i].position)+1)*(widthBarCodes/2)-((Math.cos(array[i].position)+1)/2)*array[i].size;
        context.fillRect(cos + widthMaxBarCodes, heightMaxBarCodes, array[i].size*widthBarCodes, heightBarCodes);
    }
    globalID = requestAnimationFrame(graphic_design);
}

function barre(size, position){
    this.size = size;
    this.position = position;
}



function initialize(){
    var arrayBarres = [];
    var size = 0;
    var pi = 0;
    for(var i = 0; i < BAR_COUNT; i++) {
        size = Math.random()*BAR_SIZE+BAR_SIZE; 
        pi = Math.random()*2*Math.PI;
        arrayBarres.push(new barre(size, pi));
    }
    return(arrayBarres);
}

window.onload = affichage;
var globalID;

function stopFunction(){
    cancelAnimationFrame(globalID);
}

function startFunction(){
    requestAnimationFrame(graphic_design);
}



/* $("#stop").on("click", function() {
cancelAnimationFrame(globalID);
});
$("#start").on("click", function() {
globalID = requestAnimationFrame(repeatOften);
}); */