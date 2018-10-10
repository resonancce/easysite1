
class grid_Cell {
    constructor (grid_item){
        this.cell = document.createElement('div');
        this.cell.className = 'grid_cell';
        grid_item.appendChild(this.cell);
        if (Math.random() > 0.8) {

            this.value = Math.random() > 0.8 ? 4 : 2;
        }
        this.cell.onclick = this.math_x2.bind(this);
    }
    get value(){

        return this._value;
    }

    set value(value){
        this._value = value;
        this.cell.innerHTML = value;
    }

    math_x2(){
        this.value *= 2 ;
    }
}
class game_2048 {
 constructor (Element, size) {
     let grid_item = document.createElement('div');
     grid_item.className = 'grid';
     Element.appendChild(grid_item);

     for (let i = 0; i < size; i++) {
         for (let j = 0; j < size; j++) {
             new grid_Cell(grid_item);


         }
     }
 }
}
new game_2048(document.body, 4);



