export { GameScene };

import * as TBX from "engineer-js";

import { State } from "./Entities/State";

class GameScene extends TBX.Scene2D
{
    private _Pause:boolean;
    
    public get Pause():boolean { return this._Pause; }
    public set Pause(value:boolean) { this._Pause = value; }
    public constructor()
    {
        super();
        this.Init();
    }
    public Init(): void
    {
        this.Name = "Game";
        this.BackColor = TBX.Color.Black;
        let MainState:State = new State(null, this, "AlienGuard-Test");
        this.Events.Update.push(this.SceneUpdate.bind(this));
        this.Events.KeyPress.push(this.KeyPress.bind(this));
    }
    private KeyPress(G: any, Args: any): void
    {
        if(Args.KeyCode == 32)
        {
            this._Pause = !this._Pause;
        }
        if(this._Pause) return;
    }
    private SceneUpdate() : void
    {
        if(this._Pause) return;
        State.Current.Update();
    }
}