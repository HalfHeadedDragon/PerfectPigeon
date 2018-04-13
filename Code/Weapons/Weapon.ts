export { Weapon }

import * as TBX from "engineer-js";

import { State } from "./../Entities/State";
import { Projectile } from "./../Projectiles/Projectile";
import { ProjectileFactory } from "./../Projectiles/ProjectileFactory";

class Weapon
{
    protected _Active:boolean;
    protected _Ammo:number;
    protected _FireRate:number;
    protected _RecoilAngle:number;
    protected _Facing:number;
    protected _ProjectileID:string;
    protected _Position:TBX.Vertex;
    protected _ParentPosition:TBX.Vertex;
    public get Active():boolean { return this._Active; }
    public get Ammo():number { return this._Ammo; }
    public get Facing():number { return this._Facing; }
    public set Facing(Value:number) { this._Facing = Value; }
    public get Position():TBX.Vertex { return this._Position; }
    public get ParentPosition():TBX.Vertex { return this._ParentPosition; }
    public set ParentPosition(Value:TBX.Vertex) { this._ParentPosition = Value; }
    public constructor(Old:Weapon)
    {
        if(Old)
        {
            this._Active = Old._Active;
            this._Ammo = Old._Ammo;
            this._FireRate = Old._FireRate;
            this._RecoilAngle = Old._RecoilAngle;
            this._Facing = Old._Facing;
            this._Position = Old._Position.Copy();
        }
        else
        {
            this.InitWeapon();
        }
    }
    public Copy() : Weapon
    {
        return new Weapon(this);
    }
    private InitWeapon() : void
    {
        this._Active = true;
        this._Ammo = -1;
        this._FireRate = 10;
        this._RecoilAngle = 0;
        this._Facing = 0;
        this._Position = new TBX.Vertex();
    }
    public Shoot() : void
    {
        if(!this._Active) return;
        if(this._Ammo != -1 && this._Ammo < 1) return;
        if(State.Current.TimeStamp % this._FireRate != 0) return;
        let NewProjectile:Projectile = ProjectileFactory.Current.Create(this._ProjectileID);
        NewProjectile.Position = this._ParentPosition.Copy().Add(this._Position);
        let Facing = this._Facing;
        if(this._RecoilAngle != 0) Facing += TBX.Random.Next(-this._RecoilAngle, this._RecoilAngle);
        NewProjectile.Facing = Facing;
        State.Current.Projectiles.push(NewProjectile);
    }
}