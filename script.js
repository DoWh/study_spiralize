
function spiralize (n) {
    class SpiralizeClass {
        constructor(n){
            this.lvls = Array(n).fill().map(() => Array(n).fill(1));
            this.init();
        }
        directSide = this.directSideGen();
        pos = {
            row : 1,
            column : 0
        }
        flag = true;
        *directSideGen() {
            while (true){
                yield "right";
                yield "bottom";
                yield "left";
                yield "top";
            }
        }
        getRow(number){
            let result = [];
            for (let i = 0; i < this.lvls[0].length; i++) {
                result.push( this.lvls[number][i] );
            }
            return result;
        }
        setRow(arr,number,direct){
            if (direct == "right") {
                let i = 0;
                const timer = setInterval(()=>{
                    if (this.lvls[number][i] !== arr[i]) document.getElementsByClassName(`n${number}_${i}`)[0].src = "/img/red_square-48.png";
                    this.lvls[number][i] = arr[i];
                    i++;
                    if (i == this.lvls[0].length) clearTimeout(timer);
                }, 800/this.lvls[0].length);
            } else {
                let i = this.lvls[0].length - 1;
                const timer = setInterval(()=>{
                    if (this.lvls[number][i] !== arr[i]) document.getElementsByClassName(`n${number}_${i}`)[0].src = "/img/red_square-48.png";
                    this.lvls[number][i] = arr[i];
                    i--;
                    if (i == 0) clearTimeout(timer);
                }, 800/this.lvls[0].length);
            }
        }
        getColumn(number){
            let result = [];
            for (let i = 0; i < this.lvls[0].length; i++) {
                result.push( this.lvls[i][number] );
            }
            return result;
        }
        setColumn(arr,number,direct){
            if (direct == "bottom") {
                let i = 0;
                const timer = setInterval(()=>{
                    if (this.lvls[i][number] !== arr[i]) document.getElementsByClassName(`n${i}_${number}`)[0].src = "/img/red_square-48.png";
                    this.lvls[i][number] = arr[i];
                    i++;
                    if (i == this.lvls[0].length) clearTimeout(timer);
                }, 800/this.lvls[0].length);
            } else {
                let i = this.lvls[0].length - 1;
                const timer = setInterval(()=>{
                    if (this.lvls[i][number] !== arr[i]) document.getElementsByClassName(`n${i}_${number}`)[0].src = "/img/red_square-48.png";
                    this.lvls[i][number] = arr[i];
                    i--;
                    if (i == 0) clearTimeout(timer);
                }, 800/this.lvls[0].length);
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
                    this.setRow(arr, this.pos.row, "right");
                    break;
                case "bottom": console.log('#bottom');
                    arr = this.getColumn(this.pos.column);
                    [arr, this.pos.row] = this.spirArr(arr, this.pos.row, false);
                    this.setColumn(arr, this.pos.column, "bottom");
                    break;
                case "left": console.log('#left');
                    arr = this.getRow(this.pos.row);
                    [arr, this.pos.column] = this.spirArr(arr, this.pos.column, true);
                    this.setRow(arr.reverse(), this.pos.row, "left");
                    break;
                case "top": console.log('#top');
                    arr = this.getColumn(this.pos.column);
                    [arr, this.pos.row] = this.spirArr(arr, this.pos.row, true);
                    this.setColumn(arr, this.pos.column, "top");
                    break;
            }
        }
        init(){
            //append n*n matrix of img into '#spir'
            //every elem has 2 class
            //'row', 'n$$' $$ - number of elem!
            let elem;
            for (let i = 0; i < n; i++) {
                elem = document.createElement('div');
                elem.className = "row";
                document.getElementById("spir").append(elem);
                for (let j = 0; j < n; j++) {
                    elem = document.createElement('img');
                    elem.className += `n${i}_${j}`;
                    elem.src = "/img/green-square-48.png";
                    document.getElementById("spir").lastChild.append(elem);
                }
            }
        }
    }
    let sp = new SpiralizeClass(n);
    const timer = setInterval(()=>{
        if (sp.flag) {
            sp.spir();
        } else {
            clearTimeout(timer);
            console.log(sp.lvls);
        }
    },1000);
}
spiralize(30);