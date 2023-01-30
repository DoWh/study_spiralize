
function spiralize (n) {
    class SpiralizeClass {
        *directSideGen() {
            while (true){
                yield "right";
                yield "bottom";
                yield "left";
                yield "top";
            }
        }
        directSide = this.directSideGen();
        pos = {
            row : 1,
            column : 0
        }
        flag = true;
        constructor(n){
            this.lvls = Array(n).fill().map(() => Array(n).fill(1));
        }
        getRow(number){
            let result = [];
            for (let i = 0; i < this.lvls[0].length; i++) {
                result.push( this.lvls[number][i] );
            }
            return result;
        }
        setRow(arr,number){
            for (let i = 0; i < this.lvls[0].length; i++) {
                this.lvls[number][i] = arr[i];
            }
            
        }
        getColumn(number){
            let result = [];
            for (let i = 0; i < this.lvls[0].length; i++) {
                result.push( this.lvls[i][number] );
            }
            return result;
        }
        setColumn(arr,number){
            for (let i = 0; i < this.lvls[0].length; i++) {
                this.lvls[i][number] = arr[i];
            }
        }
        spirArr(arr,from,reverse){
            let flag = false;
            let stop = 0;
            if (reverse) {
                for (let i = from; i > 0; i--) {
                    if (arr[i-1] != 0) {
                        stop = i;
                        arr[i] = 0;
                        flag = true;
                    } else break;
                }
            } else {
                for (let i = from; i < arr.length-1; i++) {
                    if (arr[i+1] != 0) {
                        stop = i;
                        arr[i] = 0;
                        flag = true;
                    } else break;
                }
            }
            if (stop == from) flag = false;
            this.flag = flag;
            return [arr,stop];
        }
        spir(){
            let arr = [];
            switch (this.directSide.next().value) {
                case "right": console.log('#right');
                    arr = this.getRow(this.pos.row);
                    [arr, this.pos.column] = this.spirArr(arr,this.pos.column, false);
                    this.setRow(arr, this.pos.row);
                    break;
                case "bottom": console.log('#bottom');
                    arr = this.getColumn(this.pos.column);
                    [arr, this.pos.row] = this.spirArr(arr, this.pos.row, false);
                    this.setColumn(arr, this.pos.column);
                    break;
                case "left": console.log('#left');
                    arr = this.getRow(this.pos.row);
                    [arr, this.pos.column] = this.spirArr(arr, this.pos.column, true);
                    this.setRow(arr.reverse(), this.pos.row);
                    break;
                case "top": console.log('#top');
                    arr = this.getColumn(this.pos.column);
                    [arr, this.pos.row] = this.spirArr(arr, this.pos.row, true);
                    this.setColumn(arr, this.pos.column);
                    break;
            }
        }
    }

    let sp = new SpiralizeClass(n);

    while (sp.flag) {
        sp.spir();
    }
    return sp.lvls;
}
spiralize(7);