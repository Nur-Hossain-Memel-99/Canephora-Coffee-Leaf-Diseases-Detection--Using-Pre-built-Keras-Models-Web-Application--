const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const multer = require('multer');
const bodyparser = require('body-parser')
const fs = require('fs');
let { PythonShell } = require('python-shell')
let nodemaile = require("nodemailer");
require("dotenv").config();


//========================================================================================
//                               Usig for send mail
//========================================================================================
//https://accounts.google.com/b/0/DisplayUnlockCaptcha, SMTP, lesssecurityapp 
let sender = nodemaile.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'masterbanns@gmail.com',
        pass: '1982kaka!',
    },
});



//========================================================================================
//                                Express fil
//========================================================================================
app.use('/static', express.static('public'));
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/files', express.static('files'));
app.use('/images', express.static('images'));
app.use(express.urlencoded({
    limit: '150mb',
    extended: true
}));




//pug file
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'html'));


//datbase 
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function () {
    console.log("MongoDB database connection successfully");
});

//========================================================================================
//                                 Data base schema
//========================================================================================
let airticalSch = new mongoose.Schema(
    {
        title: String,
        newposttext: String,
        myimg: String,
        picname: String,
    }
);

let k = new mongoose.Schema({
    username: String,
    Password: String,
    gmail: String,
    access: String,
    subadmin: String,
})

let report = new mongoose.Schema({
    email: String,
    subject: String,
    indetail: String,
    sugg: String,
})

let gallerypicS = new mongoose.Schema({
    name: String,
    picname: String
})

let userID = new mongoose.Schema({
    username: String,
    Password: String,
    gmail: String,
    access: String,
    pic: String,
})

let communitySch = new mongoose.Schema({
    username: String,
    gmail: String,
    text: String,
    pic: String,
    userpic: String,
    time: String,
    comment:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }]
})

let commentSch = new mongoose.Schema({
    comment_usermail: String,
    comment_username: String,
    comment_user_pic: String,
    comment_user_text: String,
    time: String,
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'community',
    }
})


//========================================================================================
//                                    Data Model
//========================================================================================
let logon = mongoose.model('logonid', k);
let userlogon = mongoose.model('userlogonid', userID);
let airticalData = mongoose.model('airtical', airticalSch);
let reportM = mongoose.model('report', report);
let gallerypic = mongoose.model('gallerypicS', gallerypicS);
let community_post = mongoose.model('community', communitySch);
let comment_model = mongoose.model('comment', commentSch);







app.get('/', async (req, res) => {
    if (req.query.username != 'null') {
        let userlogin = await userlogon.findOne({ gmail: req.query.username });
        await gallerypic.find({}).exec(function (err, pic) {
            if (err) throw err;
            airticalData.find({}).exec(function (err, airticale) {
                if (err) throw err;
                if (userlogin) {
                    res.render('home.pug', { records: airticale, pic: pic, userpic: userlogin.pic, mail: req.query.username, Password: userlogin.Password });
                } else res.render('home.pug', { records: airticale, pic: pic, userpic: '../images/user/user.png' });

            })
        })
    } else {
        await gallerypic.find({}).exec(function (err, pic) {
            if (err) throw err;
            airticalData.find({}).exec(function (err, airticale) {
                if (err) throw err;
                res.render('home.pug', { records: airticale, pic: pic, userpic: '../images/user/user.png' });
            })
        })
    }
})


app.get('/about', async (req, res) => {
    if (req.query.username != 'null') {
        let userlogin = await userlogon.findOne({ gmail: req.query.username });
        await airticalData.find({}).exec(function (err, data) {
            if (err) throw err;
            if (userlogin) {
                res.render("about.pug", { records: data, userpic: userlogin.pic, mail: req.query.username, Password: userlogin.Password })
            } else res.render("about.pug", { records: data, userpic: '../images/user/user.png' })
        })
    } else
        await airticalData.find({}).exec(function (err, data) {
            if (err) throw err;
            res.render("about.pug", { records: data, userpic: '../images/user/user.png' })
        })
})


