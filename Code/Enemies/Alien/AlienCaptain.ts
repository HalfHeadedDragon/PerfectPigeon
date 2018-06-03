export { AlienCaptain }

import * as TBX from "engineer-js";

import { Enemy } from "./../Enemy";

class AlienCaptain extends Enemy
{
    public constructor(Old?:AlienCaptain)
    {
        super(Old);
        if(Old)
        {
            this.Collision.Scale =  new TBX.Vertex(150,150,1);
        }
        else
        {
            this.InitAlienCaptain();
            this.Collision.Scale =  new TBX.Vertex(150,150,1);
        }
    }
    public Copy() : AlienCaptain
    {
        return new AlienCaptain(this);
    }
    private InitAlienCaptain() : void
    {
        this._BaseStats.Speed = 2;
        this._BaseStats.Health = 200;
        this._BaseStats.MaxHealth = 200;
        this.Size = new TBX.Vertex(250,250,1);
        this.LoadSprites("Aliens/Captain", 3);
    }
}