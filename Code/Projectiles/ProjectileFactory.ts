export { ProjectileFactory }

import { Projectile } from "./Projectile";

class ProjectileFactory
{
    public static Current:ProjectileFactory;
    private _Pool:any;
    public constructor(Old:ProjectileFactory)
    {
        if(Old)
        {
            this._Pool = Old._Pool;
        }
        else
        {
            this._Pool = {};
            ProjectileFactory.Current = this;
        }
    }
    public Copy() : ProjectileFactory
    {
        return new ProjectileFactory(this);
    }
    public Register(ID:string, Entry:Projectile)
    {
        this._Pool[ID] = Entry;
    }
    public Create(ID:string) : Projectile
    {
        if(!this._Pool[ID]) return null;
        return this._Pool[ID].Copy();
    }
}