app.get('/bloge', async (req, res) => {
    if (req.query.username != 'null') {
        let userlogin = await userlogon.findOne({ gmail: req.query.username });
        await airticalData.find({}).exec(function (err, data) {
            if (err) throw err;
            if (userlogin) {
                res.render("bloge.pug", { records: data, userpic: userlogin.pic, mail: req.query.username, Password: userlogin.Password })
            } else res.render("bloge.pug", { records: data, userpic: '../images/user/user.png' })
        })
    } else
        await airticalData.find({}).exec(function (err, data) {
            if (err) throw err;
            res.render("bloge.pug", { records: data, userpic: '../images/user/user.png' })
        })
})


app.get('/contactus', async (req, res) => {
    if (req.query.username != 'null') {
        let userlogin = await userlogon.findOne({ gmail: req.query.username });
        await airticalData.find({}).exec(function (err, data) {
            if (err) throw err;
            if (userlogin) {
                res.render("contactus.pug", { records: data, userpic: userlogin.pic, mail: req.query.username, Password: userlogin.Password })
            } else res.render("contactus.pug", { records: data, userpic: '../images/user/user.png' })
        })
    } else
        await airticalData.find({}).exec(function (err, data) {
            if (err) throw err;
            res.render("contactus.pug", { records: data, userpic: '../images/user/user.png' })
        })
})


app.get('/checkde', async (req, res) => {
    if (req.query.username != 'null') {
        let userlogin = await userlogon.findOne({ gmail: req.query.username });
        if (userlogin) {
            res.render("checkde.pug", { userpic: userlogin.pic, mail: req.query.username, Password: userlogin.Password })
        } else res.render("checkde.pug", { userpic: '../images/user/user.png' })
    } else res.render("checkde.pug", { userpic: '../images/user/user.png' })
})




app.post('/reportProbem', async (req, res) => {

    var data = new reportM(req.body);

    async function loginfocheck() {
        let userlogin = await userlogon.findOne({ gmail: req.query.username });
        gallerypic.find({}).exec(function (err, pic) {
            if (err) throw err;
            airticalData.find({}).exec(function (err, airticale) {
                if (err) throw err;
                if (userlogin) {
                    res.render('home.pug', { records: airticale, pic: pic, userpic: userlogin.pic, mail: req.query.username, Password: userlogin.Password });
                } else res.render('home.pug', { records: airticale, pic: pic, userpic: '../images/user/user.png' });

            })
        })
    }

    data.save().then(() => {
        if (req.query.username != 'null') {
            loginfocheck();
        } else {
            gallerypic.find({}).exec(function (err, pic) {
                if (err) throw err;
                airticalData.find({}).exec(function (err, airticale) {
                    if (err) throw err;
                    res.render('home.pug', { records: airticale, pic: pic, userpic: '../images/user/user.png' });
                })
            })
        }
    })
})


app.get('/admin', (req, res) => {
    res.render("login.pug", { data: '' })
})



app.get('/creat_account/request_to_create_account', (req, res) => {
    res.render('verifyAccount.pug', { gmail: req.query.mail })
})

app.post("/creat_account/request_to_create_account", async (req, res) => {
    let username = req.body.username;
    let Password = req.body.Password;
    let gmail = req.body.mail;
    let access = Math.floor(Math.random() * 1000000);
    let userlogin = await logon.findOne({ gmail: gmail });



    //========================================================================================
    //                                    send mail
    //========================================================================================
    var mailBody = {
        form: 'masterbanns@gmail.com',
        to: 'chillofficialop@gmail.com',
        subject: 'Coffee leaf disease account verification',
        text: 'Verification code for ' + gmail + '\n ::' + access
    };
    let item = {
        username,
        Password,
        gmail,
        access,
    }
    async function update() {
        await logon.findOneAndUpdate({ gmail }, item)
    }


    if (userlogin) {
        if (userlogin.access != 'true') {
            sender.sendMail(mailBody, function (err, info) {
                if (err) console.log(err)
                else {
                    update()
                    res.render('verifyAccount.pug', { gmail })
                }
            })
        } else
            res.render("login.pug", { data: "Note::Mail already Used" })
    } else {


        sender.sendMail(mailBody, function (err, info) {
            if (err) {
                console.log(err)
            } else {
                let data = new logon(item)
                data.save().then(() => {
                    res.render('verifyAccount.pug', { gmail: gmail })
                })
            }
        })
    }
})





//========================================================================================
//                              using multer to store pic
//========================================================================================


let time;      //need this variable 

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/uploads/')
    },
    filename: function (req, file, cb) {
        time = Date.now();
        cb(null, file.fieldname + '-' + time + ".png")
    }
})


let storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'PyAndModel/pic')
    },
    filename: function (req, file, cb) {
        cb(null, 'formodel.jpg')
    }
})

let storage3 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/gallery/')
    },
    filename: function (req, file, cb) {
        time = Date.now();
        cb(null, file.fieldname + '-' + time + ".png")
    }
})

let storage4 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/user/')
    },
    filename: function (req, file, cb) {
        time = Date.now();
        cb(null, "pic" + time + ".png")
    }
})







const fileFilter = (req, file, cb) => {
    if ((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


let upload = multer({ storage: storage, fileFilter: fileFilter })
let upload2 = multer({ storage: storage2, fileFilter: fileFilter })
let upload3 = multer({ storage: storage3, fileFilter: fileFilter })



//========================================================================================
//                               python model run
//========================================================================================

app.post('/picSendFromAjax', upload2.single('picture'), async (req, res) => {
    // PythonShell.run('PyAndModel/transfer_learning_resnet_50.py', {}, function (err, result) {
    //     if (err) throw res.json({ "value": err });
        res.json({ "value": 1 })
    //     console.log(result)
    // });
    // const model = await tf.loadLayersModel('../tfjs/model.json')
})




//========================================================================================
//                               account verify section
//========================================================================================

app.get('/creat_account', (req, res) => {
    res.render("logon.pug")
})


app.get("/checkAccountVerification", async (req, res) => {
    res.render('verifyAccount.pug', { gmail: req.query.gmail })
})

app.post("/checkAccountVerification", async (req, res) => {
    let userlogin = await logon.findOne({ gmail: req.query.mail });
    async function update() {
        await logon.findOneAndUpdate({ gmail: req.query.mail }, { access: 'true' })
    }
    if (userlogin) {
        if (userlogin.access == req.body.verification) {
            update()
            res.render("login.pug")
        } else res.render('verifyAccount.pug', { gmail: req.query.mail, check: "Wrong Verification" })
    } else res.render('verifyAccount.pug', { gmail: req.query.mail, check: "Wrong Verification" })
})




//========================================================================================
//                                    Admin login
//========================================================================================


app.post('/admin/login', async (req, res) => {
    username = req.body.username;
    Password = req.body.Password;
    let userlogin = await logon.findOne({ username: username });
    if (userlogin) {
        if (userlogin.access == 'true') {
            if (userlogin.username == username) {
                if (userlogin.Password == Password) {
                    reportM.find({}).exec(function (err, report_data) {
                        if (err) throw err;
                        gallerypic.find({}).exec(function (err, gallary_data) {
                            if (err) throw err;
                            airticalData.find({}).exec(function (err, airtical_data) {
                                if (err) throw err;
                                community_post.find({}).populate('comment').exec(function (err, All_post) {
                                    if (err) throw err;
                                    logon.find({}).exec(function (err, admin_data) {
                                        if (err) throw err;
                                        if (userlogin.subadmin == 'true') {
                                            res.render('adminControlPanal.pug', { records: airtical_data, reports_records: report_data, pic_records: gallary_data, admin: admin_data, post_data: All_post });
                                        } else res.render('adminControlPanal.pug', { records: airtical_data, reports_records: report_data, pic_records: gallary_data, post_data: All_post });
                                    })
                                })
                            })
                        })
                    })
                } else {
                    res.render("login.pug", { data: "Note::Wrong Password" })
                }
            } else {
                res.render("login.pug", { data: "Note:: User Not match" })
            }
        } else {
            res.render('verifyAccount.pug', { gmail: userlogin.gmail })
        }
    } else {
        res.render("login.pug", { data: "Note:: Wrong UserName & Password" })
    }
})










//========================================================================================
//                                 blog post area
//========================================================================================

app.post('/newpostrequest', upload.single('myimg'), async (req, res) => {
    let username = req.query.username
    let Password = req.query.Password
    let title = req.body.title
    let newposttext = req.body.newposttext
    let myimg = "../images/uploads/" + req.file.fieldname + '-' + time + ".png"
    let picname = req.file.fieldname + '-' + time + ".png"




    let userlogin = await logon.findOne({ username: username });
    if (userlogin) {
        if (userlogin.access == "true") {
            if (userlogin.Password == Password) {
                let item = {
                    title: title,
                    newposttext: newposttext,
                    myimg: myimg,
                    picname: picname,
                }
                var data = new airticalData(item);
                data.save().then(() => {
                    //for show all data from database
                    reportM.find({}).exec(function (err, report) {
                        if (err) throw err;
                        gallerypic.find({}).exec(function (err, gallary_data) {
                            if (err) throw err;
                            airticalData.find({}).exec(function (err, data) {
                                if (err) throw err;
                                res.render('adminControlPanal.pug', { records: data, reports_records: report, pic_records: gallary_data });
                            })
                        })
                    })
                })
            }
        } else {
            res.render('verifyAccount.pug', { gmail: userlogin.gmail })
        }
    }
})









//========================================================================================
//                               delete airticale from data base 
//========================================================================================
app.post('/deleteitem', async (req, res) => {

    let username = req.query.username
    let Password = req.query.Password

    let userlogin = await logon.findOne({ username: username });
    let imgpath
    if (userlogin) {
        if (userlogin.access == "true")
            if (userlogin.Password == Password) {

                await airticalData.findByIdAndDelete({ _id: req.body.id }).exec(function (err, data) {
                    if (err) throw res.json({ data: false });
                    else
                        res.json({ data: true })
                    imgpath = "images/uploads/" + data.picname
                    fs.unlinkSync(imgpath)
                })

            } else res.json({ data: false })
    } else res.json({ data: false })
})


//========================================================================================
//                                    delete pic from gallary
//========================================================================================
app.post('/deletepic', async (req, res) => {

    let username = req.query.username
    let Password = req.query.Password

    let userlogin = await logon.findOne({ username: username });
    let imgpath
    if (userlogin) {
        if (userlogin.access == "true")
            if (userlogin.Password == Password) {

                await gallerypic.findByIdAndDelete({ _id: req.body.id }).exec(function (err, data) {
                    if (err) throw res.json({ data: false });
                    else {
                        //let remove from storage
                        imgpath = 'images/gallery/' + data.picname
                        try {
                            if (fs.existsSync(imgpath)) {
                                fs.unlinkSync(imgpath)
                                res.json({ data: true })
                            }
                        } catch (err) {
                            res.json(err)
                        }
                    }
                })
            } else res.json({ data: false })
    } else res.json({ data: false })
})



//========================================================================================
//                                    delete pic from gallary
//========================================================================================
app.post('/remove_author', async (req, res) => {

    let username = req.query.username
    let Password = req.query.Password

    let userlogin = await logon.findOne({ username: username });
    if (userlogin) {
        if (userlogin.access == "true" && userlogin.Password == Password && userlogin.subadmin == 'true')
            await logon.findByIdAndDelete({ _id: req.body.id }).exec(function (err, data) {
                if (err) throw res.json({ data: false });
                else res.json({ data: true })
            })
    } else res.json({ data: false })
})





//save pic in gallery
app.post('/updatepicture', upload3.single('picture'), async (req, res) => {

    var username = req.query.username
    var Password = req.query.Password

    let userlogin = await logon.findOne({ username: username });
    if (userlogin) {
        if (userlogin.access == "true")
            if (userlogin.Password == Password) {
                var myimg = "../images/gallery/" + req.file.fieldname + '-' + time + ".png"
                var data = await new gallerypic({ name: myimg, picname: req.file.fieldname + '-' + time + ".png" });
                data.save().then(() => {
                    res.json()
                })
            } res.json()
    } res.json()

})



//========================================================================================
//                                        reload page
//========================================================================================
app.get('/admin/login', async (req, res) => {
    username = req.query.username;
    Password = req.query.Password;
    let userlogin = await logon.findOne({ username: username });
    if (userlogin) {
        if (userlogin.access == 'true') {
            if (userlogin.username == username) {
                if (userlogin.Password == Password) {
                    reportM.find({}).exec(function (err, report_data) {
                        if (err) throw err;
                        gallerypic.find({}).exec(function (err, gallary_data) {
                            if (err) throw err;
                            airticalData.find({}).exec(function (err, airtical_data) {
                                if (err) throw err;
                                community_post.find({}).populate('comment').exec(function (err, All_post) {
                                    if (err) throw err;
                                    logon.find({}).exec(function (err, admin_data) {
                                        if (err) throw err;
                                        if (userlogin.subadmin == 'true') {
                                            res.render('adminControlPanal.pug', { records: airtical_data, reports_records: report_data, pic_records: gallary_data, admin: admin_data, post_data: All_post });
                                        } else res.render('adminControlPanal.pug', { records: airtical_data, reports_records: report_data, pic_records: gallary_data, post_data: All_post });
                                    })
                                })

                            })
                        })
                    })
                } else {
                    res.render("login.pug", { data: "Note::Wrong Password" })
                }
            } else {
                res.render("login.pug", { data: "Note:: User Not match" })
            }
        } else {
            res.render('verifyAccount.pug', { gmail: userlogin.gmail })
        }
    } else {
        res.render("login.pug", { data: "Note:: Wrong UserName & Password" })
    }
})



app.get('/newpostrequest', async (req, res) => {
    let username = req.query.username
    let Password = req.query.Password
    let userlogin = await logon.findOne({ username: username });
    if (userlogin) {
        if (userlogin.access == "true") {
            if (userlogin.Password == Password) {
                //for show all data from database
                reportM.find({}).exec(function (err, report) {
                    if (err) throw err;
                    gallerypic.find({}).exec(function (err, gallary_data) {
                        if (err) throw err;
                        airticalData.find({}).exec(function (err, data) {
                            if (err) throw err;
                            res.render('adminControlPanal.pug', { records: data, reports_records: report, pic_records: gallary_data });
                        })
                    })
                })
            }
        } else {
            res.render('verifyAccount.pug', { gmail: userlogin.gmail })
        }
    }
})






//========================================================================================
//                                       User login or logon
//========================================================================================

app.get('/userprofile', async (req, res) => {
    res.render('userlogin.pug')
})
app.get('/userlogon', async (req, res) => {
    res.render('userlogon.pug')
})

//======================User login===============================

app.post('/', async (req, res) => {
    let userlogin = await userlogon.findOne({ gmail: req.query.username });
    if (userlogin) {
        if (userlogin.access == 'true' && userlogin.Password == req.query.Password) {
            await gallerypic.find({}).exec(function (err, pic) {
                if (err) throw err;
                airticalData.find({}).exec(function (err, airticale) {
                    if (err) throw err;
                    res.render('home.pug', { records: airticale, pic: pic, userpic: userlogin.pic, mail: req.query.username, Password: req.query.Password });
                })
            })
        } else if (userlogin.access != 'true') {
            res.render('verifyAccount.pug', { gmail: userlogin.gmail })
        } else res.render("userlogin.pug", { data: "Note:: User Not match" })
    } else res.render("userlogin.pug", { data: "Note:: User Not match" })
})





//create account
app.post("/userlogon/request_to_create_account", async (req, res) => {




    if (req.query.mail) {
        let userlog = await userlogon.findOne({ gmail: req.query.mail });

        if (userlog) {
            //mail already used
            res.render("userlogin.pug", { data: "Note::Mail already Used" })
        } else {

            let storage4 = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, 'images/user/')
                },
                filename: function (req, file, cb) {
                    time = Date.now();
                    cb(null, "pic" + time + ".png")
                }
            })
            const fileFilter = (req, file, cb) => {
                if ((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')) {
                    cb(null, true);
                } else {
                    cb(null, false);
                }
            };
            let upload4 = multer({ storage: storage4, fileFilter: fileFilter }).single('picture')

            upload4(req, res, function (err) {
                if (err) res.render("userlogin.pug", { data: "Note::logon problem try again later" })
                else {
                    let username = req.body.username;
                    let Password = req.body.Password;
                    let gmail = req.body.mail;
                    let pic = "../images/user/" + "pic" + time + ".png"
                    let access = Math.floor(Math.random() * 1000000)+17;
                    //========================================================================================
                    //                                    send mail
                    //========================================================================================
                    var mailBody = {
                        form: 'masterbanns@gmail.com',
                        to: gmail,
                        subject: 'Coffee leaf disease account verification',
                        text: 'Verification code for ' + gmail + '\n ::' + access
                    };
                    let item = {
                        username,
                        Password,
                        gmail,
                        access,
                        pic,
                    }

                    sender.sendMail(mailBody, function (err, info) {
                        if (err) {
                            console.log(err)
                        } else {
                            let data = new userlogon(item)
                            data.save().then(() => {
                                res.render('userVerifyAccount.pug', { gmail: gmail })
                            })
                        }
                    })


                }
            })

        }
    }
})

