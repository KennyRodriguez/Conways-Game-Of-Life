class cell{
    constructor(currentState)
    {
        this.state = currentState;
        this.x = 0;
        this.y = 0;
    }   

    setLoc(xLoc,yLoc)
    {
        this.x = xLoc;
        this.y = yLoc;
    }

    getLoc()
    {
        const loc = {x:this.x,y:this.y}
        return loc;
    }

    getState()
    {
        return this.state;
    }
    
    setState(bool)
    {
        this.state = bool;
    }
}

