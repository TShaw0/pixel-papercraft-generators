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

import foregroundImage from "./images/Foreground1.png";
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
    choices: [],
  });

  generator.defineTextureInput("Sheep Wool", {
    standardWidth: 64,
    standardHeight: 32,
    choices: [],
  });

  generator.defineTextureInput("Sheep Undercoat", {
    standardWidth: 64,
    standardHeight: 32,
    choices: [],
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
    "None",
  ]);

  generator.defineBooleanInput("Show Folds", false);

  generator.defineBooleanInput("Show Labels", false);

  // Get user variable values

  const woolColor = (() => {
    switch (generator.getSelectInputValue("Sheep Wool Color")) {
      case "Black":
        return "151518";
      case "Red":
        return "84221C";
      case "Green":
        return "465D10";
      case "Brown":
        return "623F25";
      case "Blue":
        return "2D337F";
      case "Purple":
        return "66258A";
      case "Cyan":
        return "107575";
      case "Light Gray":
        return "757571";
      case "Gray":
        return "353B3D";
      case "Pink":
        return "B6687F";
      case "Lime":
        return "609517";
      case "Yellow":
        return "BEA22D";
      case "Light Blue":
        return "2B86A3";
      case "Magenta":
        return "953A8D";
      case "Orange":
        return "BA6015";
      case "White":
        return "E6E6E6";
        case "None":
          return "None";
      default:
        return "E6E6E6";
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
      minecraftGenerator.drawCuboid(texture, sheep.body, [ox, oy], dimensions, { center: "Back", blend: { kind: "MultiplyHex", hex: tint } });
    }
    // Draw Leg
    function drawLeg([ox, oy]: [number, number], leftSide: boolean,) {
      const dimensions: Dimensions = [32, 96, 32];
      if (leftSide){
        minecraftGenerator.drawCuboid(texture, sheep.leg, [ox, oy], dimensions, {flip: "Horizontal", blend: { kind: "MultiplyHex", hex: tint } });
      }
      else {
        minecraftGenerator.drawCuboid(texture, sheep.leg, [ox, oy], dimensions, {blend: { kind: "MultiplyHex", hex: tint } });
      }
    }
    
    let [ox, oy] = getGridOrigin([5, 0], [17, 0]);
    drawHead([ox, oy]); 
    [ox, oy] = getGridOrigin([11, 17], [0, 16]);
    drawBody([ox, oy]);
    [ox, oy] = getGridOrigin([0, 8], [12, -12]);
    drawLeg([ox, oy], false);
    [ox, oy] = getGridOrigin([0, 13], [12, 0]);
    drawLeg([ox, oy], false);
    [ox, oy] = getGridOrigin([14, 8], [-12, -12]);
    drawLeg([ox, oy], true);
    [ox, oy] = getGridOrigin([14, 13], [-12, 0]);
    drawLeg([ox, oy], true);


  };

  // Draw Wool

    /*
  Instrux for finding dimesnions:
  - new wool dimensions = 2 * (old wool - body) + body = (old wool - body) + old wool
  old wool = body + some offset
  new wool = body + 2 ssame offset
  */ 
  const drawWool = (texture: string, tint: string) => {
    // Draw Head
    function drawHead([ox, oy]: [number, number]) {
      const dimensions: Dimensions = [58, 58, 58];
      minecraftGenerator.drawCuboid(texture, wool.head, [ox, oy], dimensions, { blend: { kind: "MultiplyHex", hex: tint } });
    }

    // Draw Body
    function drawBody([ox, oy]: [number, number]) {
      const dimensions: Dimensions = [92, 156, 76];
      minecraftGenerator.drawCuboid(texture, wool.body, [ox, oy - 156], dimensions, {rotate: 180.0, center: "Front", orientation:"South", blend: { kind: "MultiplyHex", hex: tint } });
      generator.drawTexture(texture, [48, 29, 8, 1], [ox + 76, oy - 12, 92, 12], { blend: { kind: "MultiplyHex", hex: tint }} ) // edge - at the top
      generator.drawTexture(texture, [55, 14, 1, 16], [ox - 12, oy + 76, 12, 156], { blend: { kind: "MultiplyHex", hex: tint }} ) // edge - left long side
      generator.drawTexture(texture, [48, 14, 1, 16], [ox + 244, oy + 76, 12, 156], { blend: { kind: "MultiplyHex", hex: tint }} ) // edge - right long side
      generator.drawTexture(texture, [41, 8, 1, 6], [ox + 32, oy + 200, 12, 76], {rotate: -90.0, flip: "Horizontal", blend: { kind: "MultiplyHex", hex: tint }} ) // edge - left short side
      generator.drawTexture(texture, [34, 8, 1, 6], [ox + 200, oy + 200, 12, 76], {rotate: 90.0, flip: "Horizontal", blend: { kind: "MultiplyHex", hex: tint }} ) // edge - right short side
    }
    // Draw Leg
    function drawLeg([ox, oy]: [number, number], leftSide: boolean,) {
      const dimensions: Dimensions = [40, 56, 40];
      if (leftSide){
        minecraftGenerator.drawCuboid(texture, wool.leg, [ox, oy - 56], dimensions, {flip: "Horizontal", blend: { kind: "MultiplyHex", hex: tint } });
        generator.fillRectangle([ox + 80, oy - 56, 40, 40], "ffffffff"); // cover top face for convenience
      }
      else {
        minecraftGenerator.drawCuboid(texture, wool.leg, [ox, oy - 56], dimensions, {blend: { kind: "MultiplyHex", hex: tint } });
        generator.fillRectangle([ox + 40, oy - 56, 40, 40], "ffffffff"); // cover top face for convenience
      }
    }
    
    let [ox, oy] = getGridOrigin([0, 19], [12, 6]);
    drawHead([ox, oy]); 
    [ox, oy] = getGridOrigin([5, 6], [6, -4]);
    drawBody([ox, oy]);
    [ox, oy] = getGridOrigin([0, 4], [7, 16]);
    drawLeg([ox, oy], false);
    [ox, oy] = getGridOrigin([0, 1], [7, -8]);
    drawLeg([ox, oy], false);
    [ox, oy] = getGridOrigin([13, 4], [-6, 16]);
    drawLeg([ox, oy], true);
    [ox, oy] = getGridOrigin([13, 1], [-6, -8]);
    drawLeg([ox, oy], true);


  };

  drawSheep("Sheep", "None"); // draw sheep
  drawSheep("Sheep Undercoat", woolColor == "E6E6E6" ? "None" : woolColor) // draw undercoat
  drawWool("Sheep Wool", woolColor); // draw wool 

  // Background

  generator.drawImage("Foreground", [0, 0]);

  //Fold Lines

  /* function drawFoldLineRectangle(rectangle: Rectangle) {
    const [x, y, w, h] = rectangle;

    generator.drawFoldLine([x, y - 1], [x + w, y - 1]);
    generator.drawFoldLine([x + w, y], [x + w, y + h]);
    generator.drawFoldLine([x + w, y + h + 1], [x, y + h + 1]);
    generator.drawFoldLine([x, y + h], [x, y]);
  }

  function drawFoldLineCuboid(
    position: Position,
    dimensions: Dimensions,
    leftSide: boolean = false
  ): void {
    const [x, y] = position;
    const [w, h, l] = dimensions;

    if (!leftSide) {
      drawFoldLineRectangle([x + l, y, w, l * 2 + h]);
      drawFoldLineRectangle([x, y + l, l * 2 + w * 2, h]);
      generator.drawFoldLine(
        [x + l * 2 + w - 1, y + l],
        [x + l * 2 + w - 1, y + l + h]
      );
    } else {
      drawFoldLineRectangle([x + l + w, y, w, l * 2 + h]);
      drawFoldLineRectangle([x, y + l, l * 2 + w * 2, h]);
      generator.drawFoldLine([x + w, y + l], [x + w, y + l + h]);
    }
  }

  if (showFolds) {
    let [ox, oy] = getGridOrigin([0, 0], [8, 0]);
    drawFoldLineCuboid([ox, oy], [48, 48, 64]); 
    [ox, oy] = getGridOrigin([1, 17], [0, 0]);
    drawFoldLineCuboid([ox, oy], [64, 128, 48]);
    [ox, oy] = getGridOrigin([0, 11], [12, 0]);
    drawFoldLineCuboid([ox, oy], [32, 96, 32], false);
    [ox, oy] = getGridOrigin([5, 11], [-4, 0]);
    drawFoldLineCuboid([ox, oy], [32, 96, 32], false);
    [ox, oy] = getGridOrigin([10, 11], [-28, 0]);
    drawFoldLineCuboid([ox, oy], [32, 96, 32], true);
    [ox, oy] = getGridOrigin([15, 11], [-44, 0]);
    drawFoldLineCuboid([ox, oy], [32, 96, 32], true);

    [ox, oy] = getGridOrigin([0, 6], [16, -8]);
    drawFoldLineCuboid([ox, oy], [52, 52, 52]); 
    [ox, oy] = getGridOrigin([7, 17], [66, -12]);
    drawFoldLineCuboid([ox, oy], [78, 142, 62]);
    [ox, oy] = getGridOrigin([8, 1], [0, -4]);
    drawFoldLineCuboid([ox, oy], [36, 52, 36], false);
    [ox, oy] = getGridOrigin([13, 1], [0, -4]);
    drawFoldLineCuboid([ox, oy], [36, 52, 36], true);
    [ox, oy] = getGridOrigin([8, 6], [0, 8]);
    drawFoldLineCuboid([ox, oy], [36, 52, 36], false);
    [ox, oy] = getGridOrigin([13, 6], [0, 8]);
    drawFoldLineCuboid([ox, oy], [36, 52, 36], true);
  }*/
if (showFolds) {
  generator.drawImage("Folds", [0, 0])
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