app.get("/usercheckAccountVerification", async (req, res) => {
    res.render('userVerifyAccount.pug', { gmail: req.query.gmail })
})

app.post("/usercheckAccountVerification", async (req, res) => {
    let userlogin = await userlogon.findOne({ gmail: req.query.mail });
    async function update() {
        await userlogon.findOneAndUpdate({ gmail: req.query.mail }, { access: 'true' })
    }

    async function rend() {
        await gallerypic.find({}).exec(function (err, pic) {
            if (err) throw err;
            airticalData.find({}).exec(function (err, airticale) {
                if (err) throw err;
                res.render('home.pug', { records: airticale, pic: pic, userpic: userlogin.pic, mail: req.query.mail, Password: userlogin.Password });
            })
        })
    }

    if (userlogin) {
        if (userlogin.access == 'true') {
            res.render("userlogin.pug", { data: "Note::Already verifyed" })
        }
        else if (userlogin.access == req.body.verification) {
            update()
            rend()
        } else res.render('verifyAccount.pug', { gmail: req.query.mail, check: "Wrong Verification" })
    } else res.render('verifyAccount.pug', { gmail: req.query.mail, check: "Wrong Verification" })
})



//========================================================================================
//                                    community
//========================================================================================


app.get('/community', async (req, res) => {

    let userlogin = await userlogon.findOne({ gmail: req.query.username });
    await airticalData.find({}).exec(function (err, data) {
        if (err) throw err;
        community_post.find({}).populate('comment').exec(function (err, All_post) {
            if (err) throw err;
            if (userlogin) {

                res.render("Community.pug", { records: data, userpic: userlogin.pic, mail: req.query.username, Password: userlogin.Password, post_data: All_post })


            } else res.render("Community.pug", { records: data, userpic: '../images/user/user.png', post_data: All_post })
        })
    })

})




