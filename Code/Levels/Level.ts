export { Level }

import * as TBX from "engineer-js";

import { Enemy } from "./../Enemies/Enemy";
import { EnemyFactory } from "./../Enemies/EnemyFactory";

class Level
{
    private _ID:string;
    private _BackID:string;
    private _EnemyCap:number;
    private _Enemies:Enemy[];
    public get ID():string { return this._ID; }
    public constructor(Old?:Level)
    {
        if(Old)
        {
            this._BackID = Old._BackID;
            this._EnemyCap = Old._EnemyCap;
            this._Enemies = [];
            for(let i in Old._Enemies) this._Enemies.push(Old._Enemies[i].Copy());
        }
        else
        {
            this.InitLevel();
        }
    }
    public Copy() : Level
    {
        return new Level(this);
    }
    private InitLevel()
    {
        this._BackID = "";
        this._Enemies = [];
    }
    public Deserialize(Data:any) : boolean
    {
        if(Data.ID && Data.Back && Data.EnemyCap && Data.Enemies != null)
        {
            this._ID = Data.ID;
            this._BackID = Data.Back;
            this._EnemyCap = Data.EnemyCap;
            for(let i in Data.Enemies)
            {
                for(let j = 0; j < Data.Enemies[i].Amount; j++)
                {
                    this._Enemies.push(EnemyFactory.Current.Create(this._Enemies[i].Type));
                }
            }
            return true;
        }
        else
        {
            TBX.Log.Error("Level deserialization failed.", Data, "PP_Data");
            return false;
        }
    }
}