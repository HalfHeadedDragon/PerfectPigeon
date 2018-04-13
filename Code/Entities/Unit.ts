export { Unit }

import * as TBX from "engineer-js";

import { Buff } from "./../Buffs/Buff";
import { Entity } from "./Entity";
import { Weapon } from "./../Weapons/Weapon";

class Unit extends Entity
{
    protected _Shooting:boolean;
    protected _Buffs:Buff[];
    protected _Weapons:Weapon[];
    public set Shooting(Value:boolean) { this._Shooting = Value; }
    public set Facing(Value:number) { this.UpdateFacing(Value); }
    public constructor(Old?:Unit)
    {
        super(Old)
        if(Old)
        {
            this._Shooting = Old._Shooting;
            this._Buffs = [];
            for(let i in Old._Buffs) this._Buffs.push(Old._Buffs[i].Copy());
            this._Weapons = [];
            for(let i in Old._Weapons) this._Weapons.push(Old._Weapons[i].Copy());
        }
        else
        {
            this.InitUnit();
        }
    }
    public Copy() : Unit
    {
        return new Unit(this);
    }
    private InitUnit() : void
    {
        this._Shooting = false;
        this._Buffs = [];
        this._Weapons = [];
    }
    public Update() : void
    {
        super.Update();
        for(let i in this._Buffs)
        {
            this._Buffs[i].Update();
            this._Buffs[i].Apply(this._Stats);
        }
        for(let i = this._Buffs.length - 1; i >= 0; i--)
        {
            if(this._Buffs[i].Expired) this._Buffs.splice(i,1);
        }
        if(this._Shooting)
        {
            for(let i in this._Weapons)
            {
                this._Weapons[i].Shoot();
            }
        }
    }
    protected UpdateFacing(Facing:number) : void
    {
        // Virtual
        this.Trans.Rotation.Z = Facing;
        for(let i in this._Weapons)
        {
            this._Weapons[i].Facing = Facing;
        }
    }
    protected UpdatePosition(Position:TBX.Vertex) : void
    {
        // Override
        super.UpdatePosition(Position);
        for(let i in this._Weapons)
        {
            this._Weapons[i].ParentPosition = Position;
        }
    }
    protected AttachWeapon(Weapon:Weapon) : void
    {
        this._Weapons.push(Weapon);
        Weapon.ParentPosition = this.Position;
    }
}