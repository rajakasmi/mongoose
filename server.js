// ======================
// Import des modules
// ======================
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
// Initialisation de l’app Express
const app = express();

// Middleware pour parser le JSON
app.use(express.json());
const PORT = 30000;

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});

// ======================
// Connexion à MongoDB Atlas
// URI MongoDB local
const MONGO_URI = "mongodb://localhost:27017/person"; // Remplacez par votre URI MongoDB";

// Connexion
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connecté avec succès"))
.catch((err) => console.error("❌ Erreur de connexion MongoDB:", err));

// ======================
// Définition du Schéma
// ======================
const personSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Champ obligatoire
  age: Number,
  favoriteFoods: [String], // Tableau de chaînes de caractères
});

// ======================
// Création du Modèle
// ======================
const Person = mongoose.model("Person", personSchema);

// ======================
// 1. Créer et sauvegarder une personne
// ======================
const createAndSavePerson = () => {
  const person = new Person({
    name: "John Doe",
    age: 25,
    favoriteFoods: ["pizza", "pasta"],
  });

  person.save((err, data) => {
    if (err) return console.error(err);
    console.log("✅ Personne sauvegardée:", data);
  });
};

// ======================
// 2. Créer plusieurs personnes
// ======================
const arrayOfPeople = [
  { name: "Mary", age: 22, favoriteFoods: ["sushi", "burritos"] },
  { name: "Peter", age: 30, favoriteFoods: ["hamburger", "fries"] },
  { name: "Sara", age: 27, favoriteFoods: ["burritos", "tacos"] },
];

const createManyPeople = () => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    console.log("✅ Plusieurs personnes créées:", people);
  });
};

// ======================
// 3. Trouver par nom
// ======================
const findPeopleByName = (personName) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err);
    console.log(`✅ Personnes trouvées avec le nom ${personName}:`, data);
  });
};

// ======================
// 4. Trouver une personne par aliment favori
// ======================
const findOneByFood = (food) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    console.log(`✅ Personne qui aime ${food}:`, data);
  });
};

// ======================
// 5. Trouver par ID
// ======================
const findPersonById = (personId) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    console.log("✅ Personne trouvée par ID:", data);
  });
};

// ======================
// 6. Mettre à jour (Find -> Edit -> Save)
// ======================
const findEditThenSave = (personId) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);

    person.favoriteFoods.push("hamburger"); // Ajout d’un nouvel aliment
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      console.log("✅ Personne mise à jour:", updatedPerson);
    });
  });
};

// ======================
// 7. Mise à jour avec findOneAndUpdate
// ======================
const findAndUpdate = (personName) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true }, // Retourner le document mis à jour
    (err, updatedDoc) => {
      if (err) return console.error(err);
      console.log("✅ Personne mise à jour avec findOneAndUpdate:", updatedDoc);
    }
  );
};

// ======================
// 8. Supprimer par ID
// ======================
const removeById = (personId) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) return console.error(err);
    console.log("✅ Personne supprimée:", removedDoc);
  });
};

// ======================
// 9. Supprimer plusieurs personnes
// ======================
const removeManyPeople = () => {
  Person.remove({ name: "Mary" }, (err, result) => {
    if (err) return console.error(err);
    console.log("✅ Suppression des 'Mary':", result);
  });
};

// ======================
// 10. Chaînage de requêtes
// ======================
const queryChain = () => {
  Person.find({ favoriteFoods: "burritos" })
    .sort({ name: 1 })   // Trier par nom (ascendant)
    .limit(2)            // Limiter à 2 résultats
    .select("-age")      // Masquer l’âge
    .exec((err, data) => {
      if (err) return console.error(err);
      console.log("✅ Résultats du queryChain:", data);
    });
};

