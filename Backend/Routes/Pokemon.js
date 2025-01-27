const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Pokemon = require("../models/PokemonDb");

// GET: Fetch all Pokemon
router.get("/", async (req, res) => {
    try {
        const listOfPokemon = await Pokemon.find(); // Mongoose equivalent of findAll()
        res.json(listOfPokemon);
    } catch (error) {
        console.error("Error fetching Pokemon:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.post("/", async (req, res) => {
    console.log(req.body);

    try {
        const { updates } = req.body;
        if (!Array.isArray(updates) || updates.length === 0) {
            return res.status(400).json({ error: "No updates provided" });
        }

        for (const update of updates) {
            const { id, rating } = update;

            // Validate fields
            if (!id || rating === undefined) {
                return res.status(400).json({ error: "Missing 'id' or 'rating' in one of the update objects" });
            }

            // Convert string ID to ObjectId
            const objectId = new mongoose.Types.ObjectId(id);

            // Find Pokemon by ID
            const pokemon = await Pokemon.findById(objectId);

            if (!pokemon) {
                return res.status(404).json({ error: `Pokemon with ID ${id} not found` });
            }

            // Update and save the Pokemon's rating
            pokemon.rating = rating;
            await pokemon.save();
        }

        res.json({ message: "Pokemons updated successfully" });
    } catch (error) {
        console.error("Error details:", error.message);
        console.error("Stack trace:", error.stack);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});


module.exports = router;
