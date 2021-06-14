import mongoose from "mongoose";
import adventureSchema from "../models/adventure.js";
import characterSchema from "../models/character.js";

function throwdiceof6() {
  return Math.random() * 6 + 1;
}

function throwdiceof4() {
  return Math.random() * 4 + 1;
}

export async function connectDB() {
  const server = "127.0.0.1:27017";
  const database = "RPG";
  try {
    mongoose.set("debug", true); // permet dafficher le debug
    mongoose.Promise = global.Promise; // permet d'utiliser les promesses globalement dans le code pour mongo
    await mongoose.connect(`mongodb://${server}/${database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("MongoDB connected!!");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
}
function newCharacter(adventure_id) {
  const Character = mongoose.model("Adventure", adventureSchema);
  let newCharacter = new Character({
    name: "Link",
    hp: 20,
    atk: throwdiceof6 + throwdiceof6,
    armor: 5,
    adventureId: adventure_id,
  });
  newCharacter.save((error, character) => {
    if (error) {
      return error;
    }
    console.log(character);
    return character;
  });
}

export function newAdventure() {
  const Adventure = mongoose.model("Adventure", adventureSchema);
  let newAdventure = new Adventure();
  newAdventure.save((error, adventure) => {
    if (error) {
      return error;
    }
    let newCharacter = newCharacter(adventure._id);
    console.log(newCharacter);
  });
}

export function newMonster() {
  const monster_type = ["Ork", "Gobelin", "Ghost", "Troll"];
}

export function newTile() {
  const tile_type = [
    "grasslands",
    "hills",
    "forest",
    "mountains",
    "desert",
    "swamp",
  ];
}
