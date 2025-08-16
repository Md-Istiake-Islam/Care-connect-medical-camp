import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import "dotenv/config";
import Stripe from "stripe";
const stripe = new Stripe(process.env.StripeSecretKey);
const app = express();
const port = process.env.PORT || 5000;

// Setup middleware,
app.use(
   cors({
      origin: [
         "http://localhost:5173",
         "https://careconnect-medicalcapms.web.app",
      ],
      credentials: true,
   })
);
app.use(express.json());
app.use(cookieParser());

// guard for invalid user
const verifyToken = (req, res, next) => {
   const token = req?.cookies?.token;
   if (!token) {
      return res.status(401).send({ message: "unauthorize access" });
   }
   jwt.verify(token, process.env.JWT_ACCESS_SECRET, (error, decoded) => {
      if (error) {
         return res.status(401).send({ message: "unauthorize access" });
      }
      req.decoded = decoded;

      next();
   });
};

//  Setup root Api,
app.get("/", (req, res) => {
   res.send(`Hello, This server is running on the port: ${port}`);
});

// Connect to the mongodb client server,

// Mongodb connection URI,
const uri = process.env.MongoDbUri;

//Create a MongoClient with MongoClientOptions Object to set stable API version
const client = new MongoClient(uri, {
   serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
   },
});

// Connect the client to the server,

