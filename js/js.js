




class grid_Cell {
    constructor (grid_item){     // создание ячеек

        this.cell = document.createElement('div');
        this.cell.className = 'grid_cell';
        grid_item.appendChild(this.cell);
        if (Math.random() > 0.8) {

            this.spawn();   //генерация 2 и 4

        }
        this.cell.onclick = this.x2.bind(this);

    }
    get value(){

        return this._value || '';
    }

    set value(value){
        this._value = value ;

        this.cell.innerHTML = value;

    }

    x2(){
        this.value *= 2 ;
    }

    spawn() {
        this.value = Math.random() > 0.9 ? 4 : 2;
    }
}
class game_2048 {
    constructor (Element, size) {
        let grid_item = document.createElement('div');
        grid_item.className = 'grid';
        Element.appendChild(grid_item);


        this.grid = []

        for (let i = 0; i < size; i++) {
            this.grid[i] = [];
            for (let j = 0; j < size; j++) {
                this.grid[i][j] = new grid_Cell(grid_item);

            }
        }
        console.log(this.grid);
    }
    randomcell() {
        let emptyGridCell = [];
        for (let i = 0; i<this.grid; i++)
            for (let j = 0; j < this.grid[i].length; j++) {
             if(!this.grid[i][j].value){
                 emptyGridCell.push(this.grid[i][j]);
             }
            }
        getRandomInterval(0, emptyGridCell.length - 1);

    }

    moveCellRight(){
        for (let i = 0; i < this.grid; i++)
            for (let j = this.grid[i].length - 1; j >= 0;j++){

            }

    }

}
let getRandomInterval = function (min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}

new game_2048(document.body, 4);


function moveRect(e){



    switch(e.keyCode){

        case 37:  // если нажата клавиша влево


            break;
        case 38:   // если нажата клавиша вверх

            break;
        case 39:   // если нажата клавиша вправо

            break;
        case 40:   // если нажата клавиша вниз

            break;
    }
}


addEventListener("keydown", moveRect);