//========================================================================================
//                                    Add post
//========================================================================================

app.post('/new_post_request_from_user', async (req, res, next) => {

    let gmail = req.query.username;
    let Password = req.query.Password;
    let userlogin = await userlogon.findOne({ gmail });
    let date
    if (userlogin) {
        if (userlogin.gmail == gmail && userlogin.Password == Password && userlogin.access == 'true') {

            let storage5 = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, 'images/community/')
                },
                filename: function (req, file, cb) {
                    date = Date.now();
                    cb(null, "pic" + date + ".png")
                }
            })

            let uploade5 = multer({ storage: storage5 }).single('picture');
            uploade5(req, res, function (err) {
                if (err) res.json({ resdata: 'false' })
                let pic
                if (date) {
                    pic = "../images/community/pic" + date + ".png";
                } else pic = 'null'
                let text = req.body.text
                let username = userlogin.username;
                let userpic = userlogin.pic;
                let time = req.body.time
                let data = {
                    username,
                    gmail,
                    text,
                    pic,
                    userpic,
                    time,
                }
                let save = new community_post(data)
                save.save((err, saved_data) => {
                    date = ''
                    res.json({ resdata: 'true', username: username, post_id: saved_data._id })
                })
            })
        }
    } else res.json({ data: 'false' })
})



