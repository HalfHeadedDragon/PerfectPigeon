export { Player }

import * as TBX from "engineer-js";

import { Unit } from "./../Entities/Unit";
import { MachineGun } from "./../Weapons/Player/MachineGun";
import { HeavyMachineGun } from "./../Weapons/Player/HeavyMachineGun";
import { PlayerWeapon } from "./../Weapons/Player/PlayerWeapon";

class Player extends Unit
{
    public static Current:Player;
    private _LeftMachineGun:MachineGun;
    private _RightMachineGun:MachineGun;
    private _LeftHeavyMachineGun:HeavyMachineGun;
    private _RightHeavyMachineGun:HeavyMachineGun;
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
        this._Shooting = false;
        this.LoadSprites("Player/Pigeon/Pigeon", 3);

        this._LeftMachineGun = new MachineGun();
        this._LeftMachineGun.Position.X = -38;
        this._RightMachineGun = new MachineGun();
        this._RightMachineGun.Position.X = 38;
        this.AttachWeapon(this._LeftMachineGun);
        this.AttachWeapon(this._RightMachineGun);

        this._LeftHeavyMachineGun = new HeavyMachineGun();
        this._LeftHeavyMachineGun.Position.X = -38;
        this._RightHeavyMachineGun = new HeavyMachineGun();
        this._RightHeavyMachineGun.Position.X = 38;
        this.AttachWeapon(this._LeftHeavyMachineGun);
        this.AttachWeapon(this._RightHeavyMachineGun);
        
        this.Size = new TBX.Vertex(200,200,1);
        this.Position = new TBX.Vertex(960, 540, 1.5);
        this._Stand = TBX.SceneObjectUtil.CreateSprite("Stand", ["Resources/Textures/Player/Stand/Stand.png"], this.Position, this.Size);
        this._Stand.Position = new TBX.Vertex(960, 540, 1.6);
    }
    public Update() : void
    {
        super.Update();
    }
    public MouseDown(G:TBX.Game, Args:any) : void
    {
        if (Args.MouseButton == 0) this._Shooting = true;
        else if (Args.MouseButton == 2) this._Moving = true;
    }
    public MouseUp(G:TBX.Game, Args:any) : void
    {
        if (Args.MouseButton == 0) this._Shooting= false;
        else if (Args.MouseButton == 2) this._Moving = false;
    }
    public MouseMove(G:TBX.Game, Args:any) : void
    {
        this.Facing = this.CalcAngle(this.Trans.Translation, Args.Location);
    }
    protected UpdateFacing(Facing:number) : void
    {
        // Override
        super.UpdateFacing(Facing);
        this._Stand.Trans.Rotation.Z = Facing;
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
        Scene.Events.MouseMove.push(this.MouseMove.bind(this));
        Scene.Events.MouseDown.push(this.MouseDown.bind(this));
        Scene.Events.MouseUp.push(this.MouseUp.bind(this));
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