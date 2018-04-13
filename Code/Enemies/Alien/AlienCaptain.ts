export { AlienCaptain }

import { Enemy } from "./../Enemy";

class AlienCaptain extends Enemy
{
    public constructor(Old?:AlienCaptain)
    {
        super(Old);
        if(Old)
        {

        }
        else
        {

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
        this.LoadSprites("Aliens/Captain", 3);
    }
}