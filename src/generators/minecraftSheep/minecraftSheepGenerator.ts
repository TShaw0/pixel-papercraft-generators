"use client";

import type {
  GeneratorDef,
  ImageDef,
  HistoryDef,
  TextureDef,
  ScriptDef,
  ThumbnailDef,
} from "@genroot/builder/modules/generatorDef";
import { type Generator } from "@genroot/builder/modules/generator";

import { sheep, wool } from "../_common/minecraftEntities";
import { type Dimensions, Minecraft } from "../_common/minecraft";


import sheepImage from "./textures/sheep.png";
import sheepWoolImage from "./textures/sheep_wool.png";
import sheepUndercoatImage from "./textures/sheep_wool_undercoat.png";

import foregroundImage from "./images/Foreground.png";
import foldsImage from "./images/Folds.png";
import labelsImage from "./images/Labels.png";


import thumbnailImage from "./thumbnail/thumbnail-256.jpeg";

const id = "minecraft-sheep";

const name = "Minecraft Sheep";

const history: HistoryDef = [

];

const thumbnail: ThumbnailDef = {
  url: thumbnailImage.src,
};

const images: ImageDef[] = [
  { id: "Foreground", url: foregroundImage.src },
  { id: "Folds", url: foldsImage.src },
  { id: "Labels", url: labelsImage.src },
];

const textures: TextureDef[] = [
  // "Sheep" texture is the default texture to show when the generator loads
  {
    id: "Sheep",
    url: sheepImage.src,
    standardWidth: 64,
    standardHeight: 32,
  },
  {
    id: "Sheep Wool",
    url: sheepWoolImage.src,
    standardWidth: 64,
    standardHeight: 32,
  },
  {
    id: "Sheep Undercoat",
    url: sheepUndercoatImage.src,
    standardWidth: 64,
    standardHeight: 32,
  },
];

const script: ScriptDef = (generator: Generator) => {
  const minecraftGenerator = new Minecraft(generator);

  generator.defineTextureInput("Sheep", {
    standardWidth: 64,
    standardHeight: 32,
    choices: [
      "Sheep"
    ],
  });

  generator.defineTextureInput("Sheep Undercoat", {
    standardWidth: 64,
    standardHeight: 32,
    choices: ["Sheep Undercoat"],
  });

  // Define user variables

  generator.defineSelectInput("Sheep Wool Color", [
    "White",
    "Black",
    "Red",
    "Green",
    "Brown",
    "Blue",
    "Purple",
    "Cyan",
    "Light Gray",
    "Gray",
    "Pink",
    "Lime",
    "Yellow",
    "Light Blue",
    "Magenta",
    "Orange",
  ]);

  generator.defineBooleanInput("Show Folds", true);

  generator.defineBooleanInput("Show Labels", true);

  // Get user variable values

  const woolColor = (() => {
    switch (generator.getSelectInputValue("Sheep Wool Color")) {
      case "Black":
        return "1D1D21";
      case "Red":
        return "B02E26";
      case "Green":
        return "5E7C16";
      case "Brown":
        return "835432";
      case "Blue":
        return "3C44AA";
      case "Purple":
        return "8932B8";
      case "Cyan":
        return "169C9C";
      case "Light Gray":
        return "9D9D97";
      case "Gray":
        return "474F52";
      case "Pink":
        return "F38BAA";
      case "Lime":
        return "80C71F";
      case "Yellow":
        return "FED83D";
      case "Light Blue":
        return "3AB3DA";
      case "Magenta":
        return "C74EBD";
      case "Orange":
        return "F9801D";
      case "White":
        return "F9FFFE";
      default:
        return "F9FFFE";
    }
  })();

  const showFolds = generator.getBooleanInputValue("Show Folds");
  const showLabels = generator.getBooleanInputValue("Show Labels");

  function getGridOrigin([gx, gy]: [number, number], [dx, dy]: [number, number]): [number, number] {
    return [dx + 9 + 32 * gx, dy + 5 + 32 * gy];
  } 

  // Draw Sheep
  const drawSheep = (texture: string, tint: string) => {
    // Draw Head
    function drawHead([ox, oy]: [number, number]) {
      const dimensions: Dimensions = [48, 48, 64];
      minecraftGenerator.drawCuboid(texture, sheep.head, [ox, oy], dimensions, { blend: { kind: "MultiplyHex", hex: tint } });
    }

    // Draw Body
    function drawBody([ox, oy]: [number, number]) {
      const dimensions: Dimensions = [64, 128, 48];
      minecraftGenerator.drawCuboid(texture, sheep.body, [ox, oy], dimensions, { blend: { kind: "MultiplyHex", hex: tint } });
    }
    // Draw Leg
    function drawLeg([ox, oy]: [number, number], leftSide: boolean,) {
      const dimensions: Dimensions = [32, 96, 32];
      minecraftGenerator.drawCuboid(texture, sheep.leg, [ox, oy], dimensions, { blend: { kind: "MultiplyHex", hex: tint } });
    }
    let [ox, oy] = getGridOrigin([0, 0], [8, 0]);
    drawHead([ox, oy]); 
    [ox, oy] = getGridOrigin([1, 17], [0, 0]);
    drawBody([ox, oy]);
    //[ox, oy] = getGridOrigin([0, 0], [0, 0]);
    //drawLeg([ox, oy], false);
    //[ox, oy] = getGridOrigin([0, 0], [0, 0]);
    //drawLeg([ox, oy], false);
    //[ox, oy] = getGridOrigin([0, 0], [0, 0]);
    //drawLeg([ox, oy], true);
    //[ox, oy] = getGridOrigin([0, 0], [0, 0]);
    //drawLeg([ox, oy], true);

  };

  // Draw Wool
  const drawWool = (texture: string, tint: string) => {
    // Draw Head
    function drawHead([ox, oy]: [number, number]) {
      const dimensions: Dimensions = [48, 48, 64];
      minecraftGenerator.drawCuboid(texture, wool.head, [ox, oy], dimensions, { blend: { kind: "MultiplyHex", hex: tint } });
    }

    // Draw Body
      // function drawBody([ox, oy]: [number, number]) {
      // }
    // Draw Leg
      // function drawLeg([ox, oy]: [number, number]) {
      // }

      drawHead([200, 200]);
      // drawBody([0, 0]);
      // drawLeg([0, 0]);
  };

  drawSheep("Sheep", "None"); // draw sheep
  drawSheep("Sheep Undercoat", woolColor) // draw undercoat
  drawWool("Wool", woolColor); // draw collar

  // Background

  generator.drawImage("Foreground", [0, 0]);

  //Fold Lines

  if (showFolds) {
    generator.drawImage("Folds", [0, 0]);
  }

  // Labels

  if (showLabels) {
    generator.drawImage("Labels", [0, 0]);
  }
};

export const generator: GeneratorDef = {
  id,
  name,
  history,
  thumbnail,
  video: null,
  instructions: null,
  images,
  textures,
  script,
};
