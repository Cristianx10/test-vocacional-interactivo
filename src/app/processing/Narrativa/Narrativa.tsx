import React, { useEffect, useState } from "react"
import "./Narrativa.scss";
import "./animate.css";
import { resultados, GResultados, ICategoria } from '../../resultados/resultados';
import NavegadorContext from '../../comunicacion/NavegadorContext';
import Pantalla from "../../componentes/Pantalla/Pantalla";
import { IONavegable } from '../../comunicacion/utilEvents';

class TS_Narrativa implements IONavegable {
    registro: GResultados;
    propiedades: any;
    acciones: any;
    pantalla?: Pantalla;

    constructor() {
 
        if (NavegadorContext.navegador) {
            this.pantalla = NavegadorContext.navegador.getAddPantalla();
            this.pantalla.addEventos(this);
        }


        this.registro = resultados.agregar(this);
        this.registro.setId("Narrativa");


        this.propiedades = this.registro.propiedades;

        this.propiedades.total = 0;

        this.acciones = {
            validar: (id: string, accion: Function, descripcion: string, valorMaximo: Array<ICategoria>) => {
                this.validar(id, accion, descripcion, valorMaximo);
            }
        };
    }

    componetDidMount(props: INarrativa) {
        props.config(this.propiedades, this.acciones);

        this.registro.setUID(props.UID);
    }

    onInicial() {

    }

    onFinal() {
        resultados.evaluar(this);
    }

    onProgress?() {

    }


    validar(id: string, accion: Function, descripcion: string, valorMaximo: Array<ICategoria>) {
        if (this.registro !== undefined) {
            this.registro.agregarCondicion(id, accion, descripcion, valorMaximo, this);
        }
    }

}

interface INarrativa {
    config: Function;
    UID: string;
}

