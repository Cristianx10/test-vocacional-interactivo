import React, { Component } from "react";
import ProcessingContext, { processingContext } from '../../comunicacion/ProcessingContext';
import p5 from "p5";
import Processing from "../../componentes/Processing/Processing";
import { AppProcessing } from '../../componentes/Processing/Processing';
import ProcessingImg from '../../componentes/Processing/ProcessingImg';
import { Gamer } from './data/game';
import "./stylePollo.scss";
import Contenedor from '../../componentes/Contenedor/Contenedor';
import { position } from "html2canvas/dist/types/css/property-descriptors/position";

interface IPropsPollo {

}

export default class Pollo extends Component implements AppProcessing {

    processingContext: processingContext;
    processing: Processing;
    app: p5;
    logica?: Logica;
    propiedades: any;


    constructor(props: IPropsPollo) {
        super(props);
        this.processingContext = ProcessingContext;
        this.processing = this.processingContext.actividad;
        this.processing.juego = this;
        this.app = this.processing.app;

        this.propiedades = {};

    }

    preload() {

    }

    setup() {
        this.processing.size(1280, 720);
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
        return <div className="pollo">
            <Contenedor style={{position:"absolute"}} top="">
                <h4>ESCOGE TU MOVIMIENTO</h4>
                <ul className="buttons">
                    <li id='oneMissionary'> 1 Pollito </li>
                    <li id='oneCannibal'> 1 Zorro </li>
                    <li id='twoMissionaries'> 2 Pollito </li>
                    <li id='twoCannibals'> 2 Zorros </li>
                    <li id='oneMissionaryOneCannibal'> 1 Pollito y 1 Zorro</li>
                </ul>
                <div className="espacioGo"  >
                    <button className="gogo" id='go'>Enviar</button>
                    <div className="perder"></div>
                </div>
            </Contenedor>
        </div>;
    }
}


export class Logica {

    initialState: number[] = [3, 3, 1];
    goalState = [0, 0, 0];
    state: CreateState[] = [];
    killedState: CreateState[] = [];
    iterator = true;
    intentos = 3;
    puntajeAsignado = 0;



    app: p5;
    imgBarca: p5.Image;
    imgConejo: p5.Image
    imgZorro: p5.Image
    imgFondo: p5.Image
    imgInstruc: p5.Image


    imgInicio: p5.Image;

    imgLose: p5.Image;
    imgWin: p5.Image;
    cora: p5.Image;
    espacioVida: p5.Image;
    imgResumen: p5.Image;


    animacionMuertePollo: p5.Image[];
    numeroAnimacionPollo: number;

    pantalla = 0;
    gamer: Gamer;

    // Creating a root node.
    rootNode: CreateState

    boteIN: boolean = false;
    zorrocount: number = 0;
    pollocount: number = 0;


    img: ProcessingImg;

    x: number = 0;

