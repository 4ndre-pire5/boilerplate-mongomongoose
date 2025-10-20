require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB com sucesso"))
  .catch(err => console.error("❌ Erro na conexão:", err));

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {type:String, required: true}, 
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

//CREATE PERSON
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Andre Pires", 
    age: 50, 
    favoriteFoods: ["churrasco", "alcachofra", "pao de cebola"]
  });

  person.save((err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

//CREATE MANY
var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["rost chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["Wine"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return done(err);
    return done(null, people);
  });
};

//FIND BY NAME
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound) =>{
    if (err) return done(err);
    return done(null, personFound);
  });
};

//FIND ONE BY FOOD
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, personFound) => {
    if (err) return done(err);
    return done(null, personFound);
  });
};

//FIND PERSON BY ID
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, personFound) => {
    if (err) return done(err);
    return done(null, personFound);
  });
};

//FIND EDIT SAVE
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, personFound) => {
    if (err) return done(err);

    personFound.favoriteFoods.push(foodToAdd);
    personFound.save((err, updatePerson) => {
      if (err) return done(err);
      return done(null, updatePerson);
    });
  });
};

//FIND AND UPDATE
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updateDoc) => {
    if (err) return done(err);
    return done(null, updateDoc);
  });
};

//FIND AND REMOVE
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removeDoc) => {
    if (err) return done(err);
    return done(null, removeDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
