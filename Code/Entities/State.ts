export { State }

import * as TBX from "engineer-js";

import { Enemy } from "./../Enemies/Enemy";
import { Projectile } from "./../Projectiles/Projectile";

class State
{
    public static Current:State;
    private _Scene:TBX.Scene2D;
    private _TimeStamp:number;
    private _Enemies:Enemy[];
    private _Projectiles:Projectile[];
    public get TimeStamp():number { return this._TimeStamp; }
    public get Projectiles():Projectile[] { return this._Projectiles; }
    public constructor(Old?:State, Scene?:TBX.Scene2D)
    {
        if(Old)
        {
            this._Scene = Old._Scene;
            this._TimeStamp = Old._TimeStamp;
            this._Projectiles = [];
            for(let i in Old._Projectiles) this._Projectiles.push(Old._Projectiles[i].Copy());
        }
        else
        {
            this.InitState();
            this._Scene = Scene;
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
        this._Enemies = [];
        this._Projectiles = [];
    }
    public Update() : void
    {
        this._TimeStamp++;
        if(this._TimeStamp == 120000) this._TimeStamp = 0;
        for(let i in this._Projectiles) this._Projectiles[i].Update();
    }
    public AttachEnemy(Enemy:Enemy) : void
    {
        this._Scene.Attach(Enemy);
        this._Enemies.push(Enemy);
    }
    public RemoveEnemy(Enemy:Enemy) : void
    {
        this._Scene.Remove(Enemy);
        this._Enemies.splice(this._Enemies.indexOf(Enemy), 1);
    }
    public AttachProjectile(Projectile:Projectile) : void
    {
        this._Scene.Attach(Projectile);
        this._Projectiles.push(Projectile);
    }
    public RemoveProjectile(Projectile:Projectile) : void
    {
        this._Scene.Remove(Projectile);
        this._Projectiles.splice(this._Projectiles.indexOf(Projectile), 1);
    }
}