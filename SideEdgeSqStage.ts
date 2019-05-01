const w : number = window.innerWidth
const h : number = window.innerHeight
const scGap : number = 0.51
const scDiv : number = 0.05
const strokeFactor : number = 90
const sizeFactor : number = 2.9
const foreColor : string = "#673AB7"
const backColor : string = "#BDBDBD"
const eqFactor : number = 4
const parts : number = 2
const nodes : number = 5

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n
    }

    static scaleFactor(scale : number) : number {
        return Math.floor(scale / scDiv)
    }

    static mirrorValue(scale : number, a : number, b : number) {
        const k : number = ScaleUtil.scaleFactor(scale)
        return (1 - k) / a + k / b
    }

    static updateValue(scale : number, dir : number, a : number, b : number) : number {
        return ScaleUtil.mirrorValue(scale, a, b) * dir * scGap
    }

}

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, x2 : number, y1 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawSideEdgeLine(context : CanvasRenderingContext2D, sc1 : number, sc2 : number, size : number) {
        const edgeSize : number = size / eqFactor
        const position = -edgeSize + (-size + edgeSize) * sc1
        for(var i = 0; i < parts; i++) {
            context.save()
            context.translate(position, position)
            context.rotate(Math.PI/4 * (1 - 2 * i) * ScaleUtil.divideScale(sc2, i, parts))
            DrawingUtil.drawLine(context, 0, 0, edgeSize, edgeSize)
            context.restore()
        }
    }

    static drawSESNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        const gap : number = w / (nodes + 1)
        const size : number = gap / sizeFactor
        context.strokeStyle = foreColor
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor
        const sc1 : number = ScaleUtil.divideScale(scale, 0, 2)
        const sc2 : number = ScaleUtil.divideScale(scale, 1, 2)

        for (var j = 0; j < parts; j++) {
            const sc1j : number = ScaleUtil.divideScale(scale, j, parts)
            DrawingUtil.drawSideEdgeLine(context, sc1, sc2, size)
        }
    }
}

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
