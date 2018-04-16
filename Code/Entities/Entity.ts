export { Entity }

import * as TBX from "engineer-js";

import { Stats } from "./Stats";

class Entity extends TBX.Sprite
{
    protected _Moving:boolean;
    protected _Stats:Stats;
    protected _BaseStats:Stats;
    protected _OwnerIndex:number;
    public get Stats(): Stats { return this._Stats; }
    public get Owner(): number { return this._OwnerIndex; }
    public get Facing(): number { return this.Trans.Rotation.Z; }
    public set Facing(Value:number) { this.Trans.Rotation.Z = Value; }
    public set Moving(Value:boolean) { this._Moving = Value; }
    public get Position():TBX.Vertex { return this.Trans.Translation; }
    public set Position(Value:TBX.Vertex) { this.UpdatePosition(Value); }
    public constructor(Old:Entity)
    {
        super(Old)
        if(Old)
        {
            this._Moving = Old._Moving;
            this._OwnerIndex = Old._OwnerIndex;
            this._BaseStats = Old._BaseStats.Copy();
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
        this._Moving = false;
        this._OwnerIndex = 1;
        this._BaseStats = new Stats();
    }
    public Update() : void
    {
        // Virtual
        this._Stats = this._BaseStats.Copy();
        if(this._Moving) this.Move();
    }
    protected UpdatePosition(Position:TBX.Vertex) : void
    {
        // Virtual
        this.Trans.Translation = Position;
    }
    protected LoadSprites(Path:string, Length:number) : void
    {
        this.Collection = new TBX.SpriteSetCollection(null, []);
        let SpriteSet:TBX.SpriteSet = new TBX.SpriteSet(null, [], "Default");
        for(let i = 0; i < Length; i++) SpriteSet.Images.push("Resources/Textures/" + Path + i + ".png");
        this.Collection.SpriteSets.push(SpriteSet);
    }
    protected CalcAngle(V1:TBX.Vertex, V2:TBX.Vertex) : number
    {
        let Zeroed:TBX.Vertex = new TBX.Vertex(V1.X - V2.X, V1.Y - V2.Y, 0);
        return TBX.Vertex.Angle(new TBX.Vertex(0, 1, 0), Zeroed) - 90;
    }
    public Move() : void
    {
        let Direction = new TBX.Vertex(0, this.Stats.Speed,0);
        Direction.RotateZ(this.Facing + 180);
        this.Position = new TBX.Vertex(this.Position.X + Direction.X, this.Position.Y + Direction.Y, this.Position.Z);
    }
}