export { AlienLevels }

let AlienLevels =
[
    {
        ID: "1-1",
        Back: "Town",
        EnemyCap: 10,
        Enemies:
        [
            {
                Amount: 20,
                Type: "AlienGuard"
            },
            {
                Amount: 5,
                Type: "AlienCaptain"
            }
        ]
    },
    {
        ID: "AlienGuard-Test",
        Back: "Town",
        EnemyCap: 1,
        Enemies:
        [
            {
                Amount: 1,
                Type: "AlienGuard"
            }
        ]
    },
    {
        ID: "AlienCaptain-Test",
        Back: "Town",
        EnemyCap: 1,
        Enemies:
        [
            {
                Amount: 1,
                Type: "AlienCaptain"
            }
        ]
    },
]