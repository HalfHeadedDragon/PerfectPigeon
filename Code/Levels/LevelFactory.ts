export { LevelFactory }

import { Level } from "./Level";

import { AlienLevels } from "./Data/AlienLevels";

class LevelFactory
{
    public static Current:LevelFactory;
    private _Pool:any;
    public constructor(Old?:LevelFactory)
    {
        if(Old)
        {
            this._Pool = Old._Pool;
        }
        else
        {
            this._Pool = {};
            LevelFactory.Current = this;
        }
    }
    public Copy() : LevelFactory
    {
        return new LevelFactory(this);
    }
    public Register(ID:string, Entry:Level)
    {
        this._Pool[ID] = Entry;
    }
    public Create(ID:string) : Level
    {
        if(!this._Pool[ID]) return null;
        let NewLevel:Level = new Level();
        NewLevel.Deserialize(this._Pool[ID]);
        return NewLevel;
    }
    public static Init()
    {
        let Factory:LevelFactory = new LevelFactory();
        for(let i in AlienLevels)
        {
            Factory._Pool[AlienLevels[i].ID] = AlienLevels[i];
        }
    }
}