    constructor(app: p5) {
        this.app = app;
        this.img = new ProcessingImg(this.app);
        this.gamer = new Gamer(this);


        this.numeroAnimacionPollo = 0;
        this.imgBarca = this.img.loadImage('/img/2019/pollo/img/barca.png');
        this.imgConejo = this.img.loadImage('/img/2019/pollo/img/pollo.png');
        this.imgZorro = this.img.loadImage('/img/2019/pollo/img/zorro.png');
        this.imgFondo = this.img.loadImage('/img/2019/pollo/img/fondo.png');
        this.imgInstruc = this.img.loadImage('/img/2019/pollo/img/instruc.png');
        this.imgWin = this.img.loadImage('/img/2019/pollo/img/win.png')
        this.imgLose = this.img.loadImage('/img/2019/pollo/img/lose.png');
        this.cora = this.img.loadImage('/img/2019/pollo/img/cora.png');
        this.espacioVida = this.img.loadImage('/img/2019/pollo/img/espacioVida.png');
        this.imgResumen = this.img.loadImage('/img/2019/pollo/img/resultados.png');
        this.imgInicio = this.img.loadImage('/img/2019/pollo/img/inicio.png');



        this.animacionMuertePollo = new Array(175);
        for (var i = 1; i <= 175; i++) {
            this.animacionMuertePollo[i - 1] = this.img.loadImage('/img/2019/pollo/img/' + i + '.png');
        }

        this.app.frameRate(3);

        this.rootNode = new CreateState();
        // set x and y position of the root node.
        this.rootNode.value = this.initialState;
        this.rootNode.parent = this.initialState;
        this.rootNode.visited = false;
        this.rootNode.x = this.app.width / 2;
        this.rootNode.y = 70;

        this.state.push(this.rootNode);
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

        console.log('estoy en this.pantalla: ' + this.pantalla);
        switch (this.pantalla) {

            case 0:

                this.app.image(this.imgInstruc, this.app.width / 2, this.app.height / 2);

                break;

            case 1:
                this.app.image(this.imgFondo, this.app.width / 2, this.app.height / 2);

                this.app.image(this.espacioVida, this.app.width - 400, 100);
                for (let h = 0; h < this.intentos; h++) {
                    this.app.image(this.cora, (this.app.width - 400) + h * 40, 100);
                }

                // set boat position

                if (this.gamer.tracker[2] == 1) {
                    this.x = this.app.width / 2 - 80;
                } else if (this.gamer.tracker[2] == 0) {
                    this.x = this.app.width / 2 + 80;
                }
                //Barca


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
                    this.app.image(this.imgZorro, 100 + j * 60, this.app.height / 2 + 130);
                }

                for (let j = 0; j < 3 - this.gamer.tracker[1]; j++) {
                    // CANNIBALS
                    //derecha
                    this.app.image(this.imgZorro, 980 + j * 60, this.app.height / 2 + 130);
                }
                /*
                 if(tracker[2]==1 && boteIN==true){
                  
                  console.log(pollocount+" "+zorrocount);
                  if(pollocount==1 && zorrocount==1){
                    console.log('entre gonorreas');
                    this.app.image(imgConejo,620, 420);
                    this.app.image(imgZorro,720, 420);
                    
                  
                    
                  } else if(pollocount==1){  
                    this.app.image(imgConejo,620, 420);
                    
                 
                  } else if(pollocount==2){
                    this.app.image(imgConejo,620, 420);
                    this.app.image(imgConejo,620+pollocount*50, 420);
                 
                    
                  }  else if(zorrocount==1){
                    this.app.image(imgZorro,620, 420);
                
                  } else if(zorrocount==2){
                    this.app.image(imgZorro,620, 420);
                    this.app.image(imgZorro,620+zorrocount*50, 420);
                    console.log('xdxdxd');
                    
                  
                  }
                  
                } else if(tracker[2]==0 && boteIN==true){
                
                if(pollocount==1 && zorrocount==1){
                  this.app.image(imgConejo,788, 420);
                  this.app.image(imgZorro,888, 420);
                  
                  console.log('holaaaaaaaaaaa');
                 
                  
                  
                } else if(pollocount==1){  
                  this.app.image(imgConejo,788, 420);
                  
                  
                } else if(pollocount==2){
                  this.app.image(imgConejo,788, 420);
                  this.app.image(imgConejo,788+pollocount*50, 420);
                }  else if(zorrocount==1){
                  this.app.image(imgZorro,788, 420);
                  
                
                 
                  this.app.image(imgZorro,980, height/2+130);
                } else if(zorrocount==2){
                  
                  this.app.image(imgZorro,788, 420);
                  this.app.image(imgZorro,788+zorrocount*50, 420);
                  
                  
                  
                }
              }*/



                this.app.image(this.imgBarca, this.x, this.app.height / 2 + 180);

                break;
            case 2:
                this.app.image(this.imgLose, this.app.width / 2, this.app.height / 2);
                for (var i = 0; i < this.animacionMuertePollo.length; i++) {
                }

                if (this.numeroAnimacionPollo <= 175) {
                    this.animacionMuertePollo[this.numeroAnimacionPollo].resize(400, 100);
                    this.app.image(this.animacionMuertePollo[this.numeroAnimacionPollo], this.app.width / 2 + 30, this.app.height / 2 - 150);
                    this.numeroAnimacionPollo += 15;
                } else {
                    this.numeroAnimacionPollo = 0;
                }

                break;
            case 3:
                this.app.image(this.imgWin, this.app.width / 2, this.app.height / 2);
                break;
            case 4:
                this.app.image(this.imgResumen, this.app.width / 2, this.app.height / 2);
                break;
            case 5:
                this.app.image(this.imgInicio, this.app.width / 2, this.app.height / 2);
                break;

        }



    }


    mouseClicked() {
        console.log(this.app.mouseX + "," + this.app.mouseY);
        if (this.pantalla == 0 && this.app.mouseX >= 689 && this.app.mouseX < 815 && this.app.mouseY >= 550 && this.app.mouseY < 587) {

            this.pantalla = 1;
        }
        if (this.pantalla == 2 && this.app.mouseY >= 389 && this.app.mouseY <= 429 && this.app.mouseX > 697 && this.app.mouseX < 832) {
            this.pantalla = 1;
        }
        if (this.pantalla == 3 && this.app.mouseY >= 389 && this.app.mouseY <= 429 && this.app.mouseX > 697 && this.app.mouseX < 832) {
            //EL PARTICIPANTE GANO SI ESTA EN ESTA this.PANTALLA Y SE LE ASIGNA UN PUNTAJE DEPENDIENDO CUANTOS INTENTOS UTILIZO
            if (this.intentos == 3) {
                this.puntajeAsignado = 100;
            } else if (this.intentos == 2) {
                this.puntajeAsignado = 75;
            } else if (this.intentos == 1) {
                this.puntajeAsignado = 50;
            }
            //CAMBIAR DE this.PANTALLA 
            console.log('el puntaje asignado es: ' + this.puntajeAsignado);

        }

        if (this.pantalla == 4 && this.app.mouseY >= 389 && this.app.mouseY <= 429 && this.app.mouseX > 697 && this.app.mouseX < 832) {

            //EL USUARIO PERDIO SI ESTA EN ESTA PANTALLA, PONER AQUI EL CAMBIO DE GAME

        }

        if (this.pantalla == 5) {
            this.pantalla = 0;
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

