export { MachineGunBullet }

import * as TBX from "engineer-js";

import { Projectile } from "./../Projectile";

class MachineGunBullet extends Projectile
{
    public constructor(Old?:MachineGunBullet)
    {
        super(Old);
        if(Old)
        {

        }
        else
        {
            this.InitMachineGunBullet();
        }
    }
    public Copy() : MachineGunBullet
    {
        return new MachineGunBullet(this);
    }
    private InitMachineGunBullet() : void
    {
        this.Name = "MachineGunBullet";
        this.Size = new TBX.Vertex(15,15,1);
        this.Paint = TBX.Color.Red;
        this.LoadSprites("Player/Bullet", 1);
    }
}