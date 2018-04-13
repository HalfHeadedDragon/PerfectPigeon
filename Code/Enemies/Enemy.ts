export { Enemy }

import * as TBX from "engineer-js";

import { Unit } from "./../Entities/Unit";
import { Behaviour } from "./Behaviour";

class Enemy extends Unit
{
    protected _Behaviour:Behaviour;
    public constructor(Old?:Enemy)
    {
        super(Old);
        if(Old)
        {

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
        this._Behaviour.Act();
        super.Update();
    }
    protected LoadSprites(Path:string, Length:number) : void
    {
        super.LoadSprites("Enemy/"+Path, Length);
    }
}