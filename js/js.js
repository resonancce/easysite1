
class grid_Cell {
    constructor (grid_item){     // создание ячеек

        this.cell = document.createElement('div');
        this.cell.className = 'grid_cell';
        grid_item.appendChild(this.cell);
        if (Math.random() > 0.8) {

            this.spawn();   //генерация 2 и 4

        }


    }
    get value(){

        return this._value || 0;
    }

    set value(value){
        this._value = value ;
       if (value == 0) {
           this.cell.innerHTML = '' ;
       } else {this.cell.innerHTML = value}
    }
    clear() {
        this.value = '';
    }
    x2(cell){
        this.value += cell.value ;
        cell.clear();
    }

    spawn() {
        this.value = Math.random() > 0.9 ? 4 : 2;
    }
    get isEmpty() {
        return this.value == 0;
    }
}

class game_2048 {
    constructor(Element, size) {
        this.size = size;
        let grid_item = document.createElement('div');
        grid_item.className = 'grid';
        Element.appendChild(grid_item);


        this.grid = [];

        for (let i = 0; i < size; i++) {
            this.grid[i] = [];
            for (let j = 0; j < size; j++) {
                this.grid[i][j] = new grid_Cell(grid_item);

            }
        }

    }

        randomCell() {
            let emptyGridCells = [];
            for (let i = 0; i < this.grid.length; i++)
                for (let j = 0; j < this.grid[i].length; j++) {
                    if (!this.grid[i][j].value) {
                        emptyGridCells.push(this.grid[i][j]);
                    }
                }
            if (emptyGridCells.length) {
                emptyGridCells[getRandomInterval(0, emptyGridCells.length - 1)].spawn();
            } else {
                alert('loser');
            }
        }

    moveRight() {
        let hasMoved = false;
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = this.grid[i].length - 1; j >= 0; j--) {
                let currentCell = this.grid[i][j];
                let nextCellKey = j + 1;

                while (nextCellKey < this.size) {
                    let nextCell = this.grid[i][nextCellKey];
                    if (!nextCell.isEmpty || (nextCellKey == (this.size - 1)) ) {

                        this.grid[i][nextCellKey].x2(currentCell);
                        hasMoved = true;

                    }
                    nextCellKey++;
                    nextCell = this.grid[i][nextCellKey];
                }
            }
        }

        if (hasMoved) {
            this.randomCell();
        }
    }



}

let getRandomInterval = function (min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}


let game = new game_2048(document.body, 4);


function moveRect(e){



    switch(e.keyCode){

        case 37: // если нажата клавиша влево


            break;
        case 38:   // если нажата клавиша вверх

            break;
        case 39: game.moveRight();  // если нажата клавиша вправо

            break;
        case 40:   // если нажата клавиша вниз

            break;
    }
}

addEventListener("keydown", moveRect);
