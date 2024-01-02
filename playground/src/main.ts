import {
    BaseToolBox,
    Dimensions2D,
    Entity,
    GameContext,
    GameLoop, GameToolBox, Vector2D,
} from "jetpackjs"

class Player implements Entity {
    id = "player";
    location: Vector2D = { x: 0, y: 0 };
    dimensions: Dimensions2D = { width: 0, height: 0 };
    visible = true;
    toolbox: BaseToolBox;

    constructor(toolbox: BaseToolBox) {
        this.toolbox = toolbox;
    }

    update(): void {
        console.log("Player update");
    }

    fixedUpdate(): void {
        console.log("Player fixedUpdate");
    }

    render(): void {
        console.log("Player render");
    }

}

const gameContext: GameContext = new Map();

const gameToolBox: GameToolBox = {
    init: (toolbox) => {
        toolbox.gameContext.set("player", new Player(toolbox));
    },
    handleInput: (toolbox) => {},
    update: (toolbox) => {
        console.log(toolbox.fps);
    },
    fixedUpdate: (toolbox) => {},
    render: (toolbox) => {},
    gameContext: gameContext,
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const gameLoop = new GameLoop(canvas, gameToolBox);

gameLoop.initialize();