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

import thumnbailImage from "./thumbnail/thumbnail-v2-256.jpeg";
import whitesheepImage from "./textures/white.png";
import backgroundImage from "./images/Background.png";
import foldsImage from "./images/Folds.png";
import labelsImage from "./images/Labels.png";
import ocelotImage from "./textures/ocelot.png";
import allBlackImage from "./textures/all_black.png";
import britishShorthairImage from "./textures/british_shorthair.png";
import calicoImage from "./textures/calico.png";
import jellieImage from "./textures/jellie.png";
import redImage from "./textures/red.png";
import persianImage from "./textures/persian.png";
import ragdollImage from "./textures/ragdoll.png";
import siameseImage from "./textures/siamese.png";
import tabbyImage from "./textures/tabby.png";
import blackImage from "./textures/black.png";
import catCollarImage from "./textures/cat_collar.png";
import whiteImage from "./textures/white.png";

const id = "minecraft-sheep";

const name = "Minecraft Sheep";

const history: HistoryDef = [

];

const thumbnail: ThumbnailDef = {
  url: thumnbailImage.src,
};

const instructions = `
## How to use the Minecraft Sheep Generator?

### Option 1: Use a texture pack or mod sheep skin

* Download your favourite texture pack or mod.
* Find a sheep texture file.
* Select this file in the generator.
* Download and print your new sheep papercraft.

## Option 2: Create your own sheep texture file

* Download a sample sheep texture (right click and save):
  ![Car Texture](${whitesheepImage.src})
* Edit this texture in your favourite graphics program.
* Select this file in the generator.
* Download and print your new sheep papercraft.
`;

const images: ImageDef[] = [
  { id: "Background", url: backgroundImage.src },
  { id: "Folds", url: foldsImage.src },
  { id: "Labels", url: labelsImage.src },
];

const textures: TextureDef[] = [
  // "Sheep" texture is the default texture to show when the generator loads
  {
    id: "Sheep",
    url: ocelotImage.src,
    standardWidth: 64,
    standardHeight: 32,
  },
  {
    id: "Black",
    url: allBlackImage.src,
    standardWidth: 64,
    standardHeight: 32,
  },
  {
    id: "British Shorthair",
    url: britishShorthairImage.src,
    standardWidth: 64,
    standardHeight: 32,
  },
  {
    id: "Calico",
    url: calicoImage.src,
    standardWidth: 64,
    standardHeight: 32,
  },
  {
    id: "Jellie",
    url: jellieImage.src,
    standardWidth: 64,
    standardHeight: 32,
  },
  {
    id: "Ocelot",
    url: ocelotImage.src,
    standardWidth: 64,
    standardHeight: 32,
  },
  {
    id: "Orange Tabby",
    url: redImage.src,
    standardWidth: 64,
    standardHeight: 32,
  },
  {
    id: "Persian",
    url: persianImage.src,
    standardWidth: 64,
    standardHeight: 32,
  },
  {
    id: "Ragdoll",
    url: ragdollImage.src,
    standardWidth: 64,
    standardHeight: 32,
  },
  {
    id: "Siamese",
    url: siameseImage.src,
    standardWidth: 64,
    standardHeight: 32,
  },
  {
    id: "Tabby",
    url: tabbyImage.src,
    standardWidth: 64,
    standardHeight: 32,
  },
  {
    id: "Tuxedo",
    url: blackImage.src,
    standardWidth: 64,
    standardHeight: 32,
  },
  {
    id: "White",
    url: whiteImage.src,
    standardWidth: 64,
    standardHeight: 32,
  },
  {
    id: "Sheep Collar",
    url: catCollarImage.src,
    standardWidth: 64,
    standardHeight: 32,
  },
];

const script: ScriptDef = (generator: Generator) => {
  // Define user inputs

  generator.defineTextureInput("Sheep", {
    standardWidth: 64,
    standardHeight: 32,
    choices: [
      "Black",
      "British Shorthair",
      "Calico",
      "Jellie",
      "Ocelot",
      "Orange Tabby",
      "Persian",
      "Ragdoll",
      "Siamese",
      "Tabby",
      "Tuxedo",
      "White",
    ],
  });

  generator.defineTextureInput("Collar", {
    standardWidth: 64,
    standardHeight: 32,
    choices: ["Sheep Collar"],
  });

  // Define user variables

  generator.defineSelectInput("Wool Color", [
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
    "White",
  ]);

  generator.defineBooleanInput("Show Folds", true);

  generator.defineBooleanInput("Show Labels", true);

  // Get user variable values

  const woolColor = (() => {
    switch (generator.getSelectInputValue("Wool Color")) {
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
        return "B02E26";
    }
  })();

  const showFolds = generator.getBooleanInputValue("Show Folds");
  const showLabels = generator.getBooleanInputValue("Show Labels");

  function getGridOrigin(x: number, y: number): [number, number] {
    return [9 + 32 * x, 5 + 32 * y];
  }

  // Draw Sheep
  const drawSheep = (texture: string, tint: string) => {
    // Draw Head
    function drawHead([ox, oy]: [number, number]) {
    }

    // Draw Body
      function drawBody([ox, oy]: [number, number]) {
      }
    // Draw Leg
      function drawLeg([ox, oy]: [number, number]) {
      }

  };

  // Draw Wool
  const drawWool = (texture: string, tint: string) => {
          // Draw Head
    function drawHead([ox, oy]: [number, number]) {
    }

    // Draw Body
      function drawBody([ox, oy]: [number, number]) {
      }
    // Draw Leg
      function drawLeg([ox, oy]: [number, number]) {
      }
  };

  drawSheep("Sheep", "None"); // draw sheep
  drawSheep("Sheep Undercoat", woolColor) // draw undercoat
  drawWool("Wool", woolColor); // draw collar

  // Background

  generator.drawImage("Background", [0, 0]);

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
  instructions,
  images,
  textures,
  script,
};