const run = async () => {
   //DataBase Collections
   const db = client.db("MedicalCampsDb");

   //Users collection
   const userCollection = db.collection("UserData");

   //Slider items collection
   const sliderCollection = db.collection("BannerSlider");

   //Slider items collection
   const medicalTeamsCollection = db.collection("MedicalTeams");

   //Medical camp items collection
   const campCollection = db.collection("Medical_Camps");

   // Medical camp participants collection
   const participantCollection = db.collection("Camp_Participants");

   // Medical camp participants collection
   const paymentCollection = db.collection("Payment_History");
   // Medical camp participants collection
   const feedBackCollection = db.collection("User_feedback");

   // Middleware to verify if the user is an organizer
   const verifyOrganizer = async (req, res, next) => {
      // check if decoded token has email
      if (!req.decoded || !req.decoded.email) {
         return res.status(403).send({ message: "Forbidden access" });
      }

      // get email from decoded token
      const email = req.decoded.email;

      // set query to find user
      const query = { email: email };

      // check if user is available or not
      const user = await userCollection.findOne(query);
      if (!user) {
         return res.status(403).send({ message: "Forbidden access" });
      }

      // check if user is verifiedOrganizer or not
      if (user?.role !== "Organizer") {
         return res.status(403).send({ message: "Forbidden access" });
      }
      next();
   };

   // Middleware to verify if the user is an Participant
   const verifyParticipant = async (req, res, next) => {
      // check if decoded token has email
      if (!req.decoded || !req.decoded.email) {
         return res.status(403).send({ message: "Forbidden access" });
      }

      // get email from decoded token
      const email = req.decoded.email;

      // set query to find user
      const query = { email: email };

      // check if user is available or not
      const user = await userCollection.findOne(query);
      if (!user) {
         return res.status(403).send({ message: "Forbidden access" });
      }

      // check if user is verifiedParticipant or not
      if (user?.role !== "Participant") {
         return res.status(403).send({ message: "Forbidden access" });
      }
      next();
   };

   try {
      //Api for Jwt Access token
      app.post("/jwt", async (rep, res) => {
         const userData = rep.body;
         const token = jwt.sign(userData, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "5d",
         });
         const isProduction = process.env.NODE_ENV === "production";

         res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "None" : "Lax",
         }).send({ success: true });
      });

      //Api Configuration
      //post users data
      app.post("/users", async (req, res) => {
         //get userData from api
         const userData = req.body;

         //set user role and login info
         userData.role = "Participant";
         userData.created_At = new Date().toISOString();
         userData.last_loggedIn = new Date().toISOString();

         //find user by query;
         const query = {
            email: userData.email,
         };
         //check if there is userData or not
         const alreadyExists = await userCollection.findOne(query);
         if (!!alreadyExists) {
            //create update doc
            const updateDoc = {
               $set: { last_loggedIn: userData.last_loggedIn },
            };
            const result = await userCollection.updateOne(query, updateDoc);
            return res.send(result);
         }

         //insert userData to IB
         const result = await userCollection.insertOne(userData);
         return res.send(result);
      });

      //get users data
      app.get("/users/:email", verifyToken, async (req, res) => {
         // get email
         const email = req.params.email;
         // set query
         const query = { email: email };
         //find data
         const result = await userCollection.findOne(query);
         //send result
         res.send(result);
      });

      //update users data
      app.patch("/update-user/:email", verifyToken, async (req, res) => {
         // get email
         const email = req.params.email;
         const data = req.body;
         // set query
         const query = { email: email };
         //find data
         const result = await userCollection.updateOne(query, { $set: data });
         console.log(result);
         //send result
         res.send(result);
      });

      // get slider data
      app.get("/sliders", async (req, res) => {
         const result = await sliderCollection.find().toArray();
         res.send(result);
      });

      // get medical teams data
      app.get("/medical-teams", async (req, res) => {
         const result = await medicalTeamsCollection.find().toArray();
         res.send(result);
      });

      // post camp data
      app.post("/camps", verifyToken, verifyOrganizer, async (req, res) => {
         const campData = req.body;
         const result = await campCollection.insertOne(campData);
         res.send(result);
      });

      // get all camps data
      app.get("/camps", async (req, res) => {
         const { search = "", sort = "" } = req.query;

         const query = {
            $or: [
               { name: new RegExp(search, "i") },
               { location: new RegExp(search, "i") },
               { healthcareProfessional: new RegExp(search, "i") },
            ],
         };

         const sortOptions = {
            participants: { participantCount: -1 },
            fees: {
               campFees: -1,
            },
            name: { campName: -1 },
            date: { date: -1 },
         };

         const camps = await campCollection
            .find(query)
            .sort(sortOptions[sort] || { _id: -1 })
            .toArray();

         res.send(camps);
      });
      // get popular camps data
      app.get("/popular-camps", async (req, res) => {
         const camps = await campCollection
            .find()
            .sort({ participantCount: -1 })
            .limit(6)
            .toArray();

         res.send(camps);
      });

      //update camp data
      app.patch(
         "/update-camps",
         verifyToken,
         verifyOrganizer,
         async (req, res) => {
            const id = req.query.campId;
            const campData = req.body;

            if (!ObjectId.isValid(id)) {
               return res
                  .status(400)
                  .send({ success: false, message: "Invalid ID format" });
            }

            try {
               const result = await campCollection.updateOne(
                  {
                     _id: new ObjectId(id),
                  },
                  {
                     $set: campData,
                  }
               );

               res.send(result);
            } catch (err) {
               res.status(500).send({
                  error: "Failed to fetch organizer stats",
                  details: err.message,
               });
            }
         }
      );

      //update camp data
      app.delete(
         "/delete-camp",
         verifyToken,
         verifyOrganizer,
         async (req, res) => {
            const id = req.query.campId;

            if (!ObjectId.isValid(id)) {
               return res
                  .status(400)
                  .send({ success: false, message: "Invalid ID format" });
            }

            try {
               const result = await campCollection.deleteOne({
                  _id: new ObjectId(id),
               });

               res.send(result);
            } catch (err) {
               res.status(500).send({
                  error: "Failed to fetch organizer stats",
                  details: err.message,
               });
            }
         }
      );

      // manage all camps
      app.get(
         "/manage-camps",
         verifyToken,
         verifyOrganizer,
         async (req, res) => {
            const reqPage = parseInt(req.query.page);
            const reqLimit = parseInt(req.query.limit);
            const searchTerm = req.query.searchTerm;

            try {
               const query = {};

               if (searchTerm) {
                  query.$or = [
                     { name: new RegExp(search, "i") },
                     { location: new RegExp(search, "i") },
                     { healthcareProfessional: new RegExp(search, "i") },
                  ];
               }

               // get all document count
               const totalCount = await campCollection.countDocuments(query);

               // set limit and skip to get dynamic data
               const limit = !!reqLimit ? reqLimit : 0;
               const skip = !!reqPage ? (reqPage - 1) * limit : 0;

               const camps = await campCollection
                  .find(query)
                  .sort({ _id: -1 })
                  .skip(skip)
                  .limit(limit)
                  .toArray();

               const [campStatus] = await campCollection
                  .aggregate([
                     {
                        $group: {
                           _id: null,
                           totalData: {
                              $sum: 1,
                           },
                           totalParticipant: {
                              $sum: {
                                 $toInt: "$participantCount",
                              },
                           },
                           totalRevenue: {
                              $sum: {
                                 $multiply: [
                                    {
                                       $toInt: "$participantCount",
                                    },
                                    {
                                       $toInt: "$campFees",
                                    },
                                 ],
                              },
                           },
                        },
                     },
                  ])
                  .toArray();

               const [totalConfirm] = await participantCollection
                  .aggregate([
                     {
                        $group: {
                           _id: null,
                           totalConfirm: {
                              $sum: {
                                 $cond: [
                                    {
                                       $eq: [
                                          "$confirmationStatus",
                                          "confirmed",
                                       ],
                                    },
                                    1,
                                    0,
                                 ],
                              },
                           },
                        },
                     },
                  ])
                  .toArray();

               const revenue = {
                  ...campStatus,
                  totalConfirm: totalConfirm.totalConfirm,
               };

               res.send({ camps, totalCount, revenue });
            } catch (err) {
               res.status(500).send({
                  error: "Failed to fetch organizer stats",
                  details: err.message,
               });
            }
         }
      );

      // get single camp data
      app.get("/camp-details", async (req, res) => {
         const id = req.query.id;
         const query = { _id: new ObjectId(id) };
         const result = await campCollection.findOne(query);
         res.send(result);
      });

      // post join camp data
      app.post(
         "/registered-camps",
         verifyToken,
         verifyParticipant,
         async (req, res) => {
            const registeredCamp = req.body;

            // set camp reg date
            const campRegDate = new Date().toISOString();
            const UpdatedRegCamp = {
               ...registeredCamp,
               registeredDate: campRegDate,
               paymentStatus: "unpaid",
               confirmationStatus: "pending",
               canCancel: true,
               feedbackGiven: false,
               rating: null,
            };

            const result = await participantCollection.insertOne(
               UpdatedRegCamp
            );
            if (result.insertedId) {
               // Update the participant count in the camp collection
               const campId = registeredCamp.campId;

               // query to find the camp by ID
               const campQuery = { _id: new ObjectId(campId) };

               // Increment the participant count for the camp
               const isRegistered = await campCollection.updateOne(campQuery, {
                  $inc: { participantCount: 1 },
               });
               if (!isRegistered.modifiedCount > 0) {
                  return res.send({
                     status: 404,
                     success: false,
                     message: "Failed to registered for the camp",
                  });
               }
            }
            res.send(result);
         }
      );

      app.get("/registered-camps", verifyToken, async (req, res) => {
         // get query data
         const email = req.decoded.email;
         const reqPage = parseInt(req.query.page);
         const reqLimit = parseInt(req.query.limit);
         const searchTerm = req.query.searchTerm;

         try {
            // set query to find user
            const query = {
               participantEmail: email,
            };

            if (searchTerm) {
               query.$or = [
                  { campName: { $regex: searchTerm, $options: "i" } },
                  { campLocation: { $regex: searchTerm, $options: "i" } },
               ];
            }

            // set limit and skip to get dynamic data
            const limit = !!reqLimit ? reqLimit : 0;
            const skip = !!reqPage ? (reqPage - 1) * limit : 0;

            // get all document count
            const totalCount = await participantCollection.countDocuments(
               query
            );

            // finally get data and send response
            const result = await participantCollection
               .find(query)
               .sort({ registeredDate: -1 })
               .skip(skip)
               .limit(limit)
               .toArray();

            const [revenue] = await participantCollection
               .aggregate([
                  {
                     $match: {
                        participantEmail: email,
                     },
                  },
                  {
                     $group: {
                        _id: null,
                        totalData: {
                           $sum: 1,
                        },
                        totalPaid: {
                           $sum: {
                              $cond: [
                                 { $eq: ["$paymentStatus", "paid"] },
                                 1,
                                 0,
                              ],
                           },
                        },
                        totalConfirmed: {
                           $sum: {
                              $cond: [
                                 { $eq: ["$confirmationStatus", "confirmed"] },
                                 1,
                                 0,
                              ],
                           },
                        },
                        totalFeedback: {
                           $sum: {
                              $cond: [
                                 { $ifNull: ["$feedbackGiven", false] },
                                 1,
                                 0,
                              ],
                           },
                        },
                        totalPaidAmount: {
                           $sum: {
                              $cond: [
                                 { $eq: ["$paymentStatus", "paid"] },
                                 { $toInt: "$campFees" },
                                 0,
                              ],
                           },
                        },
                     },
                  },
               ])
               .toArray();

            res.send({ data: result, totalCount, revenue });
         } catch (err) {
            res.status(500).send({
               message: "Something went wrong",
               error: err.message,
            });
         }
      });

      app.get(
         "/all-registered-camps",
         verifyToken,
         verifyOrganizer,
         async (req, res) => {
            // get query data
            const reqPage = parseInt(req.query.page);
            const reqLimit = parseInt(req.query.limit);
            const searchTerm = req.query.searchTerm;

            try {
               // set query to find user
               const query = {
                  $or: [
                     { campName: { $regex: searchTerm, $options: "i" } },
                     { campLocation: { $regex: searchTerm, $options: "i" } },
                  ],
               };

               // set limit and skip to get dynamic data
               const limit = !!reqLimit ? reqLimit : 0;
               const skip = !!reqPage ? (reqPage - 1) * limit : 0;

               // get all document count
               const totalCount = await participantCollection.countDocuments(
                  query
               );

               // finally get data and send response
               const result = await participantCollection
                  .find(query)
                  .sort({ registeredDate: -1 })
                  .skip(skip)
                  .limit(limit)
                  .toArray();

               const [revenue] = await participantCollection
                  .aggregate([
                     {
                        $group: {
                           _id: null,
                           totalData: {
                              $sum: 1,
                           },
                           totalPaid: {
                              $sum: {
                                 $cond: [
                                    { $eq: ["$paymentStatus", "paid"] },
                                    1,
                                    0,
                                 ],
                              },
                           },
                           totalConfirmed: {
                              $sum: {
                                 $cond: [
                                    {
                                       $eq: [
                                          "$confirmationStatus",
                                          "confirmed",
                                       ],
                                    },
                                    1,
                                    0,
                                 ],
                              },
                           },
                           totalFeedback: {
                              $sum: {
                                 $cond: [
                                    { $ifNull: ["$feedbackGiven", false] },
                                    1,
                                    0,
                                 ],
                              },
                           },
                        },
                     },
                  ])
                  .toArray();

               res.send({ data: result, totalCount, revenue });
            } catch (err) {
               res.status(500).send({
                  message: "Something went wrong",
                  error: err.message,
               });
            }
         }
      );

      // DELETE registered camp by ID
      app.delete("/registered-camp-delete", verifyToken, async (req, res) => {
         const campId = req?.query?.campId;

         if (!ObjectId.isValid(campId)) {
            return res
               .status(400)
               .send({ success: false, message: "Invalid ID format" });
         }

         try {
            const result = await participantCollection.deleteOne({
               _id: new ObjectId(campId),
            });

            res.send(result);
         } catch (error) {
            res.status(500).send({
               success: false,
               message: "Server error",
            });
         }
      });

      //create payment intent
      app.post(
         "/create-client-intent",
         verifyToken,
         verifyParticipant,
         async (req, res) => {
            const paymentId = req.query.paymentId;

            // find if user available
            const regCamp = await participantCollection.findOne({
               _id: new ObjectId(paymentId),
            });

            // get payment Fee in cents
            const feesInCents = parseInt(regCamp.campFees) * 100;

            //create payment intent
            const { client_secret } = await stripe.paymentIntents.create({
               amount: feesInCents,
               currency: "usd",
               automatic_payment_methods: {
                  enabled: true,
               },
            });
            res.send(client_secret);
         }
      );

      app.post(
         "/payment-history",
         verifyToken,
         verifyParticipant,
         async (req, res) => {
            // get data from query and body
            const orderId = req.query.orderId;
            const transactionDetails = req.body;

            //set query for find data
            const query = {
               _id: new ObjectId(orderId),
            };

            // insert data to paymentCollection
            const result = await paymentCollection.insertOne(
               transactionDetails
            );
            // check if data inserted success or not
            if (!result.acknowledged || !result.insertedId) return;

            // check if payment order available
            const isAvailable = await participantCollection.findOne(query);

            // return if not find
            if (!isAvailable) return;

            // set update fields
            const updateFields = {
               paymentStatus: "paid",
               canCancel: false,
            };

            // try to update data
            const isUpdated = await participantCollection.updateOne(query, {
               $set: updateFields,
            });
            res.send(isUpdated);
         }
      );

      app.patch(
         "/send-feedback",
         verifyToken,
         verifyParticipant,
         async (req, res) => {
            const id = req.query.campId;
            const feedbackData = req.body;

            if (!id || !ObjectId.isValid(id)) {
               return res.status(400).send({
                  success: false,
                  message: "Invalid or missing Registered camp",
               });
            }

            try {
               //set query to find regCamp
               const query = {
                  _id: new ObjectId(id),
               };

               //set update options
               const updateDoc = {
                  $set: {
                     rating: feedbackData?.rating,
                     feedbackGiven: true,
                  },
               };

               // check if regCamp available
               const participant = await participantCollection.findOne(query);
               if (!participant) return;

               // crete feedback data
               const updatedFedData = {
                  participantName: participant?.participantName,
                  participantEmail: participant?.participantEmail,
                  participantPhone: participant?.phone,
                  campName: participant?.campName,
                  campId: participant?.campId,
                  healthPro: participant?.healthPro,
                  campLocation: participant?.campLocation,
                  rating: feedbackData?.rating,
                  feedback: feedbackData?.feedbackGiven,
               };

               //check if feedback data inserted
               const isInserted = await feedBackCollection.insertOne(
                  updatedFedData
               );
               if (!isInserted?.acknowledged || !isInserted?.insertedId) return;

               // update feedback data to participant collection
               const result = await participantCollection.updateOne(
                  query,
                  updateDoc
               );

               res.send(result);
            } catch (err) {
               res.status(500).send({
                  success: false,
                  message: "Server error",
               });
            }
         }
      );

      // get payment history
      app.get(
         "/payment-history",
         verifyToken,
         verifyParticipant,
         async (req, res) => {
            // get query data
            const email = req.decoded.email;
            const reqPage = parseInt(req.query.page);
            const reqLimit = parseInt(req.query.limit);
            const searchTerm = req.query.searchTerm;

            try {
               // set query to find user
               const query = { participantEmail: email };

               if (searchTerm) {
                  query.$or = [
                     { campName: { $regex: searchTerm, $options: "i" } },
                     { campLocation: { $regex: searchTerm, $options: "i" } },
                  ];
               }

               // set limit and skip to get dynamic data
               const limit = !!reqLimit ? reqLimit : 0;
               const skip = !!reqPage ? (reqPage - 1) * limit : 0;

               // get all document count
               const totalCount = await paymentCollection.countDocuments(query);

               // finally get data and send response
               const result = await paymentCollection
                  .find(query)
                  .sort({ paymentDate: -1 })
                  .skip(skip)
                  .limit(limit)
                  .toArray();

               const [revenue] = await paymentCollection
                  .aggregate([
                     {
                        $match: {
                           participantEmail: email,
                        },
                     },
                     {
                        $group: {
                           _id: null,
                           totalData: {
                              $sum: 1,
                           },
                           totalPaid: {
                              $sum: {
                                 $cond: [
                                    { $eq: ["$paymentStatus", "paid"] },
                                    1,
                                    0,
                                 ],
                              },
                           },
                           totalConfirmed: {
                              $sum: {
                                 $cond: [
                                    {
                                       $eq: [
                                          "$confirmationStatus",
                                          "confirmed",
                                       ],
                                    },
                                    1,
                                    0,
                                 ],
                              },
                           },
                           totalPaidAmount: {
                              $sum: {
                                 $cond: [
                                    { $eq: ["$paymentStatus", "paid"] },
                                    { $toInt: "$campFees" },
                                    0,
                                 ],
                              },
                           },
                        },
                     },
                  ])
                  .toArray();
               res.send({ data: result, totalCount, revenue });
            } catch (err) {
               res.status(500).send({
                  message: "Something went wrong",
                  error: err.message,
               });
            }
         }
      );

      // confirm order data
      app.patch(
         "/confirm-order",
         verifyToken,
         verifyOrganizer,
         async (req, res) => {
            const orderId = req.query.orderId;

            // set query to find document
            const query = {
               _id: new ObjectId(orderId),
            };

            const updateDoc = {
               $set: {
                  confirmationStatus: "confirmed",
               },
            };
            const isUpdated = await participantCollection.updateOne(
               query,
               updateDoc
            );
            if (!isUpdated) return;
            const result = await paymentCollection.updateOne(
               {
                  orderId: orderId,
               },
               updateDoc
            );
            res.send(result);
         }
      );

      //user stats
      app.get("/user-stats", verifyToken, async (req, res) => {
         try {
            // get email from token
            const email = req.decoded.email;

            const data = await paymentCollection
               .aggregate([
                  {
                     $match: {
                        participantEmail: email,
                     },
                  },
                  {
                     $addFields: {
                        PaymentDate: { $toDate: "$paymentDate" },
                     },
                  },
                  {
                     $group: {
                        _id: {
                           $dateToString: {
                              format: "%B %d %Y",
                              date: "$PaymentDate",
                           },
                        },
                        sortDate: { $min: "$PaymentDate" },
                        totalPay: {
                           $sum: {
                              $toInt: "$campFees",
                           },
                        },
                     },
                  },
               ])
               .toArray();

            const [stats] = await participantCollection
               .aggregate([
                  {
                     $match: {
                        participantEmail: email,
                     },
                  },
                  {
                     $group: {
                        _id: null,
                        totalRegCamps: {
                           $sum: 1,
                        },
                        totalPaid: {
                           $sum: {
                              $cond: [
                                 {
                                    $eq: ["$paymentStatus", "paid"],
                                 },
                                 1,
                                 0,
                              ],
                           },
                        },
                        totalConfirmed: {
                           $sum: {
                              $cond: [
                                 {
                                    $eq: ["$confirmationStatus", "confirmed"],
                                 },
                                 1,
                                 0,
                              ],
                           },
                        },
                        totalCost: {
                           $sum: {
                              $cond: [
                                 {
                                    $eq: ["$paymentStatus", "paid"],
                                 },
                                 {
                                    $toInt: "$campFees",
                                 },
                                 0,
                              ],
                           },
                        },
                     },
                  },
               ])
               .toArray();
            const paymentStats = data.map((data) => ({
               date: data._id,
               totalPay: data.totalPay,
            }));

            res.send({ paymentStats, stats });
         } catch (err) {
            res.status(500).send({
               message: "Something went wrong",
               error: err.message,
            });
         }
      });

      app.get("/user-feedback", async (req, res) => {
         const result = await feedBackCollection
            .find()
            .sort({ _id: -1 })
            .limit(6)
            .toArray();

         const [feedbackStats] = await feedBackCollection
            .aggregate([
               {
                  $group: {
                     _id: null,
                     averageRatings: { $avg: "$rating" },
                     totalFeedback: { $sum: 1 },
                  },
               },
               {
                  $sort: {
                     averageRatings: -1,
                  },
               },
               {
                  $project: {
                     _id: 0,
                     totalFeedback: 1,
                     averageRatings: { $round: ["$averageRatings", 1] },
                  },
               },
            ])
            .toArray();

         res.send({ result, feedbackStats });
      });

      app.get("/top-impact", async (req, res) => {
         const [totalCamp] = await campCollection
            .aggregate([
               {
                  $group: {
                     _id: null,
                     camps: {
                        $sum: 1,
                     },
                     doctors: { $addToSet: "$healthPro" },
                     participantCount: {
                        $sum: "$participantCount",
                     },
                  },
               },
               {
                  $project: {
                     _id: 0,
                     camps: 1,
                     uniqueDoctorCount: { $size: "$doctors" },
                     participantCount: 1,
                  },
               },
            ])
            .toArray();

         res.send(totalCamp);
      });

      // Check the express server is connected successfully to the MongoDB using MongoClient with Ping command
      await client.db("admin").command({ ping: 1 });
      console.log(
         "Pinged your deployment. You are successfully connected to MongoDB!"
      );
   } finally {
   }
};

run().catch(console.dir);

//listen to the server
app.listen(port, () => {
   console.log(`server is running on the ${port}`);
});
