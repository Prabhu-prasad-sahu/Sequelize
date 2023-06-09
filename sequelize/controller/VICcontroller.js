const { image, video, comment, sequelize, DataTypes, post, recation } = require("../models/db")

let polyOneToMany = async (req, rsp) => {
    try {
        let imageData = await image.create({
            title: req.body.imageTitle,
            text: req.body.imageText,
        })
        let videoData = await video.create({
            title: req.body.videoTitle,
            url: req.body.videoUrl,
        })
        if (imageData && videoData) {
            await comment.create({
                title: req.body.imageComment,
                commentableId: imageData.id,
                commentableType: imageData.title
            })
            await comment.create({
                title: req.body.videoComment,
                commentableId: videoData.id,
                commentableType: videoData.title
            })
        }
        rsp.send("create successfully")
    } catch (error) {
        console.log(error);
    }
}

let queryInterface = (req, rsp) => {
    // let data = {}
    const queryInterface = sequelize.getQueryInterface();
    queryInterface.createTable('Person', {
        name: DataTypes.STRING,
        isBetaMember: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    });
    // queryInterface.addColumn('Person', 'petNum', { type: DataTypes.INTEGER });
    queryInterface.changeColumn('Person', 'petNum', {
        type: DataTypes.FLOAT,
        defaultValue: 3.14,
        allowNull: false
    });
    rsp.send("created")
}

async function makePostWithReactions(content, reactionTypes) {
    const Post = await post.create({ content });
    await recation.bulkCreate(
        reactionTypes.map(type => ({ type, PostTableId: Post.id }))
    );
    return Post;
}
let SubQueries = async (req, rsp) => {
    try {
        // await makePostWithReactions('Hello World', [
        //     'Like', 'Angry', 'Laugh', 'Like', 'Like', 'Angry', 'Sad', 'Like'
        // ]);
        // await makePostWithReactions('My Second Post', [
        //     'Laugh', 'Laugh', 'Like', 'Laugh'
        // ]);

        // =====================================================================================

        let data = await post.findAll({
            // include: {
            //     model: recation
            // },
            attributes: {
                include: [
                    [

                        sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM reactionTables  as reaction
                            WHERE
                            reaction.PostTableId = post.id
                                AND
                                reaction.type = "Laugh"
                        )`),
                        'laughReactionsCount'
                    ]
                ]
            }
        });

        // let data = await post.findAll()
        rsp.send({ "data >>": data })
    } catch (error) {
        console.log(error);
    }
}
module.exports = { polyOneToMany, queryInterface, SubQueries }