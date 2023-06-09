
module.exports = (sequelize, DataTypes) => {
    let comment = sequelize.define("commentTbale", {
        title: DataTypes.STRING,
        commentableId: DataTypes.INTEGER,
        commentableType: DataTypes.STRING
    })
    return comment;
}
