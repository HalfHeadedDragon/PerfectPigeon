export { Player }

import * as TBX from "engineer-js";

import { Unit } from "./../Entities/Unit";
import { MachineGun } from "./../Weapons/Player/MachineGun";
import { PlayerWeapon } from "./../Weapons/Player/PlayerWeapon";

class Player extends Unit
{
    public static Current:Player;
    private _Stand:TBX.Sprite;
    public constructor(Old?:Player)
    {
        super(Old)
        if(Old)
        {
            
        }
        else
        {
            this.InitPlayer();
            Player.Current = this;
        }
    }
    public Copy() : Player
    {
        return new Player(this);
    }
    private InitPlayer() : void
    {
        this.Size = new TBX.Vertex(250,250,1);
        this.Position = new TBX.Vertex()
        this._Stand = TBX.SceneObjectUtil.CreateSprite("Stand", ["Resources/Textures/Player/Stand/Stand.png"], this.Position, this.Size);
        this.LoadSprites("Player/Pigeon", 3);
        this.AttachWeapon(new MachineGun());
    }
    public OnAttach(Args:any) : void
    {
        // Override
        super.OnAttach(Args);
        let Scene:TBX.Scene2D = Args.Scene;
        Scene.Attach(this._Stand);
        for(let i in this._Weapons)
        {
            let PW:PlayerWeapon = <PlayerWeapon> this._Weapons[i];
            Scene.Attach(PW.Visual);
        }
    }
    public OnRemove(Args:any) : void
    {
        // Override
        super.OnRemove(Args);
        let Scene:TBX.Scene2D = Args.Scene;
        Scene.Remove(this._Stand);
        for(let i in this._Weapons)
        {
            let PW:PlayerWeapon = <PlayerWeapon> this._Weapons[i];
            Scene.Remove(PW.Visual);
        }
    }
}