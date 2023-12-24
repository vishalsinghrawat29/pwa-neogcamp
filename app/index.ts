import express from "express";
import path from "path";
import bodyParser from "body-parser";
import webpush, { SendResult } from "web-push";
import initWebPush from "../config/webpush";

export interface ISubscription extends Document {
  endpoint: string;
  expirationTime?: number;
  keys: {
    auth: string;
    p256dh: string;
  };
}

const LOCAL_STORAGE = {
  SUBSCRIPTIONS: [] as ISubscription[],
};

const app = express();
const port = 8080; // default port to listen

// Serve all files in client
app.use(express.static(path.join(__dirname, "../client")));
app.use(bodyParser.json());

app.post("/subscription", async (req, res, next) => {
  try {
    const subscription = req.body;

    LOCAL_STORAGE.SUBSCRIPTIONS.push(subscription);
    console.log("User subscribed", subscription);

    // Send 201 - resource created
    res.status(201).json({ status: "okay" });
  } catch (e) {
    next(e);
  }
});

app.get("/broadcast", async (_req, res, next) => {
  try {
    const notification = {
      title: "Hey, there is a exiciting offer for you",
      body: "🌇😃🍈😆🍜🍻😋⛅⛳😚",
    };

    const subscriptions = LOCAL_STORAGE.SUBSCRIPTIONS;

    const notifications: any[] = [];
    subscriptions.forEach((subscription) => {
      notifications.push(
        webpush.sendNotification(subscription, JSON.stringify(notification))
      );
    });
    await Promise.all(notifications);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

initWebPush();

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
