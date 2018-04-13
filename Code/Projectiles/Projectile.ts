export { Projectile }

import * as TBX from "engineer-js";

import { Entity } from "./../Entities/Entity";

class Projectile extends Entity
{
    protected _Spin:number;
    protected _SpinRate:number;
    protected _Damage:number;
    protected _Summons:Entity[];
    public get Damage():number { return this._Damage; }
    public constructor(Old?:Projectile)
    {
        super(Old);
        if(Old)
        {
            this._Spin = Old._Spin;
            this._SpinRate = Old._SpinRate;
            this._Damage = Old._Damage;
            this._Summons = [];
            for(let i in Old._Summons)
            {
                this._Summons.push(Old._Summons[i].Copy());
            }
        }
        else
        {
            this.InitProjectile();
        }
    }
    public Copy() : Projectile
    {
        return new Projectile(this);
    }
    private InitProjectile() : void
    {
        this._Damage = 10;
        this._Summons = [];
        this._Spin = 0;
        this._SpinRate = 0;
        this._BaseStats.Speed = 10;
        this._BaseStats.Health = 5000;
        this._BaseStats.MaxHealth = 5000;
        this._Moving = true;
        this.Size = new TBX.Vertex(20,20,1);
    }
    protected LoadSprites(Path:string, Length:number) : void
    {
        super.LoadSprites("Projectile/"+Path, Length);
    }
}