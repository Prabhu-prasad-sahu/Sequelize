
module.exports = (sequelize, DataTypes) => {
    let Post = sequelize.define("PostTable", {
        content: DataTypes.STRING
    }, { timestamps: false })
    Post.associate = (module) => {
        Post.hasMany(module.recation)
    }
    return Post;
}
