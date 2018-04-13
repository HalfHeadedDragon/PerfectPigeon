export { FactoryInit }

import { EnemyFactory } from "./Enemies/EnemyFactory";
import { ProjectileFactory } from "./Projectiles/ProjectileFactory";

class FactoryInit
{
    public static Init() : void
    {
        EnemyFactory.Init();
        ProjectileFactory.Init();
    }
}