export { EnemyFactory }

import { Enemy } from "./Enemy";

// Aliens
import { AlienGuard } from "./Alien/AlienGuard";
import { AlienCaptain } from "./Alien/AlienCaptain";

class EnemyFactory
{
    public static Current:EnemyFactory;
    private _Pool:any;
    public constructor(Old?:EnemyFactory)
    {
        if(Old)
        {
            this._Pool = Old._Pool;
        }
        else
        {
            this._Pool = {};
            EnemyFactory.Current = this;
        }
    }
    public Copy() : EnemyFactory
    {
        return new EnemyFactory(this);
    }
    public Register(ID:string, Entry:Enemy)
    {
        this._Pool[ID] = Entry;
    }
    public Create(ID:string) : Enemy
    {
        if(!this._Pool[ID]) return null;
        let NewEnemy:Enemy = this._Pool[ID].Copy();
        NewEnemy.Name = ID;
        return NewEnemy;
    }
    public static Init()
    {
        let Factory:EnemyFactory = new EnemyFactory();
        Factory.Register("AlienGuard", new AlienGuard());
        Factory.Register("AlienCaptain", new AlienCaptain());
    }
}