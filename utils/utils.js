import mongoose from "mongoose";
import adventureSchema from "../models/adventure.js";
import characterSchema from "../models/character.js";
import tileSchema from "../models/tile.js";
import monsterSchema from "../models/monster.js";

const Adventure = mongoose.model("Adventure", adventureSchema);
const Character = mongoose.model("Character", characterSchema);
const Tile = mongoose.model("Tile", tileSchema);
const Monster = mongoose.model("Monster", monsterSchema);

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
function throwdiceof6() {
  return Math.round(Math.random() * 6 + 1);
}

function throwdiceof4() {
  return Math.round(Math.random() * 4 + 1);
}

export async function newAdventure() {
  try {
    let _adventureId = 0;
    let newAdventure = new Adventure();
    await newAdventure.save(async (error, adventure) => {
      _adventureId = adventure._id;
      newCharacter(_adventureId);
      newTile(_adventureId);
    });
  } catch (error) {
    error ? console.log(error) : "";
  }
}

async function newCharacter(adventure_id) {
  try {
    let newCharacter = new Character({
      name: "Link",
      hp: 20,
      atk: Math.round(throwdiceof6() + throwdiceof6()),
      armor: 5,
      adventureId: adventure_id,
    });
    await newCharacter.save((error, character) => {
      //console.log(character)
      error ? console.log(error) : "";
    });
  } catch (error) {
    error ? console.log(error) : "";
  }
}

async function newTile(adventure_id) {
  const tile_type = [
    "grasslands",
    "hills",
    "forest",
    "mountains",
    "desert",
    "swamp",
  ];
  try {
    let newTile = new Tile();
    const randomTileType =
      tile_type[Math.floor(Math.random() * tile_type.length)];

    await newTile.save(async (error, tile) => {
      await Adventure.findByIdAndUpdate(adventure_id, {
        tile_active: tile._id,
      });
      newMonster(tile._id, tile_type);
    });
  } catch (error) {
    error ? console.log(error) : "";
  }
}

async function newMonster(tileId, tile_type) {
  const monster_type = [
    {
      type: "Ork",
      hp: 10,
      atk: tile_type !== "grassland" ? throwdiceof6() : throwdiceof6 + 2,
      armor: 4,
    },
    {
      type: "Gobelin",
      hp: 12,
      atk: tile_type !== "forest" ? throwdiceof4() - 1 : throwdiceof4() - 1 + 2,
      armor: 0,
    },
    {
      type: "Ghost",
      hp: 8,
      atk: tile_type !== "hills" ? throwdiceof4() : throwdiceof4 + 2,
      armor: 6,
    },
    {
      type: "Troll",
      hp: 12,
      atk: tile_type !== "mountain" ? throwdiceof6() : throwdiceof6 + 2,
      armor: 6,
    },
  ];
  try {
    const randomMonsterType =
      monster_type[Math.floor(Math.random() * monster_type.length)];
    console.log(randomMonsterType);
    let newMonster = new Monster(randomMonsterType);
    await newMonster.save(async (error, monster) => {
      await Tile.findByIdAndUpdate(tileId, {
        monster: monster._id,
      });
      console.log(monster);
    });
  } catch (error) {
    error ? console.log(error) : "";
  }
}

export async function findAdventureById(adventureId) {
  try {
    console.log("findAdventureById adventureId ", adventureId);

    let result = await Adventure.findById(adventureId).populate({
      path: "tile_active",
      populate: { path: "monster" },
    });
    let temp = await Character.findOne({adventureId: adventureId});
    console.log("data sendfrom utils :", result);
    console.log("data sendfrom utils :", temp);

    return result + temp;
  } catch (error) {
    console.log(error);
  }
}
