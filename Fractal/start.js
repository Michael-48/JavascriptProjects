var LastUpdate = 0;
function OnUpdate() {
    [Canvas.width, Canvas.height] = [Canvas.getBoundingClientRect().width, Canvas.getBoundingClientRect().height];
    [Data.Size.X, Data.Size.Y] = [Canvas.width, Canvas.height];

    if ((Date.now() - LastUpdate) >= (Data.RefreshCooldown+Data.RenderTime)) {
        LastUpdate = Date.now();

        PrepRender();
    } else {
        LastUpdate = Date.now(); // dont push full render while moving

        var Repeat = Data.PxRepeat
        Data.PxRepeat = Data.SpeedPxRepeat;
        PrepRender();
        Data.PxRepeat = Repeat
        setTimeout(() => {
            if (Date.now() - LastUpdate >= (Data.ActiveMovementTimeout+Data.RenderTime)) {
                // stopped refreshing chaotically
                PrepRender();
            }
        }, Data.ActiveMovementTimeout)
    }
}

function SiteInit() {
    Data.SelColorEq = ColorMapEQ.mod3X;
    Data.SelFractalEq = FractalEQ.mandelbrot;

    OnUpdate();
}
SiteInit();

window.addEventListener('resize', OnUpdate);

window.addEventListener('mousemove', (mouseObj) => {
    if (mouseObj.buttons == 1) {
        Data.Top = new Vector2(Data.Top.X-(mouseObj.movementX/(Data.MoveStregnth/Data.Scale)),Data.Top.Y-(mouseObj.movementY/(Data.MoveStregnth/Data.Scale)));
        OnUpdate(); 
    }
});

var LastClick = 0;
window.addEventListener('mousedown', () => {
    LastClick = Date.now();
});

window.addEventListener('mouseup', (mouseObj) => {
    if (Date.now()-LastClick <= Data.ClickTimer) {
        console.log(mouseObj.pageX*Data.Scale,mouseObj.pageY*Data.Scale);

        if (mouseObj.ctrlKey) {
            Data.Scale = Data.Scale*Data.ZoomStregnth

            Data.Top = new Vector2(
                Data.Top.X-((mouseObj.pageX/2)*Data.Scale),
                Data.Top.Y-((mouseObj.pageY/2)*Data.Scale),
            );
        } else {
            Data.Scale = Data.Scale/Data.ZoomStregnth

            Data.Top = new Vector2(
                Data.Top.X+(mouseObj.pageX*Data.Scale),
                Data.Top.Y+(mouseObj.pageY*Data.Scale),
            );
        }

        OnUpdate();
    }
});