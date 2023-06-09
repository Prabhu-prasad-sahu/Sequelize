
module.exports = (sequelize, DataTypes) => {
    let video = sequelize.define("videoTable", {
        title: DataTypes.STRING,
        url: DataTypes.STRING
    })
    video.associate = (models) => {
        video.hasMany(models.comment, {
            foreignKey: 'commentableId',
            constraints: false,
            as: 'videoData'
        })
        models.comment.belongsTo(video, {
            foreignKey: 'commentableId'
        })
    }
    return video;
}