/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `<DiegoBorgs />`,
    description: `I am a Information Systems Students in the Catholic University of Minas Gerais (PUC Minas), with complementary expertise in Programming, Graphic Design and Music. Software Engineer at PicPay and love to know new things.`,
    author: `@eudiegoborgs`,
    siteUrl: `https://diegoborgs.com`,
    social: {
      twitter: `eudiegoborgs`,
      github: `eudiegoborgs`,
      linkedin: `eudiegoborgs`,
    },
  },
  plugins: [
    "gatsby-plugin-netlify-cms", 
    {
      resolve: "gatsby-plugin-emotion",
      options: {
        sourceMap: true,
        autoLabel: "dev-only",
        labelFormat: "[local]",
        cssPropOptimization: true,
      },
    },
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: ['UA-149356099-1'], // Substitua pelo seu ID do Google Analytics
        pluginConfig: {
          head: true, // Define se o script será carregado no <head> da página
        },
      },
    }, 
    "gatsby-plugin-image", 
    "gatsby-plugin-sitemap", 
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: `gatsby-starter-default`,
        short_name: `DiegoBorgs`,
        start_url: `/`,
        background_color: `#212121`,
        theme_color: `#212121`,
        display: `minimal-ui`,
        icon: `src/images/db-icon.png`,
      }
    }, 
    "gatsby-plugin-mdx", 
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-reading-time`,
        ],
      },
    },
    "gatsby-plugin-sharp", 
    "gatsby-transformer-sharp", 
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    }, 
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: "./blog",
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    }
  ]
};
