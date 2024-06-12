interface ICar {
    carWidth: number;
    carLength: number;
    insertCar: (ctx: CanvasRenderingContext2D, x: number, y: number) => void;
}

export class Car implements ICar {
    carWidth: number;
    carLength: number;
    carImage: HTMLImageElement;
    posX: number;
    posY: number;

    constructor(carWidth: number, carLength: number, imageSrc: string, posX: number, posY: number) {
        this.carWidth = carWidth;
        this.carLength = carLength;
        this.carImage = new Image();
        this.carImage.src = imageSrc;
        this.posX = posX;
        this.posY = posY;
    }

    insertCar = (ctx: CanvasRenderingContext2D) => {
        if (this.carImage.complete) {
            ctx.drawImage(this.carImage, 0, 0, this.carWidth, this.carLength, this.posX, this.posY, this.carWidth, this.carLength);
        } else {
            this.carImage.onload = () => {
                ctx.drawImage(this.carImage, 0, 0, this.carWidth, this.carLength, this.posX, this.posY, this.carWidth, this.carLength);
            };
        }
    };

}
