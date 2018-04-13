export { MachineGun }

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

        }
    }
    public Copy() : MachineGun
    {
        return new MachineGun(this);
    }
    private InitMachineGun() : void
    {
        this.LoadSprites("MachineGun");
    }
}