export const welcomeMessageMiddleware = (req, res) => {
  return res.status(200).json({
    success: true,
    message:
      "🚀 Welcome to your Social Network! Let's connect and share great moments! 🚀",
  });
};
