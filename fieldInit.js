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

//adding coordinates and cells color
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