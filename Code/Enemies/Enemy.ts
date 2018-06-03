export { Enemy }

import * as TBX from "engineer-js";

import { Behaviour } from "./Behaviour";
import { Unit } from "./../Entities/Unit";
import { State } from "./../Entities/State";
import { Projectile } from "./../Projectiles/Projectile";

class Enemy extends Unit
{
    protected _Behaviour:Behaviour;
    public constructor(Old?:Enemy)
    {
        super(Old);
        if(Old)
        {
            this._Behaviour = new Behaviour(null, this);
        }
        else
        {
            this.InitEnemy();
        }
    }
    public Copy() : Enemy
    {
        return new Enemy(this);
    }
    private InitEnemy() : void
    {
        this._Behaviour = new Behaviour(null, this);
    }
    public Update() : void
    {
        if(this._BaseStats.Health <= 0)
        {
            State.Current.RemoveEnemy(this);
            return;
        }
        this._Behaviour.Act();
        super.Update();
    }
    protected LoadSprites(Path:string, Length:number) : void
    {
        super.LoadSprites("Enemy/"+Path, Length);
    }
    public Damage(Projectile:Projectile) : void
    {
        this._BaseStats.Health -= Projectile.Damage;
        if(this._BaseStats.Health < 0) this._BaseStats.Health = 0;
    }
}