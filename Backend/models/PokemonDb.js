// module.exports = (sequelize, DataTypes) => {
//     const Pokemon = sequelize.define(
//         "Pokemon",
//         {
//             name: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },
//             image: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },
//             rating: {
//                 type: DataTypes.INTEGER,
//                 allowNull: false,
//                 defaultValue: 100,
//             },
//         },
//         {
//             timestamps: false, // Disables createdAt and updatedAt columns
//         }
//     );

//     return Pokemon;
// };



const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true, // Equivalent to allowNull: false
        },
        image: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            default: 100, // Equivalent to defaultValue: 100
        },
    },
    {
        timestamps: false, // Disables createdAt and updatedAt fields
    }
);

// Create and export the model
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;