//========================================================================================
//                                    Delete Post
//========================================================================================
app.post('/delete_community_post', upload.none(), async (req, res) => {

    let postid = req.body.postid
    let username = req.query.username
    let Password = req.query.Password

    async function delete_this_comment(id) {
        await comment_model.findByIdAndDelete(id).exec(function (err, data) { if (err) console.log(err) })
    }

    let userlogin = await logon.findOne({ username });
    let community_post_all = await community_post.findById(postid);

    if (userlogin) {
        if (userlogin.username == username && userlogin.Password == Password && userlogin.access == 'true') {

            //if here is any comment then first remove it
            if (community_post_all.comment) {
                community_post_all.comment.forEach(e => {
                    delete_this_comment(e._id)
                })
            }

            //and delete the post picture
            //let remove from storage
            let imgpath = community_post_all.pic
            imgpath = imgpath.toString().substring(3);

            try {
                if (fs.existsSync(imgpath)) {
                    fs.unlinkSync(imgpath)
                }
            } catch (err) {
                res.json(err)
            }

            //finally delete post
            community_post.findByIdAndDelete(postid).exec(function (err, data) {
                if (err) res.json({ data: 'false' })
                else res.json({ data: 'true' })
            })
        }
    }




})



//========================================================================================
//                                   Append Comment
//========================================================================================

