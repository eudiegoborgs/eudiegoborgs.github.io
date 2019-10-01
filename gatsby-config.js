module.exports = {
  siteMetadata: {
    title: `<DiegoBorgs />`,
    description: `I am a Information Systems Students in the Catholic University of Minas Gerais (PUC Minas), with complementary expertise in Programming, Graphic Design and Music. Web and Mobile Developer in MaxMilhas and love to know new things.`,
    author: `@eudiegoborgs`,
    wakatimeToken: `PkWSK58BpeU6GHyuaTMJChHj`,
    wakatimeSecret: `sec_tXCtNKXp0qizbz2XPyBzHGOA1J2Ku1gdbYgpcBDZEy0qKgVDqNr0l35etEwjI2tvYCkcx2QXDnbm7frH`
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#212121`,
        theme_color: `#212121`,
        display: `minimal-ui`,
        icon: `src/images/db-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
