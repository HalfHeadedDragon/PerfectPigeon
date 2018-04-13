export { State }

import { Projectile } from "./../Projectiles/Projectile";

class State
{
    public static Current:State;
    private _TimeStamp:number;
    private _Projectiles:Projectile[];
    public get TimeStamp():number { return this._TimeStamp; }
    public get Projectiles():Projectile[] { return this._Projectiles; }
    public constructor(Old?:State)
    {
        if(Old)
        {

        }
        else
        {
            this.InitState();
            State.Current = this;
        }
    }
    public Copy() : State
    {
        return new State(this);
    }
    private InitState() : void
    {

    }
    public Update() : void
    {
        this._TimeStamp++;
    }
}