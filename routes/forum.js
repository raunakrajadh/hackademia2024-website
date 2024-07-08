const express = require('express');
const app = express.Router();
const slugify = require('slugify')
const forumModel = require('../mongodb/models/forum');

function getRandomNumber() {
    let r = Math.floor(Math.random() * Date.now()) + 1;
    return Math.floor(Math.random() * Date.now()) + 1 + r
}

//forum home page
app.get('/', async (req, res) => {
    const forums = await forumModel.find().sort({ createdAt: 'desc' })
    res.render('forum', {forums});
});

app.post('/new-forum', async (req, res) => {

    let id = getRandomNumber()

    new forumModel({
        id: id,
        slug: slugify(req.body.forum_title, { lower: true, strict: true }),
        user: `Hackademia`,
        title: req.body.forum_title,
        content: req.body.forum_content

    }).save().then(() => {
        res.redirect('/forum');
    })
    .catch((error) => {
        console.log(error);
        res.redirect('/forum');
    })
})

app.post('/delete-forum/:forum_id', async (req, res) => {

    await forumModel.findOneAndDelete({id: req.params.forum_id})
    .then(() => {
        res.redirect('/forum');
    })
    .catch((error) => {
        console.log(error);
        res.redirect('/forum');
    })
});

app.post('/new-reply/:forum_id', async (req, res) => {

    let id = getRandomNumber()

    await forumModel.findOneAndUpdate({id: req.params.forum_id},
        {
            $push: {
                replies: {
                    id: id,
                    user: "Hackademia",
                    content: req.body.reply
                }
            }
        }
    ).then(() => {
        res.redirect('/forum');
    })
    .catch((error) => {
        console.log(error);
        res.redirect('/forum');
    })
});

app.post('/delete-reply/:forum_id/:reply_id', async (req, res) => {
    let reply;
    await forumModel.findOne({id: req.params.forum_id}).then((data) => {
        reply = data.replies.find((r) => r.id == req.params.reply_id)                
    })

    await forumModel.findOneAndUpdate({id: req.params.forum_id},
        {
            $pull: {
                replies: reply,
            }
        }
    ).then(() => {
        res.redirect('/forum');
    })
    .catch((error) => {
        console.log(error);
        res.redirect('/forum');
    })
});

module.exports = {app};