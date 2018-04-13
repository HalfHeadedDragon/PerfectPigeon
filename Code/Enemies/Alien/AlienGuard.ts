export { AlienGuard }

import { Enemy } from "./../Enemy";

class AlienGuard extends Enemy
{
    public constructor(Old?:AlienGuard)
    {
        super(Old);
        if(Old)
        {

        }
        else
        {

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