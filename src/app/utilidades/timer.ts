export class Timer {

    horas: number;
    minutos: number;
    segundos: number;

    init_tiempo: number;
    final_tiempo: number;

    tiempo: number;

    intervalo: any;
    proceso?: Function;


    inicial?: Function;
    final?: Function;

    isDetenido = false;


    constructor() {
        this.horas = 0;
        this.minutos = 0;
        this.segundos = 0;

        this.tiempo = 0;

        this.init_tiempo = 0;

        this.final_tiempo = 0;


        this.intervalo = null;

    }

    iniciar() {

        let hora_local = new Date();
        this.init_tiempo = hora_local.getTime();

        if (this.inicial) {
            this.inicial();
        }

        this.intervalo = setInterval(() => {

            this.segundos++;

            if (this.segundos >= 60) {
                this.minutos++;
                this.segundos = 0;
            }

            if (this.minutos >= 60) {
                this.horas++;
                this.minutos = 0;
            }

            if (this.proceso) {
                this.proceso(this.segundos, this.minutos, this.horas);
            }

        }, 1000);

    }

    temporizador() {

        let hora_local = new Date();
        this.init_tiempo = hora_local.getTime();


        this.intervalo = setInterval(() => {

            this.segundos--;

            if (this.segundos <= 0) {
                this.minutos--;
                this.segundos = 59;
            }

            if (this.minutos < 0 && this.segundos === 59) {
                this.horas--;
                this.minutos = 59;
            }

            if (this.horas < 0) {
                this.segundos = 0;
                this.minutos = 0;
                this.horas = 0;
                this.detener();
            }

            if (this.proceso) {
                this.proceso(this.segundos, this.minutos, this.horas);
            }

        }, 1000);

    }

    detener() {

        console.log("Tiempo detenido");
        if (this.isDetenido === false) {
            this.isDetenido = true;


            let hora_local = new Date();
            this.final_tiempo = hora_local.getTime();

            this.tiempo = this.final_tiempo - this.init_tiempo;

            clearInterval(this.intervalo);

            if (this.final) {
                this.final();
            }
        }

    }

    iniciarEn(segundos: number, minutos?: number, hora?: number) {

        let hora_local = new Date();
        this.init_tiempo = hora_local.getTime();

        if (minutos) {
            this.minutos = minutos;
        }

        if (hora) {
            this.horas = hora;
        }


        if (segundos) {
            this.segundos = segundos;
            if (this.segundos > 60) {
                this.tiempo = 0;
                this.horas = 0;
                this.minutos = parseInt((segundos / 60) + "", 10);
                this.segundos = segundos % 60;
            }

        } else {
            this.segundos = 0;
        }

    }

    imprimir() {
        //Confirmacion de hora del servidor
        console.log(`Servidor: horas[ ${this.horas} ]: minutos[ ${this.minutos} ]: segundos[ ${this.segundos} ]`);
    }

    setInicial(inicial: Function) {
        this.inicial = inicial;
    }

    setProgreso(proceso: Function) {
        this.proceso = proceso;
    }

    setFinal(final: Function) {
        this.final = final;
    }
}

export default Timer;