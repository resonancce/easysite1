class game_2048 {
    constructor(Element, size = 4) {
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
        console.log(this.grid);
    }

    moveRightcell() {
        let hasMoved = false;
        for (let i = 0; i < this.grid; i++) {
            for (let j = this.grid[i].length - 2; j >= 0; j--) {
                if (this.grid[i].isempty) {
                    continue;
                }
                let nextCellKey = j + 1;

                while (nextCellKey < this.size) {
                    let nextCell = this.grid[i][nextCellKey];
                    if (!nextCell.isempty || (nextCellKey == (this.size - 1))) {
                        this.grid[i][nextCellKey].x2(this.grid[i][j]);
                        break;
                    }
                    nextCellKey++;
                    nextCell = this.grid[i][nextCellKey];
                }
            }
        }

        if (hasMoved) {
            this.randomcell();
        }
    }

    randomcell() {
        let emptyGridCells = [];
        for (let i = 0; i < this.grid; i++)
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



}
