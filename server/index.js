const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 2000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors")
var jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173',],
    credentials: true
}));



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fzz1qah.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).send({ "message": "unOthurized" })
    }
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decode) => {
        if (err) {
            res.status(403).send({ "message": "token expired" })
        }
        req.user = decode
        next();
    })
}



async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const dataBase = client.db("PercelDelivery");
        const userList = dataBase.collection("users");
        const parcelBookedLiist = dataBase.collection("bookedList");
        const delivaryManList = dataBase.collection("delivaryMans");
        const deliveredList = dataBase.collection("delivered");

        //verify admin
        const verifyAdmin = async (req, res, next) => {
            try {
                const email = req.user.email;
                const query = { email: email };
                const user = await userList.findOne(query);
                const isAdmin = user?.userType === 'admin';
                if (!isAdmin) {
                    return res.status(403).send({ message: 'forbidden access' });
                }
                next();
            } catch (err) {
                res.status(402).send({ err })
            }
        }

        //get admin
        app.get("/user/admin", verifyToken, async (req, res) => {
            try {
                if (req.user.email !== req.query.email) {
                    res.status(404).send({ message: "unOthorize person" });
                }
                const user = await userList.findOne({ email: req.query.email });
                let admin = false;
                if (user) {
                    admin = user?.userType === 'admin';
                }
                res.send({ admin });
            } catch (err) {
                res.status(402).send({ err })
            }
        })

        app.get("/user/deliveryMan", verifyToken, async (req, res) => {
            try {
                if (req.user.email !== req.query.email) {
                    res.status(404).send({ message: "unOthorize person" });
                }
                const user = await userList.findOne({ email: req.query.email });
                let deliveryMan = false;
                if (user) {
                    deliveryMan = user?.userType === 'deliveryMan';
                }
                res.send({ deliveryMan });
            } catch (err) {
                res.status(402).send({ err })
            }
        })



        //get all users
        app.get("/allUsers", verifyToken, verifyAdmin, async (req, res) => {
            try {
                const limit = parseInt(req.query.limit);
                const pagenumber = parseInt(req.query.pageNumber);
                const result = await userList.find().skip((pagenumber - 1) * limit).limit(limit).toArray();
                const userLen = await userList.countDocuments();
                res.status(200).send({ data: result, len: userLen })
            } catch (err) {
                res.status(402).send({ err })
            }
        })

        app.put("/adduser", async (req, res) => {
            try {
                const filter = { email: req.body.email };
                const options = { upsert: true };
                const updateDoc = {
                    $set: req.body
                };
                const result = await userList.updateOne(filter, updateDoc, options);
                res.status(200).send(result)
            }
            catch (err) {
                res.status(402).send({ err })
            }
        })

        // add new food
        app.post("/newBook", async (req, res) => {
            try {
                const result = await parcelBookedLiist.insertOne(req.body);
                res.status(200).send(result)
            } catch (err) {
                res.status(402).send({ err })
            }
        })

        //get data by specifiq user
        app.get("/booked", verifyToken, async (req, res) => {
            try {
                if (req.user.email !== req.query.email) {
                    res.status(404).send({ message: "unOthorize person" });
                }
                const result = await parcelBookedLiist.find({ userEmail: req.query.email }).toArray();
                res.status(200).send(result)
            } catch (err) {
                res.status(402).send({ err })
            }
        })

        //get booked Data by _id
        app.get("/bookedUser/:id", verifyToken, async (req, res) => {
            try {
                const result = await parcelBookedLiist.findOne({ _id: new ObjectId(req.params.id) })
                res.status(200).send(result)
            } catch (err) {
                res.status(402).send({ err })
            }
        })

        //get deliveryman data
        app.get("/delivaryMan/:id", verifyToken, async (req, res) => {
            try {
                const result = await delivaryManList.findOne({ _id: new ObjectId(req.params.id) })
                res.status(200).send(result)
            } catch (err) {
                res.status(402).send({ err })
            }
        })

        //booked parcel length by user
        app.get('/bookedLen/:email', async (req, res) => {
            try {
                const result = await parcelBookedLiist.countDocuments({ email: req.params.email })
                res.status(200).send(40)
            } catch (err) {
                res.status(402).send({ err })
            }
        })

        //update parcel info
        app.put("/updateBook", verifyToken, async (req, res) => {
            try {
                const filter = { _id: new ObjectId(req.body.id) };
                const updateDoc = {
                    $set: req.body,
                };
                const result = await parcelBookedLiist.updateOne(filter, updateDoc);
                res.status(200).send(result)
            } catch (err) {
                res.status(402).send({ err })
            }
        })


        //delete booke
        app.delete("/deleteBook", verifyToken, async (req, res) => {
            try {
                
                const result = await parcelBookedLiist.deleteOne({ _id: new ObjectId(req.query.id) })
                res.status(200).send(result)
            } catch (err) {
                res.status(402).send({ err })
            }
        })

        //get User Details
        app.get('/userDetails', verifyToken, async (req, res) => {
            try {
                if (req.user.email !== req.query.email) {
                    res.status(404).send({ message: "unOthorize person" });
                }
                const result = await userList.findOne({ email: req.query.email })
                res.status(200).send(result)
            } catch (err) {
                res.status(402).send({ err })
            }
        })

        //get all deliveryMan
        app.get('/allDeliveryMan', verifyToken, verifyAdmin, async (req, res) => {
            try {
                const result = await userList.find({ userType: 'deliveryMan' }).toArray()
                res.status(200).send(result)
            } catch (err) {
                res.status(402).send({ err })
            }
        })

        //get daliverymanBooked length
        app.put("/updateDelivaryMan", async (req, res) => {
            try {
                const filter = { dEmail: req.body.dEmail }
                const options = { upsert: true };
                const updateDoc = {
                    $set: req.body
                };
                const result = await delivaryManList.updateOne(filter, updateDoc, options)
                res.status(200).send(result)
            } catch (err) {
                res.status(402).send({ err })
            }
        })

        //delete one delivary man
        app.delete("/removeDelivaryMan/:email", verifyToken, verifyAdmin, async (req, res) => {
            try {
                const filter = { dEmail: req.params.email }
                const result = await delivaryManList.deleteOne(filter)
                res.status(200).send(result)
            } catch (err) {
                res.status(402).send({ err })
            }
        })

        //get all delivary man
        app.get("/allDelivaryMan", verifyToken, verifyAdmin, async (req, res) => {
            try {
                const result = await delivaryManList.find().toArray();
                res.status(200).send(result)
            } catch (err) {
                res.status(402).send({ err })
            }
        })

        //get requeted date wise parcels
        app.get('/allParcelList/:startDate/:endDate', verifyToken, verifyAdmin, async (req, res) => {
            try {
                const startDate = parseInt(req.params.startDate);
                const endDate = parseInt(req.params.endDate);
                if (startDate == 0 || endDate == 0) {
                    const result = await parcelBookedLiist.find().toArray();
                    res.status(200).send(result)
                }
                else {
                    const result = await parcelBookedLiist.find({ $and: [{ reqDate: { $lte: endDate } }, { reqDate: { $gte: startDate } }] }).toArray();
                    //{ reqDate: { $lte: parseInt(endDate)}, reqDate: { $gte: parseInt(startDate)} }
                    res.status(200).send(result);
                }

            } catch (err) {
                res.status(402).send({ err })
            }
        })

        app.get("/adminDashboard", verifyToken, verifyAdmin, async (req, res) => {
            try {
                const bookedlist = await parcelBookedLiist.find().toArray();
                const userLen = await userList.countDocuments();
                res.status(200).send({ bookedlist, userLen })
            } catch (err) {
                res.status(402).send({ err })
            }
        })

        //get homne page information 

        app.get("/homePage", async (req, res) => {
            try {
                const parcelRunnigLen = await parcelBookedLiist.countDocuments();
                const userLen = await userList.countDocuments();
                const bookedLen = await deliveredList.countDocuments()
                res.status(200).send({ parcelRunnigLen, userLen, bookedLen })
            } catch (err) {
                res.status(402).send({ err })
            }
        })

        //get deliveryman info
        app.get('/deliveryManInfo/:email', verifyToken, async (req, res) => {
            try {
                if (req.user.email !== req.params.email) {
                    res.status(404).send({ message: "unOthorize person" });
                }
                const result = await delivaryManList.findOne({ dEmail: req.params.email })
                res.status(200).send(result)
            } catch (err) {
                res.status(402).send({ err })
            }
        })

        //get deliveryData by deliveryMans
        app.get('/runningDeliveryDatas/:email', verifyToken, async (req, res) => {
            try {
                if (req.user.email !== req.params.email) {
                    res.status(404).send({ message: "unOthorize person" });
                }
                const result = await parcelBookedLiist.find({ deliveryMan: req.query.id }).toArray()
                res.status(200).send(result)
            } catch (err) {
                res.status(402).send({ err })
            }
        })











        //create jwt token
        app.put("/crtJwt", async (req, res) => {
            const token = jwt.sign(req.body, process.env.JWT_TOKEN_SECRET, { expiresIn: '5h' });
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                // sameSite: 'none'
            }).send({ message: "token created success" })
        })


        //delete jwt token
        app.put("/dltJwt", async (req, res) => {
            res.clearCookie("token").send({ message: "token delete success" })
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);



app.listen(port, () => {
    console.log(`your server : http://localhost:${port}`)
})