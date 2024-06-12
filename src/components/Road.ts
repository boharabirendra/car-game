import DIMENSION from "./Constants";
interface IRoad{
    lengthOfRoad: number;
    widthOfRoad: number;
    numberOfLane: number;
    laneGap: number
    laneSegmentSize : number;
    laneSegmentGap: number;
    laneTopPosition: number
    offSetY : number;
    drawRoad: (ctx:CanvasRenderingContext2D) => void;
}

export class Road implements IRoad{
    lengthOfRoad: number;
    widthOfRoad: number;
    numberOfLane: number;
    laneGap: number;
    laneSegmentSize: number;
    laneSegmentGap: number;
    laneTopPosition: number;
    offSetY : number;
    constructor(
        lengthOfRoad: number, 
        widthOfRoad: number, 
        numberOfLane: number, 
        laneGap: number, 
        laneSegmentSize:number, 
        laneSegmentGap:number,
        laneTopPosition: number,
        offSetY : number){
            this.lengthOfRoad = lengthOfRoad;
            this.widthOfRoad = widthOfRoad;
            this.numberOfLane = numberOfLane;
            this.laneGap = laneGap;
            this.laneSegmentSize = laneSegmentSize;
            this.laneSegmentGap = laneSegmentGap;
            this.laneTopPosition = laneTopPosition;
            this.offSetY = offSetY;
    }

    drawRoad = (ctx:CanvasRenderingContext2D) => {
        const roadPosition = (DIMENSION.CANVAS_WIDTH - this.widthOfRoad) / 2;
        ctx.fillStyle = "gray";
        ctx.fillRect(roadPosition, 0, this.widthOfRoad, DIMENSION.CANVAS_HEIGHT);
        ctx.beginPath();
        ctx.strokeStyle = "#FFF";
        for(let i = 1; i <= this.numberOfLane; i++){
            ctx.moveTo(roadPosition + i * this.laneGap, this.laneTopPosition);
            ctx.lineTo(roadPosition + i * this.laneGap, this.lengthOfRoad);
        }
        this.laneTopPosition += this.offSetY;
        if(this.laneTopPosition > 0){
            this.laneTopPosition = -40;
        }
        ctx.setLineDash([this.laneSegmentSize, this.laneSegmentGap]);
        ctx.stroke();
    }
}

