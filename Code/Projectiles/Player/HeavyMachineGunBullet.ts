export { HeavyMachineGunBullet }

import { Projectile } from "./../Projectile";

class HeavyMachineGunBullet extends Projectile
{
    public constructor(Old?:HeavyMachineGunBullet)
    {
        super(Old);
        if(Old)
        {

        }
        else
        {
            this.InitHeavyMachineGunBullet();
        }
    }
    public Copy() : HeavyMachineGunBullet
    {
        return new HeavyMachineGunBullet(this);
    }
    private InitHeavyMachineGunBullet() : void
    {
        this._BaseStats.Speed = 15;
        this.LoadSprites("Player/Bullet", 1);
    }
}