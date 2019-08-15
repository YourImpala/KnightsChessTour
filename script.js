//creating title, description and start button
const title = document.createElement('h1');
document.body.appendChild(title);
title.innerHTML = "Knight's Chess Tour";

const description = document.createElement('p');
document.body.appendChild(description);
description.innerHTML = "Select a cell and press the start button";

const button = document.createElement('button');
document.body.appendChild(button);
button.id = 'start';
button.innerHTML = 'Start Tour'


//field and cells init
const field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

for (let i = 0; i < 64; i++) {
    const cell = document.createElement('div');
    field.appendChild(cell);
    cell.classList.add('cell');
    cell.id = i;
}

//adding coordinates and a bit of style
let cell = document.getElementsByClassName('cell');
let x=1, y=8;
for (i = 0; i < cell.length; i++) {
    if (x > 8) {
        x = 1;
        y--;
    }
    cell[i].setAttribute('X', x);
    cell[i].setAttribute('Y', y);
    x++;
    if(i % 2 == 0 && y % 2 == 0 || (i % 2 != 0 && y % 2 != 0)){
        cell[i].style.backgroundColor ="#611414";
    }else {
        cell[i].style.backgroundColor = "rgb(255, 248, 220)";
    }
}
//figure setting by click
document.querySelector('.field').addEventListener('click', (e) => {
    if (document.querySelector('.current')) {
        document.querySelector('.current').classList.remove('current');     
    }

    let id = e.target.id;
    cell[id].classList.add('current');   
});



//greedy algorithm
document.getElementById('start').onclick=start;

function start () {
    if (document.querySelector('.current')) {
        let step = 1;
        let cellId = document.querySelector('.current').id;
        cell[cellId].innerHTML = step;
        cell[cellId].classList.add('set');

        let currentX = cell[cellId].getAttribute('X');
        let currentY = cell[cellId].getAttribute('Y');

        function firstStep() {
            let availableMoves = [document.querySelector('[X="' + (+currentX + 1) +'"][Y="' + (+currentY + 2) +'"]'),
                                  document.querySelector('[X="' + (+currentX + 2) +'"][Y="' + (+currentY + 1) +'"]'),
                                  document.querySelector('[X="' + (+currentX + 2) +'"][Y="' + (+currentY - 1) +'"]'),
                                  document.querySelector('[X="' + (+currentX + 1) +'"][Y="' + (+currentY - 2) +'"]'),
                                  document.querySelector('[X="' + (+currentX - 1) +'"][Y="' + (+currentY - 2) +'"]'),
                                  document.querySelector('[X="' + (+currentX - 2) +'"][Y="' + (+currentY - 1) +'"]'),
                                  document.querySelector('[X="' + (+currentX - 2) +'"][Y="' + (+currentY + 1) +'"]'),
                                  document.querySelector('[X="' + (+currentX - 1) +'"][Y="' + (+currentY + 2) +'"]')
                                 ];

            for (let i = availableMoves.length - 1; i >= 0; i--) {
                if (!availableMoves[i] || availableMoves[i].classList.contains('set')) {
                    availableMoves.splice(i, 1);
                }
            }

            if (availableMoves.length > 0) {
                let secondAvailableMoves = [];
                function secondStep() {
                    for (let i = 0 ; i < availableMoves.length; i++) {
                        let nextX = availableMoves[i].getAttribute('X');
                        let nextY = availableMoves[i].getAttribute('Y');
                        let nextAvailableMoves = [document.querySelector('[X="' + (+nextX + 1) +'"][Y="' + (+nextY + 2) +'"]'),
                                        document.querySelector('[X="' + (+nextX + 2) +'"][Y="' + (+nextY + 1) +'"]'),
                                        document.querySelector('[X="' + (+nextX + 2) +'"][Y="' + (+nextY - 1) +'"]'),
                                        document.querySelector('[X="' + (+nextX + 1) +'"][Y="' + (+nextY - 2) +'"]'),
                                        document.querySelector('[X="' + (+nextX - 1) +'"][Y="' + (+nextY - 2) +'"]'),
                                        document.querySelector('[X="' + (+nextX - 2) +'"][Y="' + (+nextY - 1) +'"]'),
                                        document.querySelector('[X="' + (+nextX - 2) +'"][Y="' + (+nextY + 1) +'"]'),
                                        document.querySelector('[X="' + (+nextX - 1) +'"][Y="' + (+nextY + 2) +'"]')
                                        ];
                        for (let i=nextAvailableMoves.length-1; i>=0; i--) {
                            if (!nextAvailableMoves[i] || nextAvailableMoves[i].classList.contains('set')) {
                                nextAvailableMoves.splice(i, 1);
                            }
                        }
                        
                        secondAvailableMoves.push(nextAvailableMoves.length);
                    }
                    return secondAvailableMoves;
                }
                secondAvailableMoves = secondStep();
                //refact this algoritm
                let k = secondAvailableMoves.length;
                let min = secondAvailableMoves[0];
                let index = 0;
                while (k--) {
                    if ( secondAvailableMoves[k] < min) {
                        min = secondAvailableMoves[k];
                        index = k;
                    }
                }
                step++;
                document.querySelector('.current').classList.remove('current');

                availableMoves[index].classList.add('current');
                availableMoves[index].classList.add('set');
                availableMoves[index].innerHTML = step;

                currentX = availableMoves[index].getAttribute('X');
                currentY = availableMoves[index].getAttribute('Y');

                if (step == 64) {
                    clearInterval(interval);
                }
            }
            
        }let interval = setInterval( () => {
            firstStep();
        }, 100);
        
    }
    else {
        alert('Choose the cell');
    }
}