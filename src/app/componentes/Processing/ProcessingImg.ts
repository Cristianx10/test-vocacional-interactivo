import p5 from 'p5';

var databaseImg: Img_data[] = [];

export class ProcessingImg {

    app: p5;

    constructor(app: p5) {
        this.app = app;
    }

    loadImage(ruta: string):p5.Image {
        let encontrada = false;
        let p5Image: any;

        for (let index = 0; index < databaseImg.length; index++) {
            let imagen = databaseImg[index];
            if (imagen.url === ruta) {
                encontrada = true;
                p5Image = imagen.imagen;
                index = databaseImg.length;
            }
        }


        if (!encontrada) {
            let img = this.app.loadImage(ruta);
            databaseImg.push(new Img_data(ruta, img));
            p5Image = img;
        }

        return p5Image;
    }
}

class Img_data {
    url: string;
    imagen: p5.Image;

    constructor(url: string, imagen: p5.Image) {
        this.url = url;
        this.imagen = imagen;
    }
}


export default ProcessingImg;