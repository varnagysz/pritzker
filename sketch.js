let margin = 50;
let data;
let pritzker;

function preload() {
    data = loadTable('pritzker.csv', 'csv', 'header');
}

function setup() {
    createCanvas(windowWidth-4, windowHeight-4);
    colorMode(HSL, 360, 100, 100, 100);
    textFont('Trebuchet MS');
}

function draw() {
    background(150,6,94);
    textAlign(CENTER, CENTER);
    textStyle(NORMAL);
    let baseline = height*0.75;
    // show horizontal line
    strokeWeight(1);
    stroke(0,0,57,100);
    line(0, baseline, width, baseline);
    let dataArray = data.getArray();
    let yearlist = [];
    for (let i = 0; i < dataArray.length; i++) {
        if (i+1 >= dataArray.length || dataArray[i][0] !== dataArray[i+1][0]) {
            yearlist.push(dataArray[i][0]);
        }
    }
    let columnWidth = (width - margin * 2) / (yearlist.length-1);
    // display years
    fill(0,0,37);
    strokeWeight(0);
    textStyle(BOLD);
    for (let i = 0; i < yearlist.length; i++) {
        if (mouseX > margin + i*columnWidth - columnWidth/2 && mouseX < margin + i*columnWidth + columnWidth/2) {
            text(yearlist[i], margin + i*columnWidth, baseline + 25);
        } else if (!(yearlist[i]%5)) {
            text(yearlist[i], margin + i*columnWidth, baseline + 25);
        }
    }
    let j = 0;
    //display names, age-lines and circles
    /*for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i][0] === dataArray[i+2][0]) {
            let yearindex = yearlist.indexOf(dataArray[i][0]);
            text(dataArray[i][1], margin + yearindex*columnWidth, baseline + 50);
            text(dataArray[i+1][1], margin + yearindex*columnWidth, baseline + 70);
            text(dataArray[i+2][1], margin + yearindex*columnWidth, baseline + 90);
        }
    }*/
    for (let i = 0; i < dataArray.length; i++) {
        if (i+1 >= dataArray.length || dataArray[i][0] !== dataArray[i+1][0]) {
            // show vertical lines
            strokeWeight(1);
            stroke(0,0,67);
            line(margin + j*columnWidth, baseline, margin + j*columnWidth, baseline - dataArray[i][5]*4);
            //strokeWeight(2);
            stroke(0,0,37);
            line(margin + j*columnWidth, baseline - dataArray[i][3]*4, margin + j*columnWidth, baseline - dataArray[i][5]*4);
            // show bubble when own firm started
            strokeWeight(0);
            if (dataArray[i][5] !== "0") {
                radialGradient(margin + j*columnWidth, baseline - dataArray[i][5]*4 - 6, 0, margin + j*columnWidth, baseline - dataArray[i][5]*4 - 6, 25, color(0,0,81,100), color(0,0,61,100));
                circle(margin + j*columnWidth, baseline - dataArray[i][5]*4, 30);
            }
            // show bubble when awarded - blue for male, red for female
            if (dataArray[i][6] === 'M') {
                radialGradient(margin + j*columnWidth, baseline - dataArray[i][3]*4 - 10, 0, margin + j*columnWidth, baseline - dataArray[i][3]*4 - 10, 40, color(227,28,57,90), color(235,31,30,90));
                circle(margin + j*columnWidth, baseline - dataArray[i][3]*4, 50);
            } else {
                radialGradient(margin + j*columnWidth, baseline - dataArray[i][3]*4 - 10, 0, margin + j*columnWidth, baseline - dataArray[i][3]*4 - 10, 40, color(3,30,53,90), color(4,30,38,90));
                circle(margin + j*columnWidth, baseline - dataArray[i][3]*4, 50);
            }
            if (mouseX > margin + j*columnWidth - columnWidth/2 && mouseX < margin + j*columnWidth + columnWidth/2) {
                // show winner name
                textStyle(NORMAL);
                fill(0,0,37);
                text(dataArray[i][1], margin + j*columnWidth, baseline + 50);
                // show country born in
                textStyle(ITALIC);
                text(dataArray[i][7], margin + j*columnWidth, baseline + 65);
                textStyle(NORMAL);
                // show age when awarded
                fill(0,0,100);
                text(dataArray[i][3], margin + j*columnWidth, baseline - dataArray[i][3]*4);
                // show age when own firm started
                if (dataArray[i][5] !== "0") {
                    text(dataArray[i][5], margin + j*columnWidth, baseline - dataArray[i][5]*4);
                }
            }
            j++;
        } else if (i+2 >= dataArray.length || dataArray[i][0] !== dataArray[i+2][0]){
            // show bubble when own firm started if split between 2 winners
            strokeWeight(0);
            if (dataArray[i][5] !== "0") {
                radialGradient(margin + j*columnWidth, baseline - dataArray[i][5]*4 - 6, 0, margin + j*columnWidth, baseline - dataArray[i][5]*4 - 6, 25, color(0,0,81,100), color(0,0,61,100));
                circle(margin + j*columnWidth, baseline - dataArray[i][5]*4, 30);
            }
            // show bubble when awarded if split between 2 winners- blue for male, red for female
            if (dataArray[i][6] === 'M') {
                radialGradient(margin + j*columnWidth, baseline - dataArray[i][3]*4 - 10, 0, margin + j*columnWidth, baseline - dataArray[i][3]*4 - 10, 40, color(227,28,57,90), color(235,31,30,90));
                circle(margin + j*columnWidth, baseline - dataArray[i][3]*4, 50);
            } else {
                radialGradient(margin + j*columnWidth, baseline - dataArray[i][3]*4 - 10, 0, margin + j*columnWidth, baseline - dataArray[i][3]*4 - 10, 40, color(3,30,53,90), color(4,30,38,90));
                circle(margin + j*columnWidth, baseline - dataArray[i][3]*4, 50);
            }
            if (mouseX > margin + j*columnWidth - columnWidth/2 && mouseX < margin + j*columnWidth + columnWidth/2) {
                // show winner name if split between 2 winners
                textStyle(NORMAL);
                fill(0,0,37);
                text(dataArray[i][1], margin + j*columnWidth, baseline + 80);
                // show country born in if split between 2 winners
                textStyle(ITALIC);
                text(dataArray[i][7], margin + j*columnWidth, baseline + 95);
                textStyle(NORMAL);
                // show age when awarded if split between 2 winners
                fill(0,0,100);
                text(dataArray[i][3], margin + j*columnWidth, baseline - dataArray[i][3]*4);
                // show age when own firm started if split between 2 winners
                if (dataArray[i][5] !== "0") {
                    text(dataArray[i][5], margin + j*columnWidth, baseline - dataArray[i][5]*4);
                }
            }
        } else {
            // show bubble when own firm started if split between 3 winners
            strokeWeight(0);
            if (dataArray[i][5] !== "0") {
                radialGradient(margin + j*columnWidth, baseline - dataArray[i][5]*4 - 6, 0, margin + j*columnWidth, baseline - dataArray[i][5]*4 - 6, 25, color(0,0,81,100), color(0,0,61,100));
                circle(margin + j*columnWidth, baseline - dataArray[i][5]*4, 30);
            }
            // show bubble when awarded if split between 3 winners - blue for male, red for female
            if (dataArray[i][6] === 'M') {
                radialGradient(margin + j*columnWidth, baseline - dataArray[i][3]*4 - 10, 0, margin + j*columnWidth, baseline - dataArray[i][3]*4 - 10, 40, color(227,28,57,90), color(235,31,30,90));
                circle(margin + j*columnWidth, baseline - dataArray[i][3]*4, 50);
            } else {
                radialGradient(margin + j*columnWidth, baseline - dataArray[i][3]*4 - 10, 0, margin + j*columnWidth, baseline - dataArray[i][3]*4 - 10, 40, color(3,30,53,90), color(4,30,38,90));
                circle(margin + j*columnWidth, baseline - dataArray[i][3]*4, 50);
            }
            if (mouseX > margin + j*columnWidth - columnWidth/2 && mouseX < margin + j*columnWidth + columnWidth/2) {
                // show winner name if split between 3 winners
                textStyle(NORMAL);
                fill(0,0,37);
                text(dataArray[i][1], margin + j*columnWidth, baseline + 110);
                // show country born in if split between 3 winners
                textStyle(ITALIC);
                text(dataArray[i][7], margin + j*columnWidth, baseline + 125);
                textStyle(NORMAL);
                // show age when awarded if split between 3 winners
                fill(0,0,100);
                text(dataArray[i][3], margin + j*columnWidth, baseline - dataArray[i][3]*4);
                // show age when own firm started if split between 3 winners
                if (dataArray[i][5] !== "0") {
                    text(dataArray[i][5], margin + j*columnWidth, baseline - dataArray[i][5]*4);
                }
            }
        }
    }
}

function radialGradient(sX, sY, sR, eX, eY, eR, colorS, colorE) {
    let gradient = drawingContext.createRadialGradient(sX, sY, sR, eX, eY, eR);
    gradient.addColorStop(0, colorS);
    gradient.addColorStop(1, colorE);
    
    drawingContext.fillStyle = gradient;
    //drawingContext.strokeStyle = gradient;
}