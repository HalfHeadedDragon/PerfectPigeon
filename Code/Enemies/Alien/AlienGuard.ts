export { AlienGuard }

import * as TBX from "engineer-js";

import { Enemy } from "./../Enemy";

class AlienGuard extends Enemy
{
    public constructor(Old?:AlienGuard)
    {
        super(Old);
        if(Old)
        {
            this.Collision.Scale =  new TBX.Vertex(120,120,1);
        }
        else
        {
            this.InitAlienGuard();
            this.Collision.Scale =  new TBX.Vertex(120,120,1);
        }
    }
    public Copy() : AlienGuard
    {
        return new AlienGuard(this);
    }
    private InitAlienGuard() : void
    {
        this._BaseStats.Speed = 3;
        this.LoadSprites("Aliens/Guard", 3);
    }
}