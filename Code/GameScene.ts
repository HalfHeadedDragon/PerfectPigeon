export { GameScene };

import * as TBX from "engineer-js";

import { Player } from "./Player/Player";
import { State } from "./Entities/State";

class GameScene extends TBX.Scene2D
{
    private _Pause:boolean;
    private _Player:Player;
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
        this.BackColor = TBX.Color.Teal;
        this._Player = new Player();
        this.Attach(this._Player);
        let MainState:State = new State();
        this.Events.Update.push(this.SceneUpdate.bind(this));
    }
    private KeyPress(G: any, Args: any): void
    {
        if(this._Pause) return;
        // Key Code here
    }
    private SceneUpdate() : void
    {
        if(this._Pause) return;
        this._Player.Update();
    }
}