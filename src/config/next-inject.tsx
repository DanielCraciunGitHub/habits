// ? Change these details
export const projectName = "PROJECTNAME";

export const siteConfig = {
  email: `danielcracbusiness@gmail.com`,
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://next15template.vercel.app",
  footerText:
    `© ${new Date().getFullYear()} ${projectName}. All Rights Reserved` as const satisfies string,
};
