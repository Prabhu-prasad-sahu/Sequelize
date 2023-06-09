
module.exports = (sequelize, DataTypes) => {
    let image = sequelize.define("ImageTable", {
        title: DataTypes.STRING,
        text: DataTypes.STRING
    })
    image.associate = (models) => {
        image.hasMany(models.comment, {
            foreignKey: 'commentableId',
            constraints: false
        })
        models.comment.belongsTo(image, {
            foreignKey: 'commentableId'
        })
    }
    return image;
}