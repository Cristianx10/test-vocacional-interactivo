import React, { Component } from "react";
import ProcessingContext, { processingContext } from '../../comunicacion/ProcessingContext';
import p5 from "p5";
import Processing from "../../componentes/Processing/Processing";
import { AppProcessing } from '../../componentes/Processing/Processing';
import { Gamer } from './data/game';
import "./stylePollo.scss";

interface IPropsPollo {

}

export default class Pollo extends Component implements AppProcessing {

    processingContext: processingContext;
    processing: Processing;
    app: p5;
    logica?: Logica;

    constructor(props: IPropsPollo) {
        super(props);
        this.processingContext = ProcessingContext;
        this.processing = this.processingContext.actividad;
        this.processing.juego = this;
        this.app = this.processing.app;

    }

    preload() {

    }

    setup() {
        this.logica = new Logica(this.app);
    }

    draw() {
        if (this.logica)
            this.logica.draw();
    }

    mousePressed() {
        if (this.logica)
            this.logica.mouseClicked();
    }

    render() {
        return <div>
            <div>
                <h4>ESCOGE TU MOVIMIENTO</h4>
                <ul className="buttons">
                    <li id='oneMissionary'> 1 Pollito </li>
                    <li id='oneCannibal'> 1 Zorro </li>
                    <li id='twoMissionaries'> 2 Pollito </li>
                    <li id='twoCannibals'> 2 Zorros </li>
                    <li id='oneMissionaryOneCannibal'> 1 Pollito y 1 Zorro</li>
                </ul>
            </div>
        </div>;
    }
}


export class Logica {

    initialState: number[] = [3, 3, 1];
    goalState = [0, 0, 0];
    state: CreateState[] = [];
    killedState: CreateState[] = [];
    iterator = true;

    app: p5;
    imgBarca: p5.Image;
    imgConejo: p5.Image
    imgZorro: p5.Image
    imgFondo: p5.Image
    imgInstruc: p5.Image

    pantalla = 0;
    gamer: Gamer;


    constructor(app: p5) {
        this.app = app;

        this.gamer = new Gamer(this);

        this.app.frameRate(3);


        this.imgBarca = this.app.loadImage('/img/2019/pollo/img/barca.png');
        this.imgConejo = this.app.loadImage('/img/2019/pollo/img/pollo.png');
        this.imgZorro = this.app.loadImage('/img/2019/pollo/img/zorro.png');
        this.imgFondo = this.app.loadImage('/img/2019/pollo/img/fondo.png');
        this.imgInstruc = this.app.loadImage('/img/2019/pollo/img/instruc.png');

        console.log("Mi imagen", this.imgBarca)

        // Creating a root node.
        var rootNode = new CreateState();
        rootNode.value = this.initialState;
        rootNode.parent = this.initialState;
        rootNode.visited = false;

        /**Setup */


        // set x and y position of the root node.
        rootNode.x = this.app.width / 2;
        rootNode.y = 70;
        this.state.push(rootNode);
        while (this.iterator) {
            this.applyOperation(this.state[this.state.length - 1])
        }
        console.log("State:");
        console.log(this.state);
        console.log("Killed State:");
        console.log(this.killedState);

        this.app.imageMode(this.app.CENTER);

        this.pantalla = 1;
    }


    draw() {

        switch (this.pantalla) {

            case 0:

                this.app.image(this.imgInstruc, this.app.width / 2, this.app.height / 2);

                break;

            case 1:
                this.app.image(this.imgFondo, this.app.width / 2, this.app.height / 2);

                // set boat position
                let x = 0;
                if (this.gamer.tracker[2] == 1) {
                    x = this.app.width / 2 - 80;
                } else if (this.gamer.tracker[2] == 0) {
                    x = this.app.width / 2 + 80;
                }
                //Barca
                this.app.image(this.imgBarca, x, this.app.height / 2 + 180);


                // MISSIONARIES
                //izquierda
                for (let i = 0; i < this.gamer.tracker[0]; i++) {

                    this.app.image(this.imgConejo, this.app.width / 2 - 300 + i * 50, this.app.height / 2 + 125);
                }
                for (let i = 0; i < 3 - this.gamer.tracker[0]; i++) {

                    this.app.image(this.imgConejo, this.app.width / 2 + 300 + i * 50, this.app.height / 2 + 125);
                }
                for (let j = 0; j < this.gamer.tracker[1]; j++) {
                    // CANNIBALS
                    this.app.image(this.imgZorro, 280 + j * 60, this.app.height / 2 + 130);
                }

                //  j = 0;
                for (let j = 0; j < 3 - this.gamer.tracker[1]; j++) {
                    // CANNIBALS
                    //derecha
                    this.app.image(this.imgZorro, 980 + j * 60, this.app.height / 2 + 130);
                }

                break;

        }
    }


    mouseClicked() {
        console.log(this.app.mouseX + "," + this.app.mouseY);
        if (this.pantalla == 0 && this.app.mouseX >= 689 && this.app.mouseX < 815 && this.app.mouseY >= 550 && this.app.mouseY < 587) {

            this.pantalla = 1;
        }


    }