const Narrativa = (props: INarrativa) => {

    var [narrativa] = useState(new TS_Narrativa());


    useEffect(() => {

        narrativa.componetDidMount(props);

        let openTitle = document.querySelector(".openTitle") as HTMLElement;
        let openTitleLogo = document.querySelector(".openTitle>div") as HTMLElement;
        let openTitleBtn = document.querySelector(".openTitle>h1") as HTMLElement;
        let openTitleImg = document.querySelector(".openTitle>img") as HTMLImageElement;
        let instrucciones = document.querySelectorAll(".instructions") as any;
        let instruccionesBtn = document.querySelectorAll(".btnHelp") as any;



        let nivel = 0

        let story = `Una chica ha planeado un viaje con su novio, han quedado de encontrarse en la finca de su familia al sur de la ciudad.. Entusiasmada emprende el viaje, al llegar se da cuenta de que su novio se ha retrasado y que deberá esperar.. Por lo que decide aprovechar el tiempo y prepararle una sorpresa.. Al entrar la casa empieza a recordar momentos en su infancia, se queda mirando fijamente a ventana.... pero se sorprende al encontrar un hombre realmente apuesto observándola de lejos.. El hombre se acerca y le tiende la mano, ella amablemente lo saluda y le explica su situación.. El hombre no deja de mirarla con intensidad y se acerca a sus labios,. ella no puede alejarse y pasan la noche juntos.. Al día siguiente se levanta en la cama de un hospital como única sobreviviente de un accidente de carretera.. Su pronóstico es reservado, acaba de escuchar que el doctor le dice a su colega.... "no me quiero imaginar lo que hubiese pasado si ella no hubiese llevado cinturón".`


        let phrase = story.split(". ")
        let phraseBackup = story.split(". ")
        let game = document.querySelector(".game") as HTMLElement;
        let board = document.querySelector(".board") as HTMLElement;
        let pool = document.querySelector(".pool") as HTMLElement;
        let btnPool = document.querySelector(".btnPool") as HTMLElement;
        let btnArrow = document.querySelector(".btnPool>img") as HTMLImageElement;
        let poolWords = document.querySelector(".poolWords") as HTMLElement;
        let gameOver = document.querySelector(".gameOver") as HTMLElement;
        let gameOverImg = document.querySelector(".gameOver>div>img") as HTMLImageElement;
        let gameOverH1 = document.querySelector(".gameOver>div>h1") as HTMLElement;
        let gameOverBtn = document.querySelector(".btnGameOver") as HTMLElement;
        let juegoNivel2 = document.querySelectorAll(".juegoNivel2") as NodeListOf<HTMLElement>;
        let inicioDiv = document.querySelectorAll(".inicioDiv") as NodeListOf<HTMLElement>;
        let desenlaceDiv = document.querySelectorAll(".desenlaceDiv") as NodeListOf<HTMLElement>;
        let inicioWords = document.querySelectorAll(".inicioWords") as NodeListOf<HTMLElement>;
        let desenlaceWords = document.querySelectorAll(".desenlaceWords") as NodeListOf<HTMLElement>;
        let total = 0
        let palabraActual = 0
        let cardsCreated = false;
        let poolClosed = false
        let poolOpened = true
        let wordCards: HTMLElement[] = [];
        let mistake = false;
        let mistakes = 0
        let success = 0
        let boardCards: HTMLElement[] = [];
        let tarjetonInicio;
        let widthMax = "75%";
        let widthMin = "25%";


        openTitleBtn.addEventListener("pointerdown", () => {
            console.log("lever", nivel);
            if (nivel === 1 || nivel == 2) {
                game.classList.add("instruccion");
                game.classList.remove("actividad");
                board.style.width = "";
                pool.style.width = "";
            }

            openTitleLogo.classList.add("slideOutUp")


            setTimeout(() => {
                openTitleLogo.style.opacity = "0"

            }, 300)

            setTimeout(() => {

                openTitleImg.style.display = "block"
                openTitleLogo.style.display = "none"
            }, 700)

            setTimeout(() => {
                openTitleImg.style.opacity = "1"
                openTitleImg.classList.add("slideInUp")
                if (nivel == 0) nivel = 1
            }, 800)


            if (nivel == 1) {
                openTitle.classList.add("slideOutUp")

                setTimeout(() => {
                    openTitle.style.opacity = "0"

                }, 300)
            }


            if (nivel == 2) {
                openTitle.classList.add("slideOutUp")
                juegoNivel2[0].style.display = "flex"
                board.classList.add("blur")

                setTimeout(() => {
                    openTitle.style.opacity = "0"

                }, 300)
            }
        })



        for (let index = 0; index < instruccionesBtn.length; index++) {
            instruccionesBtn[index].addEventListener("pointerdown", () => {
                console.log("Ootoritor", nivel);

                game.classList.remove("instruccion");
                game.classList.add("actividad");

                if (nivel == 2) {
                    board.style.width = widthMax;
                    pool.style.width = widthMin;
                }


                instrucciones[nivel - 1].classList.add("slideOutUp")
                poolWords.classList.remove("fadeIn")

                setTimeout(() => {
                    instrucciones[nivel - 1].style.opacity = "0";
                }, 200)

                setTimeout(() => {
                    instrucciones[nivel - 1].style.display = "none";
                    board.classList.remove("blur")
                    poolWords.classList.add("fadeIn")

                    if (cardsCreated == false) {
                        createCards();
                    }

                }, 700)
            })
        }


        //create text cards

        const createCards = () => {

            shuffle(phrase)
            for (let i = 0; i < phrase.length; i++) {
                let p = document.createElement('p')
                p.textContent = phrase[i];
                p.classList.add("wordCard")
                p.classList.add("poolCard")
                if (nivel == 2) {
                    p.classList.add("tarjetonInicio")
                }
                poolWords.appendChild(p);
            }


            //open and closes the word pool
            btnPool.addEventListener("pointerdown", poolMovement)



            //grabs the phrase cards
            wordCards = document.querySelectorAll(".wordCard") as any;
            for (let i = 0; i < wordCards.length; i++) {

                wordCards[i].addEventListener("pointerdown", () => {

                    if (nivel === 1) {
                        var cardsselects = game.querySelectorAll(".board .wordCard");
                        if (cardsselects.length === 3) {
                            widthMin = "50%";
                            widthMax = "50%";

                            board.style.width = widthMax;
                            pool.style.width = widthMin;
                        } else if (cardsselects.length >= 6) {
                            widthMin = "25%";
                            widthMax = "75%";

                            board.style.width = widthMax;
                            pool.style.width = widthMin;
                        }
                    }


                    if (game.classList.contains("blur") == false) {
                        if (wordCards[i].classList.contains("poolCard")) {


                            wordCards[i].classList.remove("poolCard")
                            wordCards[i].classList.add("boardCard")
                            if (nivel == 1) board.appendChild(wordCards[i])
                            if (nivel == 2) {

                                for (let i = 3; i >= 0; i--) {

                                    if (inicioWords[i].classList.contains(i + "") == false) {
                                        palabraActual = i

                                    }
                                }

                                inicioWords[palabraActual].classList.add(palabraActual + "")
                                inicioWords[palabraActual].appendChild(wordCards[i])
                            }

                            if (nivel == 3) {

                                for (let i = 3; i >= 0; i--) {

                                    if (desenlaceWords[i].classList.contains(i + "") == false) {
                                        palabraActual = i

                                    }
                                }

                                desenlaceWords[palabraActual].classList.add(palabraActual + "")
                                desenlaceWords[palabraActual].appendChild(wordCards[i])

                            }

                            boardCards = document.querySelectorAll(".boardCard") as any;
                            mistakeCount()

                        } else if (wordCards[i].classList.contains("boardCard")) {


                            wordCards[i].classList.remove("boardCard")
                            wordCards[i].classList.add("poolCard")
                            poolWords.appendChild(wordCards[i])


                        }
                    }
                })
            }

            //erase the cards of level 2
            if (nivel == 2) {
                for (let index = 0; index < inicioWords.length; index++) {

                    inicioWords[index].addEventListener("pointerdown", () => {

                        inicioWords[index].classList.remove(index + "")

                    })
                }
            }

            //erase the cards of level 3
            if (nivel == 3) {
                for (let index = 0; index < desenlaceWords.length; index++) {

                    desenlaceWords[index].addEventListener("pointerdown", () => {

                        desenlaceWords[index].classList.remove(index + "")

                    })
                }
            }

            cardsCreated = true
            tarjetonInicio = document.querySelectorAll(".tarjetonInicio")
        }

        //closes the modal of gameOver

        //movement of the pool

        const poolMovement = () => {

            if (poolOpened) {
                btnArrow.src = "/img/2020/Narrativa/data/btnUp.png"
                board.style.width = widthMax;
                pool.style.width = widthMin;
                setTimeout(() => {
                    poolOpened = false;
                    poolClosed = true;
                }, 500)
            }

            if (poolClosed) {
                btnArrow.src = "/img/2020/Narrativa/data/btnDown.png"
                board.style.width = widthMin;
                pool.style.width = widthMax;
                setTimeout(() => {
                    poolOpened = true;
                    poolClosed = false;
                }, 500)

            }
        }



        // sort randomlky the phrases array

        const shuffle = (array: string[]) => {
            var currentIndex = array.length,
                temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        //finish

        const mistakeCount = () => {

            if (boardCards.length == phraseBackup.length) {

                mistakes = 0
                mistake = false;
                success = 0

                for (let i = 0; i < phraseBackup.length; i++) {

                    if (phraseBackup[i] != boardCards[i].textContent) {
                        mistake = true;
                        mistakes += 1
                    } else if (phraseBackup[i] == boardCards[i].textContent && !mistake) {

                        success += 1
                    }
                }

                if (mistakes == 0) {

                    gameOverH1.style.display = "none"
                    gameOverImg.src = "/img/2020/Narrativa/data/win.png"

                } else {
                    gameOverH1.textContent = parseInt(((success / phraseBackup.length) * 100) + "") + "% DE LA HISTORIA"
                    gameOverImg.src = "/img/2020/Narrativa/data/lose.png"
                }

                game.classList.add("blur")
                gameOver.style.display = "flex"

                setTimeout(() => {
                    gameOver.style.opacity = "1"

                }, 1)

                if (nivel == 1) {
                    total += (80 / phraseBackup.length) * success

                }

                if (nivel == 2 || nivel == 3) {
                    total += success * (60 / phraseBackup.length)

                }
            }
        }

        gameOverBtn.addEventListener("pointerdown", () => {

            cardsCreated = false;
            game.classList.remove("blur")
            gameOver.style.opacity = "0"

            setTimeout(() => {
                gameOver.style.display = "none"
            }, 500)


            //borra todas las tarjetas
            if (nivel == 1) {
                for (let i = 0; i < wordCards.length; i++) {
                    board.removeChild(wordCards[i])
                }

                nivel = 2
                story = `Un hombre, colmado de tristeza y desolación por la muerte de su esposa, decide explorar un bosque al que ella tanto anhelaba ir.. Cuando empezó a anochecer, su sentido de orientación ya no funcionaba bien.. Caminaba sin rumbo por aquel bosque cuando encontró una cabaña entre varios árboles.. Al golpear la puerta, no recibió respuesta y como estaba abierta decidió entrar.`
                phraseBackup = story.split(". ")
                story = `Un hombre, colmado de tristeza y desolación por la muerte de su esposa, decide explorar un bosque al que ella tanto anhelaba ir.. Cuando empezó a anochecer, su sentido de orientación ya no funcionaba bien.. Caminaba sin rumbo por aquel bosque cuando encontró una cabaña entre varios árboles.. Al golpear la puerta, no recibió respuesta y como estaba abierta decidió entrar.. Un hombre que deseaba pasar unas merecidas vacaciones, decidió ir a visitar la torre Eiffel.. De la nada, su esposa se empieza a marear y deciden detenerse a descansar.. De la nada, su esposa se empieza a marear y deciden detenerse a descansar.. Apasionado por la zoología en particular por la observación de pájaros, decide adentrarse en ese bosque.. Asombrado por la opulencia de la entrada, el hombre decide entrar en aquel ascensor.`
                phrase = story.split(". ")
                openTitle.style.opacity = "1"
                openTitleImg.src = "/img/2020/Narrativa/data/level2.png"
                openTitle.classList.remove("slideOutUp")


                setTimeout(() => {
                    openTitle.classList.add("slideInDown")
                }, 1)

                setTimeout(() => {

                    instrucciones[nivel - 1].style.display = "flex"
                }, 1000)

            } else if (nivel == 2) {

                board.style.display = "none"
                pool.style.display = "none"
                board.style.opacity = "0"
                pool.style.opacity = "0"

                setTimeout(() => {
                    board.style.display = "flex"
                    pool.style.display = "flex"

                }, 1)

                setTimeout(() => {
                    board.style.opacity = "1"
                    pool.style.opacity = "1"

                }, 400)

                var child = juegoNivel2[0].firstElementChild;
                while (child) {
                    child.remove()
                    child = juegoNivel2[0].firstElementChild;
                }


                var child = poolWords.firstElementChild;
                while (child) {
                    child.remove()
                    child = poolWords.firstElementChild;
                }

                palabraActual = 0
                nivel = 3
                juegoNivel2[0].style.display = "none"
                juegoNivel2[1].style.display = "flex"
                story = `Al cabo de un rato comenzó a tener sueños extraños,. en los que los personajes de los cuadros gritaban de dolor por ayuda y golpeaban los vidrios que los protegían.. A la mañana siguiente, despertó aterrorizado, al darse cuenta de que. no había pinturas en la cabaña, solo ventanas...`
                phraseBackup = story.split(". ")
                story = `Al cabo de un rato comenzó a tener sueños extraños,. en los que los personajes de los cuadros gritaban de dolor por ayuda y golpeaban los vidrios que los protegían.. A la mañana siguiente, despertó aterrorizado, al darse cuenta de que. no había pinturas en la cabaña, solo ventanas.... Se encontraba sentada en el comedor, cenando con su esposa.. En ese momento lo entendió, ahora él era parte de la colección de porcelanas que había en aquel faro.. todo lo que había en aquel restaurante estaba pintado.. abandonado por la sociedad, rodeado de otros vagabundos que consumían drogas para olvidar sus problemas.. El cuerpo de ella yace acostado, parece dormida y ahí lo comprende todo, había muerto.`
                phrase = story.split(". ")
                if (cardsCreated == false) {
                    createCards();
                }
                setTimeout(() => {
                    juegoNivel2[1].style.opacity = "1"
                }, 1)
            } else if (nivel == 3) {

                let end = document.querySelector(".end") as HTMLElement;
                let endImg = document.querySelector(".end>img") as HTMLImageElement;

                end.style.display = "flex"

                if (total >= 200) {
                    total = 200
                    endImg.src = "/img/2020/Narrativa/data/perfect.png"

                } else {
                    endImg.src = "/img/2020/Narrativa/data/finished.png"
                }

                setTimeout(() => {
                    end.style.opacity = "1"
                }, 1)

                christian();
            }

        })

        const christian = () => {
            total = parseInt(total + "");
            narrativa.propiedades.total = total;

            setTimeout(() => {

                //aqui dentro haz el script para empalmarlo con lo demas


                console.log(total)

                if (narrativa.pantalla) {
                    narrativa.pantalla.continuar();
                }


            }, 3000)
        }

    }, [])



    return <div className="Narrativa">

        <div className="html" lang="es">

            <article className="body animated fadeIn">

                <main className="game">

                    <section className="board blur">

                        <div className="juegoNivel2">

                            <div style={{ width: "50%" }} className="inicioDiv">
                                <h1>INICIO</h1>
                                <div className="inicioWords">
                                    <h1>1)</h1>
                                </div>
                                <div className="inicioWords">
                                    <h1>2)</h1>
                                </div>
                            </div>

                            <div style={{ width: "50%" }} className="inicioDiv">
                                <h1>INICIO</h1>
                                <div className="inicioWords">
                                    <h1>3)</h1>
                                </div>
                                <div className="inicioWords">
                                    <h1>4)</h1>
                                </div>
                            </div>

                            <div style={{ width: "100%", height: "200px" }} className="nudo">
                                <h1>NUDO</h1>
                                <p>Al ver la cama, pensó que lo mejor sería ir a dormir y si alguien venía explicar lo que había pasado. Una vez acostado, se dio cuenta que había muchas pinturas extrañas: eran rostros deformados con ojos rojos que le miraban. Intentó ignorarlos, cerró los ojos y se durmió.</p>
                            </div>

                        </div>

                        <div className="juegoNivel2">
                            <div style={{ width: "100%", height: "150px" }} className="nudo">
                                <h1>NUDO</h1>
                                <p>Al ver la cama, pensó que lo mejor sería ir a dormir y si alguien venía explicar lo que había pasado. Una vez acostado, se dio cuenta que había muchas pinturas extrañas: eran rostros deformados con ojos rojos que le miraban. Intentó ignorarlos, cerró los ojos y se durmió.</p>
                            </div>

                            <div style={{ width: "50%", height: "560px" }} className="desenlaceDiv">
                                <h1>DESENLACE</h1>
                                <div className="desenlaceWords">
                                    <h1>1)</h1>
                                </div>
                                <div className="desenlaceWords">
                                    <h1>2)</h1>
                                </div>
                            </div>

                            <div style={{ width: "50%", height: "560px" }} className="desenlaceDiv">
                                <h1>DESENLACE</h1>
                                <div className="desenlaceWords">
                                    <h1>3)</h1>
                                </div>
                                <div className="desenlaceWords">
                                    <h1>4)</h1>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="pool">
                        <div className="btnPool">
                            <img src="/img/2020/Narrativa/data/btnDown.png" alt="" />
                        </div>
                        <div className="poolWords animated">
                            <div className=" instructions instructionsLvl1">
                                <h1>INSTRUCCIONES</h1>
                                <div>
                                    <div>
                                        <img src="/img/2020/Narrativa/data/instruccion1Left.png" />
                                        <p>A continuación contarás con un inventario de recuadros que contienen las partes de una historia, tú tendrás que ordenar cada fragmento para que dicha historia esté completa y sus partes tengan cohesión. <br /> Usa la esfera roja para cambiar entre las zonas de juego.</p>
                                    </div>
                                    <div>
                                        <img src="/img/2020/Narrativa/data/instruccion1Right.png" />
                                        <p>Da click sobre cada una para hacer que haga parte del tablero principal, si te equivocaste da click sobre el recuadro para que vuelva al inventario.<br /> Cuando hayas puesto la última tarjeta, el juego habrá terminado.</p>
                                    </div>
                                </div>
                                <h1 className="btn btnHelp">¡EMPEZAR!</h1>
                            </div>
                            <div className="instructions instructionsLvl2 animated">
                                <h1>INSTRUCCIONES</h1>
                                <p>Las historias están constituidas por un inicio, un nudo y un desenlace. </p>
                                <div style={{ flexDirection: "row" }} className="instructionsCards">
                                    <div>
                                        <h1>INICIO</h1>
                                        <p>___________________________________________________<br />___________________________________________________<br />___________________________________________________</p>
                                    </div>
                                    <div>
                                        <h1>NUDO</h1>
                                        <p>___________________________________________________<br />___________________________________________________<br />___________________________________________________</p>
                                    </div>
                                    <div>
                                        <h1>DESENLACE</h1>
                                        <p>___________________________________________________<br />___________________________________________________<br />___________________________________________________</p>
                                    </div>
                                </div>
                                <div className="instructionsSections">
                                    <div>
                                        <p>!A continuación contarás solo con el nudo de la historia, ¡Pero le falta el inicio y el desenlace!</p>
                                        <img src="/img/2020/Narrativa/data/instruccion2Left.png" />
                                    </div>
                                    <div>
                                        <p>¡Escoge del inventario el inicio y desenlace que creas más pertinente, y ayuda a esta historia a ser una narración completa de nuevo!</p>
                                        <img src="/img/2020/Narrativa/data/instruccion2Right.png" />
                                    </div>
                                </div>
                                <h1 className="btn btnHelp">¡EMPEZAR!</h1>
                            </div>
                        </div>

                    </section>
                    <main className="openTitle animated ">

                        <div className="animated">
                            <img src="/img/2020/Narrativa/data/logo.png" alt="logo" />

                            <div>
                                <h1>TALLER DE</h1>
                                <h1>CONSTRUCCIÓN</h1>
                                <h1>NARRATIVA</h1>
                            </div>
                        </div>

                        <img src="/img/2020/Narrativa/data/level1.png" className="animated " alt="logo" />

                        <h1 className="btn">¡EMPEZAR!</h1>

                    </main>
                </main>

                <main className="gameOver">
                    <div>
                        <img></img>
                        <h1></h1>

                    </div>
                    <h1 className="btn btnGameOver">SIGUIENTE</h1>

                </main>






                <main className="end animated">
                    <img src="/img/2020/Narrativa/data/finished.png" alt="" />
                </main>

            </article>

        </div>
    </div>
}

export default Narrativa;