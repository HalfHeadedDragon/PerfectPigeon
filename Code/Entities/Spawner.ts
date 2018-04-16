export { Spawner }

import { State } from "./State";
import { Player } from "./../Player/Player";
import { Level } from "./../Levels/Level";

class Spawner
{
    private _Number:number;
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
            this._Number = 0;
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
        
    }
}