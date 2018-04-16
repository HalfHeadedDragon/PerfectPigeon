export { HeavyMachineGun }

import * as TBX from "engineer-js";

import { PlayerWeapon } from "./PlayerWeapon";

class HeavyMachineGun extends PlayerWeapon
{
    public constructor(Old?:HeavyMachineGun)
    {
        super(Old);
        if(Old)
        {

        }
        else
        {
            this.InitHeavyMachineGun();
        }
    }
    public Copy() : HeavyMachineGun
    {
        return new HeavyMachineGun(this);
    }
    private InitHeavyMachineGun() : void
    {
        this._ProjectileID = "HeavyMachineGunBullet";
        this._FireRate = 8;   
        this.LoadSprites("HeavyMachineGun");
    }
}