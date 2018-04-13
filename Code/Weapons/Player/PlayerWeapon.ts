export { PlayerWeapon }

import * as TBX from "engineer-js";

import { Weapon } from "./../Weapon";

class PlayerWeapon extends Weapon
{
    private _Visual:TBX.Sprite;
    public set Active(Value:boolean) { this._Active = Value; this._Visual.Active = Value; }
    public get Visual():TBX.Sprite { return this._Visual; }
    public set Facing(Value:number) { this._Facing = Value; this._Visual.Trans.Rotation.Z = Value; }
    public constructor(Old?:PlayerWeapon)
    {
        super(Old);
        if(Old)
        {

        }
        else
        {
            this.InitPlayerWeapon();
        }
    }
    public Copy() : PlayerWeapon
    {
        return new PlayerWeapon(this);
    }
    private InitPlayerWeapon() : void
    {
        this._Visual = new TBX.Sprite();
    }
    protected LoadSprites(Type:string) : void
    {
        this._Visual.Collection = new TBX.SpriteSetCollection(null, []);
        let SpriteSet:TBX.SpriteSet = new TBX.SpriteSet(null, [], "Default");
        for(let i = 0; i < 1; i++) SpriteSet.Images.push("Resources/Textures/Player/Weapon/" + Type + i);
        this._Visual.Collection.SpriteSets.push(SpriteSet);
    }
}