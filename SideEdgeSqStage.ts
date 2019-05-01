const w : number = window.innerWidth
const h : number = window.innerHeight
const scGap : number = 0.51
const scDiv : number = 0.05
const strokeFactor : number = 90
const sizeFactor : number = 2.9
const foreColor : string = "#673AB7"
const backColor : string = "#BDBDBD"

class SideEdgeSqStage {

    context : CanvasRenderingContext2D
    canvas : HTMLCanvasElement

    initCanvas() {
        this.canvas.width = w
        this.canvas.height = h
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = backColor
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    static initCanvas() {
        const stage : SideEdgeSqStage = new SideEdgeSqStage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}
