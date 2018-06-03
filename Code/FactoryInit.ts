export { FactoryInit }

import { LevelFactory } from "./Levels/LevelFactory";
import { EnemyFactory } from "./Enemies/EnemyFactory";
import { ProjectileFactory } from "./Projectiles/ProjectileFactory";

class FactoryInit
{
    public static Init() : void
    {
        LevelFactory.Init();
        EnemyFactory.Init();
        ProjectileFactory.Init();
    }
}