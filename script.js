document.getElementById('start').onclick=startAlgoritm;

function startAlgoritm () {
    //check the presence of a knight on the field
    if (document.querySelector('.current')) {
        let step = 1;
        let cellId = document.querySelector('.current').id;
        cell[cellId].innerHTML = step;
        cell[cellId].classList.add('set');

        let currentX = cell[cellId].getAttribute('X');
        let currentY = cell[cellId].getAttribute('Y');

        function availableMoves() {
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
                let secondAvailableMovesStorage = [];

                function secondAvailableMoves() {
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
                        
                        secondAvailableMovesStorage.push(nextAvailableMoves.length);
                    }
                    return secondAvailableMovesStorage;
                }
                secondAvailableMovesStorage = secondAvailableMoves();
                

                let k = secondAvailableMovesStorage.length;
                let min = secondAvailableMovesStorage[0];
                let index = 0;
                while (k--) {
                    if ( secondAvailableMovesStorage[k] < min) {
                        min = secondAvailableMovesStorage[k];
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
            
        }
        let interval = setInterval( () => {
            availableMoves();
        }, 70);
        
    }
    else {
        alert('Choose the cell');
    }
}