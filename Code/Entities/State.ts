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
            this._TimeStamp = Old._TimeStamp;
            this._Projectiles = [];
            for(let i in Old._Projectiles) this._Projectiles.push(Old._Projectiles[i].Copy());
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
        this._TimeStamp = 0;
        this._Projectiles = [];
    }
    public Update() : void
    {
        this._TimeStamp++;
        if(this._TimeStamp == 120000) this._TimeStamp = 0;
        for(let i in this._Projectiles) this._Projectiles[i].Update();
    }
}