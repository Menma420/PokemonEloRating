module.exports = (sequelize, DataTypes) => {
    const Pokemon = sequelize.define(
        "Pokemon",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 100,
            },
        },
        {
            timestamps: false, // Disables createdAt and updatedAt columns
        }
    );

    return Pokemon;
};
