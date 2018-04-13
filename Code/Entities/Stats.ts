export { Stats }

class Stats
{
    protected _Health:number;
    protected _MaxHealth:number;
    protected _Speed:number;
    public get Health(): number { return this._Health; }
    public set Health(Value:number) { this._Health = Value; }
    public get MaxHealth(): number { return this._MaxHealth; }
    public set MaxHealth(Value:number) { this._MaxHealth = Value; }
    public get Speed(): number { return this._Speed; }
    public set Speed(Value:number) { this._Speed = Value; }
    public constructor(Old?:Stats)
    {
        if(Old)
        {
            this._Health = Old._Health;
            this._MaxHealth = Old._MaxHealth;
            this._Speed = Old._Speed;
        }
        else
        {
            this.InitStats();
        }
    }
    public Copy(): Stats
    {
        return new Stats(this);
    }
    private InitStats()
    {
        this._Health = 100;
        this._MaxHealth = 100;
        this._Speed = 5;
    }
}