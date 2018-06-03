export { State }

import * as TBX from "engineer-js";

import { Spawner } from "./Spawner";
import { Level } from "./../Levels/Level";
import { LevelFactory } from "./../Levels/LevelFactory";
import { Player } from "./../Player/Player";
import { Enemy } from "./../Enemies/Enemy";
import { Projectile } from "./../Projectiles/Projectile";

class State
{
    public static Current:State;
    private _TimeStamp:number;
    private _Player:Player;
    private _Enemies:Enemy[];
    private _Projectiles:Projectile[];
    private _Level:Level;
    private _Spawner:Spawner;
    private _Scene:TBX.Scene2D;
    public get TimeStamp():number { return this._TimeStamp; }
    public get Projectiles():Projectile[] { return this._Projectiles; }
    public get NumberOfEnemies():number { return this._Enemies.length; }
    public constructor(Old?:State, Scene?:TBX.Scene2D, LevelID?:string)
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
            this._Scene = Scene;
            this._Level = LevelFactory.Current.Create(LevelID);
            this.InitState();
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
        this._Player = new Player(null, this._Scene);
        this._Scene.Attach(this._Player);
        this._Spawner = new Spawner(null, this, this._Level);
    }
    public Update() : void
    {
        this._TimeStamp++;
        if(this._TimeStamp == 120000) this._TimeStamp = 0;
        this._Player.Update();
        this._Spawner.Spawn();
        for(let i in this._Enemies) this._Enemies[i].Update();
        for(let i in this._Projectiles) this._Projectiles[i].Update();
        this.CheckEnemyDamage();
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
        Projectile.Active = false;
        this._Scene.Remove(Projectile);
        this._Projectiles.splice(this._Projectiles.indexOf(Projectile), 1);
    }
    private CheckEnemyDamage() : void
    {
        for(let i in this._Enemies)
        {
            TBX.CollisionUtil.CalculateTypeCollisions("Projectile", this._Enemies[i], this._Projectiles);
            let Colliders:any[] = this._Enemies[i].Collision.Specific["Projectile"].Colliders;
            for(let j in Colliders)
            {
                this.RemoveProjectile(Colliders[j].Reference);
                this._Enemies[i].Damage(Colliders[j].Reference);
            }
        }
    }
}