    // Generate new states from parent state.
    applyOperation(tempState: CreateState) {
        if (tempState.visited === true) {
            this.killedState.push(this.state[this.state.length - 1]);
            this.state.splice(this.state.length - 1, 1);
        } else {
            tempState.visited = true;
            let boatPosition = tempState.value[2];
            // If Boat is at the left bank
            if (boatPosition === 1) {
                // console.log("boat is going from Left to Right"); 

                // 2 Missionaries
                if (tempState.value[0] >= 2) {
                    this.addState(tempState, [tempState.value[0] - 2, tempState.value[1] - 0, 0]);
                }
                // 1 Missionary
                if (tempState.value[0] >= 1) {
                    this.addState(tempState, [tempState.value[0] - 1, tempState.value[1] - 0, 0]);
                }
                // 2 Cannibals
                if (tempState.value[1] >= 2) {
                    this.addState(tempState, [tempState.value[0] - 0, tempState.value[1] - 2, 0]);
                }
                // 1 Missionary and 1 Cannibal
                if (tempState.value[0] >= 1 && tempState.value[1] >= 1) {
                    this.addState(tempState, [tempState.value[0] - 1, tempState.value[1] - 1, 0]);
                }
                // 1 Cannibal
                if (tempState.value[1] >= 1) {
                    this.addState(tempState, [tempState.value[0] - 0, tempState.value[1] - 1, 0]);
                }
            } else if (boatPosition === 0) {
                // If Boat is at the right bank.
                // 1 Missionary and 1 Cannibal
                if (this.initialState[0] - tempState.value[0] > 0) {
                    this.addState(tempState, [tempState.value[0] + 1, tempState.value[1] + 0, 1]);
                }
                // 1 Cannibal
                if (this.initialState[1] - tempState.value[1] > 0) {
                    this.addState(tempState, [tempState.value[0] + 0, tempState.value[1] + 1, 1]);
                }
                // 2 Missionary
                if (this.initialState[0] - tempState.value[0] > 2) {
                    this.addState(tempState, [tempState.value[0] + 2, tempState.value[1] + 0, 1]);
                }
                // 2 Cannibals
                if (this.initialState[1] - tempState.value[1] > 2) {
                    this.addState(tempState, [tempState.value[0] + 0, tempState.value[1] + 2, 1]);
                }
                // 1 Missionary and 1 Cannibal
                if ((this.initialState[0] - tempState.value[0] > 0) && (this.initialState[1] - tempState.value[1] > 0)) {
                    this.addState(tempState, [tempState.value[0] + 1, tempState.value[1] + 1, 1]);
                }
            }
        }
    }


    // Function to check and add/delete the newly generated states.
    addState(parent: CreateState, value: number[]) {
        var temp = new CreateState();
        temp.value = value;
        temp.parent = parent.value;
        temp.visited = false;
        if (this.goalState[0] === value[0] && this.goalState[1] === value[1]) {
            this.state.push(temp);
            this.iterator = false;
        } else if ((temp.value[0] === 0) || temp.value[0] >= temp.value[1]) {
            if ((3 - temp.value[0] === 0) || (3 - temp.value[0] >= 3 - temp.value[1])) {
                if (this.repetitionChecker(value)) {
                    this.killedState.push(temp);
                } else {
                    this.state.push(temp);
                }
            } else {
                this.killedState.push(temp);
            }
        } else if (temp.value[0] < temp.value[1]) {
            this.killedState.push(temp);
        }
    }
    // Function to check whether a state already exists or not in the array
    repetitionChecker(value: number[]) {
        for (let i = 0; i < this.state.length; i++) {
            if (this.state[i].value[0] === value[0] && this.state[i].value[1] === value[1] && this.state[i].value[2] === value[2]) {
                return true;
            }
        }
        return false;
    }

    getPantalla() {
        return this.pantalla;
    }


}



// create an object for individual state
class CreateState {

    value: number[];
    parent: number[];
    visited: boolean;
    x: number;
    y: number;

    constructor() {
        this.value = [];
        this.parent = [];
        this.visited = false;
        this.x = 0;
        this.y = 0;
    }
}


/*
import React, { Component } from "react";
import ProcessingContext, { processingContext } from '../../comunicacion/ProcessingContext';
import p5 from "p5";
import Processing from "../../componentes/Processing/Processing";
import { AppProcessing } from '../../componentes/Processing/Processing';

interface IPropsPollo {

}

export default class Pollo extends Component implements AppProcessing {

    processingContext: processingContext;
    processing: Processing;
    app: p5;

    constructor(props: IPropsPollo) {
        super(props);
        this.processingContext = ProcessingContext;
        this.processing = this.processingContext.actividad;
        this.processing.juego = this;
        this.app = this.processing.app;
    }

    setup() {

    }

    draw(){

    }

    render() {
        return <div></div>;
    }
}

*/