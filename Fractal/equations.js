class Vector2 {
    constructor(X=0,Y=0) {
        this.X = X;
        this.Y = Y;
    }
    ToBitmap(RealWidth=Canvas.width) {
        return ((this.Y * (RealWidth * 4)) + (this.X * 4));
    }
    Square() {
        return new Vector2(this.X * this.X, this.Y * this.Y);
    }
}

class Color3 {
    constructor(R,G,B) {
        this.Color = new Uint8ClampedArray(3);
        this.Color[0] = R;
        this.Color[1] = G;
        this.Color[2] = B;
    }
}

function Lerp(b,c,a) {
    return (1 - a) * b + a * c;
}

var ColorMapEQ = {
    "sinWave": (i,Ceil) => {
        const ColorFq = -0.5;

        function WrapColor(Mul=1) {
            return i==Ceil? 0 : (((Math.sin((i*Mul)*((255)/Ceil)/ColorFq)+1)/2)*255);
        }
        return new Color3(WrapColor(1),WrapColor(1),WrapColor(1));
    },

    "mod3X": (i,Ceil) => {
        var Ind = i*(255/Ceil);
        return new Color3((Ind*1)%255,(Ind*3)%255,(Ind*2)%255);
    }
}

var FractalEQ = {
    "mandelbrot": (Coord, Rec, Focus = Coord) => {
        var Z = new Vector2(0,0);

        for (var i = 0; i < Rec; i++) {
            const SqZ = Z.Square();
            if ((SqZ.X+SqZ.Y) >= 2*2) break;

            [Z.X,Z.Y] = [((SqZ.X-SqZ.Y) + Focus.X), ((2*Z.X*Z.Y) + Focus.Y)];
        }

        return [i,Rec]
    }
}