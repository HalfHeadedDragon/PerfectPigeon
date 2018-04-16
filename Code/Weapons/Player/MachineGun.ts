export { MachineGun }

import * as TBX from "engineer-js";

import { PlayerWeapon } from "./PlayerWeapon";

class MachineGun extends PlayerWeapon
{
    public constructor(Old?:MachineGun)
    {
        super(Old);
        if(Old)
        {

        }
        else
        {
            this.InitMachineGun();
        }
    }
    public Copy() : MachineGun
    {
        return new MachineGun(this);
    }
    private InitMachineGun() : void
    {
        this._ProjectileID = "MachineGunBullet";
        this.LoadSprites("MachineGun");
    }
}