app.post('/comment', upload.none(), async (req, res) => {

    let gmail = req.query.username
    let time = req.body.time


    let userlogin = await userlogon.findOne({ gmail });
    if (userlogin) {
        if (userlogin.gmail == req.query.username && userlogin.Password == req.query.Password) {

            let comment_username = userlogin.username;
            let comment_user_pic = userlogin.pic;
            let post_id = req.body.id;
            let comment_usermail = req.query.username;  //query string username means user gmail
            let comment_user_text = req.body.text;

            let commentdata = new comment_model({
                comment_usermail,
                comment_user_pic,
                comment_user_text,
                comment_username,
                time,
                id: post_id,
            })
            commentdata.save();
            let community_post_all = await community_post.findById(post_id);
            community_post_all.comment.push(commentdata);

            await community_post_all.save(function (err) {
                if (err) { console.log(err) }
                res.json({ resdata: 'true', commentUserName: userlogin.username })
            })
        }
    } else res.json({ resdata: 'login_error' })
})



//========================================================================================
//                                    Delete Comment
//========================================================================================
app.post('/deleteComment', upload.none(), async (req, res) => {
    let postid = req.body.postid
    let commentid = req.body.commentid
    let username = req.query.username
    let Password = req.query.Password
    let community_post_all = await community_post.findById(postid);

    let userlogin = await logon.findOne({ username });
    if (userlogin) {
        if (userlogin.username == username && userlogin.Password == Password && userlogin.access == 'true') {
            await comment_model.findByIdAndDelete(commentid).exec(function (err, data) {
                if (err) throw res.json({ data: 'false' });
                community_post_all.comment.pull({ _id: commentid })
                community_post_all.save(function (err) {
                    res.json({ data: 'true' })
                })
            })
        } else res.json({ data: 'false' });
    } else res.json({ data: 'Admin Not Found' });

})




//========================================================================================
//                                  User password reset part
//========================================================================================
app.get('/password_reset', async (req, res) => {
    res.render('forgotpassword.pug')
})

app.post('/resetmail', upload.none(), async (req, res) => {
    let usermail = req.body.usermail;
    let userlogin = await userlogon.findOne({ gmail: usermail });
    let access = Math.floor(Math.random() * 1000000);
    async function update() {
        await userlogon.findOneAndUpdate({ gmail: usermail }, { access })
    }

    if (userlogin) {
        let mailBody = {
            form: 'masterbanns@gmail.com',
            to: usermail,
            subject: 'Coffee leaf disease account password reset code',
            text: 'Verification code for ' + usermail + '\n ::' + access
        };
        sender.sendMail(mailBody, function (err, info) {
            if (err) console.log(err)
            else {
                update()
                res.json({ data: 'true' })
            }
        })
    } else res.json({ data: 'user not found' })
})

app.post('/resetcodecheck', upload.none(), async (req, res) => {
    let userlogin = await userlogon.findOne({ gmail: req.query.username });
    if (userlogin && req.body.code) {
        if (userlogin.access == req.body.code) {
            res.json({ data: 'true' });
        } else res.json({ data: 'false' });
    } else res.json({ data: 'Nested State' })
})


app.post('/newpass', upload.none(), async (req, res) => {
    let userlogin = await userlogon.findOne({ gmail: req.query.username });
    if (userlogin && req.query.code) {
        if (userlogin.access == req.query.code) {
            let item = {
                Password: req.body.Password,
                access: 'true',
            }
            await userlogon.findOneAndUpdate({ gmail: req.query.username }, item)
        }
    }
    if (userlogin) {
        await gallerypic.find({}).exec(function (err, pic) {
            if (err) throw err;
            airticalData.find({}).exec(function (err, airticale) {
                if (err) throw err;
                if (userlogin) {
                    res.render('home.pug', { records: airticale, pic: pic, userpic: userlogin.pic, mail: req.query.username, Password: userlogin.Password });
                } else res.render('home.pug', { records: airticale, pic: pic, userpic: '../images/user/user.png' });

            })
        })
    } else {
        await gallerypic.find({}).exec(function (err, pic) {
            if (err) throw err;
            airticalData.find({}).exec(function (err, airticale) {
                if (err) throw err;
                res.render('home.pug', { records: airticale, pic: pic, userpic: '../images/user/user.png' });
            })
        })
    }

})


//Start the server
app.listen(process.env.PORT || 8181, () => {
    console.log(`Running`);
})
