export { Buff }

import { Stats } from "./../Entities/Stats";

enum BuffType
{
    Static = "Static",
    Ratio = "Ratio"
}
class Buff
{
    protected _Duration:number;
    protected _Type:BuffType;
    protected _Stats:Stats;
    public get Expired():boolean { return this._Duration == 0; }
    public constructor(Old?:Buff)
    {
        if(Old)
        {
            this._Type = Old._Type;
            this._Stats = Old._Stats.Copy();
        }
        else
        {
            this.InitBuff();
        }
    }
    public Copy() : Buff
    {
        return new Buff(this);
    }
    private InitBuff()
    {
        this._Stats = new Stats();
    }
    public Update() : void
    { 
        this._Duration--;
    }
    public Apply(Effected:Stats) : void
    {
        if(this.Expired) return;
        if(this._Type == BuffType.Static) this.ApplyStatic(Effected);
        else if(this._Type == BuffType.Ratio) this.ApplyRatio(Effected);
    }
    private ApplyStatic(Effected:Stats) : void
    {
        Effected.Health += this._Stats.Health;
        Effected.MaxHealth += this._Stats.MaxHealth;
        Effected.Speed += this._Stats.Speed;
    }
    private ApplyRatio(Effected:Stats) : void
    {
        Effected.Health *= this._Stats.Health / 100;
        Effected.MaxHealth *= this._Stats.MaxHealth / 100;
        Effected.Speed *= this._Stats.Speed / 100;
    }
}