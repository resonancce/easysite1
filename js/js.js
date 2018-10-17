
class grid_Cell {
    constructor (grid_item, game_2048){
        // создание ячеек
        this.game_2048 = game_2048;
        this.grid_item = grid_item;
        this.cell = document.createElement('div');
        this.cell.className = 'grid_cell';
        grid_item.appendChild(this.cell);


               if (Math.random() > 0.9) {
                   this.spawn();
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
       this.cell.setAttribute('color', value);
    }

    clear() {
        this.value = '';
    }


    x2(cell){
        if (this.value){
            this.game_2048.ratting(this.value + cell.value);
        }
        this.value += cell.value ;

        new Animate(cell, this);
        cell.clear();
    }

    spawn() {
        this.value = Math.random() > 0.9 ? 4 : 2;
    }

    get isEmpty() {
        return this.value == 0;
    }

    isSameGridCell(cell){
        return this.value == cell.value;
    }


}

class Animate {

    constructor (fromCell, toCell){
        this.cell = fromCell.cell.cloneNode(true);
        this.cell.className = 'animate';
        fromCell.grid_item.appendChild(this.cell);

        this.cell.style.top =  fromCell.cell.offsetTop + 'px';
        this.cell.style.left =  fromCell.cell.offsetLeft + 'px';

        fromCell.grid_item.appendChild(this.cell);





        setTimeout(function () {
            fromCell.grid_item.removeChild(this.cell);

        }.bind(this), 1000)
       // toCell.cell.offsetTop
        //toCell.cell.offsetLeft
    }

}
class game_2048 {
    constructor(Element, size) {
        this.size = size;
        let grid_item = document.createElement('div');
        grid_item.className = 'grid';
        Element.appendChild(grid_item);
        this.sum = 0;

        this.grid = [];

        for (let i = 0; i < size; i++) {
            this.grid[i] = [];
            for (let j = 0; j < size; j++) {

                    this.grid[i][j] = new grid_Cell(grid_item, this);

            }
        }

    }

    set sum(value){
        this._sum = value;
        document.querySelector('.score').innerHTML = value;//
    }

    get sum(){
        return this._sum;
    }

    ratting(value){
        this.sum += value;
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
                emptyGridCells[getRandomInterval(0, emptyGridCells.length -1  )].spawn();
            } else {
                alert('loser');
            }



            for(let i = 0; i < this.grid.length; i++){
                for (let j = 0; j < this.grid[i].length; j++) {

                    if (this.grid[i][j].value == 8 ){

                            setTimeout(function () {
                                if (confirm("Начать новую?")) {

                                }
                                else {
                                    location.reload();
                                }
                            },200)




                    }

                }
            }


        }




    moveRight() {
        let hasMoved = false;
        for (let i = 0; i < this.size; i++) {
            for (let j = this.size - 1; j >= 0; j--) {
                let currentCell = this.grid[i][j];
                let nextCellKey = j + 1;

                while (nextCellKey < this.size) {
                    let nextCell = this.grid[i][nextCellKey];
                    if (!nextCell.isEmpty || this.LastKey(nextCellKey) ) {
                        if ((nextCell.isEmpty && this.LastKey(nextCellKey))
                            || nextCell.isSameGridCell(currentCell)) {
                            this.grid[i][nextCellKey].x2(currentCell);
                            hasMoved = true;
                            } else if (!nextCell.isEmpty &&   nextCellKey - 1 != j) {
                            this.grid[i][nextCellKey - 1].x2(currentCell);
                            hasMoved = true;
                        }
                            break;
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

    moveLeft() {
        let hasMoved = false;
        for (let i = 0; i < this.size; i++) {
            for (let j = 1; j < this.size ; j++) {
                let currentCell = this.grid[i][j];
                let nextCellKey = j - 1;

                while ( nextCellKey >= 0) {
                    let nextCell = this.grid[i][nextCellKey];
                    if (!nextCell.isEmpty || (this.firstkey(nextCellKey)) ) {
                        if ((nextCell.isEmpty && this.firstkey(nextCellKey))
                            || nextCell.isSameGridCell(currentCell)) {
                            this.grid[i][nextCellKey].x2(currentCell);
                            hasMoved = true;
                        } else if (!nextCell.isEmpty &&   nextCellKey + 1 != j) {
                            this.grid[i][nextCellKey + 1 ].x2(currentCell);
                            hasMoved = true;
                        }
                        break;
                    }
                    nextCellKey--;
                    nextCell = this.grid[i][nextCellKey];
                }
            }
        }

        if (hasMoved) {
            this.randomCell();
        }
    }
    moveUp() {
        let hasMoved = false;
        for (let j = 0; j < this.size; j++) {
            for (let i = 1  ; i < this.size; i++) {
                let currentCell = this.grid[i][j];
                let nextCellKey = i - 1;

                while ( nextCellKey >= 0) {
                    let nextCell = this.grid[nextCellKey][j];
                    if (!nextCell.isEmpty || (this.firstkey(nextCellKey)) ) {
                        if ((nextCell.isEmpty && this.firstkey(nextCellKey))
                            || nextCell.isSameGridCell(currentCell)) {
                            this.grid[nextCellKey][j].x2(currentCell);
                            hasMoved = true;
                        } else if (!nextCell.isEmpty &&   nextCellKey + 1 != i) {
                            this.grid[nextCellKey + 1][j].x2(currentCell);
                            hasMoved = true;
                        }
                        break;
                    }
                    nextCellKey--;
                    nextCell = this.grid[nextCellKey][j];
                }
            }
        }

        if (hasMoved) {
            this.randomCell();
        }
    }
    moveDown() {
        let hasMoved = false;
        for (let j = 0; j < this.size; j++) {
            for (let i = this.size - 1 ; i >= 0; i--) {
                let currentCell = this.grid[i][j];
                let nextCellKey = i + 1;

                while (nextCellKey < this.size) {
                    let nextCell = this.grid[nextCellKey][j];
                    if (!nextCell.isEmpty || this.LastKey(nextCellKey) ) {
                        if ((nextCell.isEmpty && this.LastKey(nextCellKey))
                            || nextCell.isSameGridCell(currentCell)) {
                            this.grid[nextCellKey][j].x2(currentCell);
                            hasMoved = true;
                        } else if (!nextCell.isEmpty &&   nextCellKey - 1 != i) {
                            this.grid[nextCellKey - 1][j].x2(currentCell);
                            hasMoved = true;
                        }
                        break;
                    }
                    nextCellKey++;
                    nextCell = this.grid[nextCellKey][j];
                }
            }
        }

        if (hasMoved) {
            this.randomCell();
        }
    }
    LastKey(key){
        return key == (this.size - 1);
    }
    firstkey(key){
        return key == 0;
    }
}

let getRandomInterval = function (min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}


let game = new game_2048(document.body, 4);


function moveRect(e){



    switch(e.keyCode){

        case 37: game.moveLeft();// если нажата клавиша влево
            break;
        case 38: game.moveUp() ; // если нажата клавиша вверх

            break;
        case 39: game.moveRight();  // если нажата клавиша вправо

            break;
        case 40: game.moveDown(); // если нажата клавиша вниз

            break;
    }
}

addEventListener("keydown", moveRect);
