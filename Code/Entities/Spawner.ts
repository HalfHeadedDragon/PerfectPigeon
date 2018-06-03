export { Spawner }

import * as TBX from "engineer-js";

import { State } from "./State";
import { Enemy } from "./../Enemies/Enemy";
import { Player } from "./../Player/Player";
import { Level } from "./../Levels/Level";

class Spawner
{
    private _Level:Level;
    private _State:State;
    public constructor(Old?:Spawner, State?:State, Level?:Level)
    {
        if(Old)
        {
            this._State = Old._State.Copy();
            if(State) this._State = State;
            this._Level = Old._Level.Copy();
        }
        else
        {
            this._Level = Level;
            this._State = State;
        }
    }
    public Copy() : Spawner
    {
        return new Spawner(this);
    }
    public Spawn() : void
    {
        while(this._State.NumberOfEnemies < this._Level.Cap && this._Level.Enemies.length > 0)
        {
            let SpawnedIndex:number = TBX.Random.Next(0,this._Level.Enemies.length - 1);
            let Spawned:Enemy = this._Level.Enemies[SpawnedIndex];
            let Offset:TBX.Vertex = new TBX.Vertex(0, TBX.Random.Next(800,1000), 0);
            Offset.RotateZ(TBX.Random.Next(0,359));
            Spawned.Position = Player.Current.RealPosition.Copy().Add(Offset);
            this._State.AttachEnemy(Spawned);
            this._Level.Enemies.splice(SpawnedIndex, 1);
        }
    }
}