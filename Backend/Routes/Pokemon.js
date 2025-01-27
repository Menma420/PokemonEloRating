const express = require("express");
const router = express.Router();
const {Pokemon} = require("../models");

router.get("/", async (req, res) => {
    const listofPokemon = await Pokemon.findAll();
    res.json(listofPokemon);
});

router.post("/", async (req, res) => {
    // Log the body of the request
    console.log(req.body);

    try {
        const { updates } = req.body;  // Destructure the 'updates' array from the request body

        if (!Array.isArray(updates) || updates.length === 0) {
            return res.status(400).json({ error: "No updates provided" });
        }

        // Loop through each update object
        for (const update of updates) {
            const { id, rating } = update;

            if (!id || rating === undefined) {
                return res.status(400).json({ error: "Missing 'id' or 'rating' in one of the update objects" });
            }

            const pokemon = await Pokemon.findByPk(id);

            if (!pokemon) {
                return res.status(404).json({ error: `Pokemon with ID ${id} not found` });
            }

            // Update the rating and save
            pokemon.rating = rating;
            await pokemon.save();
        }

        // Send success response after all updates
        res.json({ message: "Pokemons updated successfully" });
    } catch (error) {
        console.error("Error details:", error.message);
        console.error("Stack trace:", error.stack);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

module.exports = router;
