// ? Change these details
export const projectName = "Habit Tracker";

// TODO: Change these details
export const siteConfig = {
  email: `danielcracbusiness@gmail.com`,
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://habit-tracker-brown.vercel.app",
  footerText:
    `© ${new Date().getFullYear()} ${projectName}. All Rights Reserved` as const satisfies string,
};
