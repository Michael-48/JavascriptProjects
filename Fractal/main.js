const Canvas = document.getElementById('Display');
const ctx = Canvas.getContext('2d');

var Data = {
    "Size": new Vector2(10,10),
    "Top":  new Vector2(-2,-2),
    "Scale": 0.005,
    "Depth": 40,
    "SelColorEq": () => {return new Color3(50,50,50)},
    "SelFractalEq": () => {return [10,12]},
    "PxRepeat": 1,
    "RenderTime": 0,

    "MoveStregnth": 1,
    "RefreshCooldown": 200,
    "ActiveMovementTimeout": 200,
    "ZoomStregnth": 2,
    "ClickTimer": 300,
    "SpeedPxRepeat": 3
}

function GenBitmap(Top,Scale,ImgData,Depth,FractalEq,ColorEq,PxRepeat) {   

    for (var x = 0; x < Math.floor(ImgData.width/PxRepeat); x++) {
        for (var y = 0; y < Math.floor(ImgData.height/PxRepeat); y++) {

            const RealPos = new Vector2((Top.X+((x*PxRepeat)*Scale)),(Top.Y+((y*PxRepeat)*Scale)));

            const EqResult = FractalEq(RealPos, Depth);
            const EqColor = ColorEq(EqResult[0],EqResult[1]);

            for (var x2 = 0; x2 < PxRepeat; x2++) {
                for (var y2 = 0; y2 < PxRepeat; y2++) {
                    var Unit8Pos = new Vector2((x*PxRepeat)+x2,(y*PxRepeat)+y2).ToBitmap();
                    [ImgData.data[Unit8Pos],ImgData.data[Unit8Pos+1],ImgData.data[Unit8Pos+2]] = EqColor.Color;
                    ImgData.data[Unit8Pos+3] = 255
                }
            }
            
        }
    }

    return ImgData
}

function PrepRender() {

    const ImgData = ctx.createImageData(Data.Size.X,Data.Size.Y)

    var RenderTime = Date.now();

    const RenderedImg = GenBitmap(
        Data.Top,
        Data.Scale,
        ImgData,
        Data.Depth,
        Data.SelFractalEq,
        Data.SelColorEq,
        Data.PxRepeat
    );

    Data.RenderTime = Date.now()-RenderTime;

    ctx.putImageData(RenderedImg,0,0);
}
