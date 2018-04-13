export { GameLogic };

import * as TBX from "engineer-js";

import { MainMenu } from "./MainMenu";
import { GameScene } from "./GameScene";
import { FactoryInit } from "./FactoryInit";

class GameLogic
{
    private _Game:any;
    private _Runner:any;
    public constructor()
    {
        this._Game = new TBX.Game();
        this._Game.Name = "Perfect Pigeon";
        this._Runner = new TBX.Runner(this._Game, TBX.DrawEngineType.ThreeJS);
        this._Runner.SetResolution(new TBX.Vertex(1920, 1080));
        let _Menu:any = new MainMenu(this._Runner, this._Game);
        this._Game.Attach(_Menu);
        FactoryInit.Init();
    }
    public Run() : void
    {
        this._Runner.SwitchScene("Menu");
        this._Runner.Run();
    }
}