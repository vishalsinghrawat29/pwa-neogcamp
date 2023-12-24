import webpush from "web-push";

const publicVapidKey =
  "BKM8BG7SwHezDaaAc21FjXqUZDEuzaZzsanSWR324g2xn4Bun3De1b1LXpNX3kU5B74mSuxWxU0dczu19dJF4WA";
const privateVapidKey = "u0kzxNb_FJODpYrjKzypqhnwkPLmHVY4mDfVHg5CDZg";

export default (): void => {
  webpush.setVapidDetails(
    "mailto:test@test.com",
    publicVapidKey,
    privateVapidKey
  );
};
