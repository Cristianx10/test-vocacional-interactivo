import { Logica } from '../Pollo';

export class Gamer {


    missionaryCount:number = 0;
    cannibalCount:number = 0;
    tracker: number[] = [3, 3, 1];
    parent: number[] = [];
    intentos = 3;

    log: Logica;

    constructor(log: Logica) {
        this.log = log;

        let oneMissionary = document.querySelector('#oneMissionary')
        if (oneMissionary) {
            oneMissionary.addEventListener('click', () => this.play(1, 0));
        }
        let oneCannibal = document.querySelector('#oneCannibal');
        if (oneCannibal) {
            oneCannibal.addEventListener('click', () => this.play(0, 1));
        }
        let twoMissionaries = document.querySelector('#twoMissionaries');
        if (twoMissionaries) {
            twoMissionaries.addEventListener('click', () => this.play(2, 0));
        }
        let twoCannibals = document.querySelector('#twoCannibals');
        if (twoCannibals) {
            twoCannibals.addEventListener('click', () => this.play(0, 2));
        }
        let oneMissionaryOneCannibal = document.querySelector('#oneMissionaryOneCannibal');
        if (oneMissionaryOneCannibal) {
            oneMissionaryOneCannibal.addEventListener('click', () => this.play(1, 1));
        }

    }



    // take missionaries and cannibals count and apply appropriate operation
    play = (M:number, C:number) => {
        this.missionaryCount = M;
        this.cannibalCount = C;
        this.applyMove(this.missionaryCount, this.cannibalCount);
    }
    // main function 
    applyMove(M:number, C:number) {
        this.parent = this.tracker;
        // check boat is at right or left bank
        if (this.tracker[2] == 1) {
            // check Total person in a boat
            if (M + C <= 2) {
                // User Input cannot be greater than available Missionaries and Cannibals.
                if (M > this.tracker[0] || C > this.tracker[1]) {
                    console.log("Invalid Move");
                } else {
                    this.tracker[0] = this.tracker[0] - M;
                    this.tracker[1] = this.tracker[1] - C;
                    if (this.tracker[2] == 1 ? this.tracker[2] = 0 : this.tracker[2] = 1)
                    console.log(this.tracker);
                    if (this.tracker[0] == 0 && this.tracker[1] == 0 && this.tracker[2] == 0) {
                        console.log("YOU WON");
                        alert("HURRAH! Ganaste!");

                        //Logica de cambiar pantalla
                        location.href = "/resultados.html";



                    } else if (this.checkfromState()) {
                        console.log("Acceptable State");
                    } else {
                        console.log("GAME OVER");
                        alert("PERDISTE");

                        //Logica de cambiar pantalla
                        this.intentos -= 1;
                        if (this.intentos <= 0) {
                            location.href = "/resultados.html";
                        }

                        console.log("ja manga de putitos" + this.intentos);
                        //  location.reload();

                        this.tracker = [3, 3, 1];
                    }
                }
            } else {
                console.log("Cannot accomodate more than two person in a boat");
            }
        } else {
            // Boat is the right bank case.
            if (M > (3 - this.tracker[0]) || C > (3 - this.tracker[1])) {
                console.log("This means invalid input");
            } else {
                this.tracker[0] = this.tracker[0] + M;
                this.tracker[1] = this.tracker[1] + C;
                (this.tracker[2] == 1 ? this.tracker[2] = 0 : this.tracker[2] = 1);
                console.log(this.tracker);
                if (this.tracker[0] == 0 && this.tracker[1] == 0 && this.tracker[2] == 0) {
                    console.log("YOU WON");
                } else if (this.checkfromState()) {
                    console.log("Acceptable State");
                } else {
                    console.log("Game Over");
                }
            }
        }
    }
    // to check if a state is acceptable or not from the 'state' array
    checkfromState() {
        for (let i = 0; i < this.log.state.length; i++) {
            if (this.log.state[i].value[0] == this.tracker[0] && this.log.state[i].value[1] == this.tracker[1] && this.log.state[i].value[2] == this.tracker[2]) {
                return true;
            }
        }
        return false;
    }

}
/*
this.getscript("sketch.js", function(){
    getPantalla();
 });
// applying 5 possible operations on button click events.
let botones=document.querySelectorAll('.buttons');

if(getPantalla()==0){
    botones.style.visibility="hidden";
}

*/