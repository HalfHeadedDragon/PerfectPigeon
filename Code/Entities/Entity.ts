export { Entity }

import * as TBX from "engineer-js";

import { Stats } from "./Stats";

class Entity extends TBX.Sprite
{
    protected _Stats:Stats;
    protected _BaseStats:Stats;
    protected _OwnerIndex:number;
    public get Stats(): Stats { return this._Stats; }
    public get Owner(): number { return this._OwnerIndex; }
    public get Facing(): number { return this.Trans.Rotation.Z; }
    public set Facing(Value:number) { this.Trans.Rotation.Z = Value; }
    public constructor(Old:Entity)
    {
        super(Old)
        if(Old)
        {
            this._OwnerIndex = Old._OwnerIndex;
            this._BaseStats = Old._Stats.Copy();
        }
        else
        {
            this.InitEntity();
        }
    }
    public Copy() : Entity
    {
        return new Entity(this);
    }
    private InitEntity() : void
    {
        this._OwnerIndex = 1;
        this._BaseStats = new Stats();
    }
    public Update() : void
    {
        // Virtual
        this._Stats = this._BaseStats.Copy();
    }
    protected LoadSprites(Path:string, Length:number) : void
    {
        this.Collection = new TBX.SpriteSetCollection(null, []);
        let SpriteSet:TBX.SpriteSet = new TBX.SpriteSet(null, [], "Default");
        for(let i = 0; i < Length; i++) SpriteSet.Images.push("Resources/Textures/" + Path + i);
    }
}