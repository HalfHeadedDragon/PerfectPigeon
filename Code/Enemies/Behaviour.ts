export { Behaviour }

import * as TBX from "engineer-js";

import { Unit } from "./../Entities/Unit";
import { Player } from "./../Player/Player";

const SCREEN_WIDTH = 1920;
const SCREEN_HEIGHT = 1080;

class Behaviour
{
    protected _Unit:Unit;
    protected _Sight:number;
    protected _Radius:number;
    protected _Angle:number;
    public constructor(Old?:Behaviour, Unit?:Unit)
    {
        if(Old != null)
        {
            this._Sight = Old._Sight;
            this._Radius = Old._Radius;
            this._Unit = Old._Unit;
        }
        else
        {

            let Sight = TBX.Random.Next(600,1000);
            let Radius = TBX.Random.Next(350,650);
            this._Sight = Sight;
            this._Radius = Radius;
            this._Unit = Unit;
        }
    }
    public Act() : void
    {
        let TargetLoc:TBX.Vertex = Player.Current.Position;
        let SightSat:boolean = TBX.Vertex.Distance(TargetLoc, this._Unit.Trans.Translation) < this._Sight;
        let RadiusSat:boolean = TBX.Vertex.Distance(TargetLoc, this._Unit.Trans.Translation) < this._Radius;
        let Zeroed:TBX.Vertex = new TBX.Vertex(TargetLoc.X - this._Unit.Trans.Translation.X, TargetLoc.Y - this._Unit.Trans.Translation.Y, 0);
        this._Angle = TBX.Vertex.Angle(new TBX.Vertex(0, 1, 0), Zeroed);
        this._Unit.Facing = this._Angle;
        if(RadiusSat)
        {
            this.RadiusAct();
        }
        else if(SightSat)
        {
            this.SightAct();
        }
    }
    public RadiusAct()
    {
        this._Unit.Shooting = true;
    }
    public SightAct()
    {
        this._Unit.Shooting = false;
        let Direction = new TBX.Vertex(0, this._Unit.Stats.Speed,0);
        Direction.RotateZ(this._Angle - 90);
        this._Unit.Position.X += Direction.X;
        this._Unit.Position.Y += Direction.Y;
    }
}