const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const now = new Date()

  return graphql(
    `{
      allMarkdownRemark(sort: {frontmatter: {date: DESC}}, limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              date(locale: "pt-br", formatString: "DD MMM[,] YYYY")
              rawDate: date
              title
            }
          }
          next {
            fields {
              slug
            }
            frontmatter {
              title
              date(locale: "pt-br", formatString: "DD MMM[,] YYYY")
              rawDate: date
            }
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              title
              date(locale: "pt-br", formatString: "DD MMM[,] YYYY")
              rawDate: date
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) throw result.errors

    // Filter out posts with future dates
    const allPosts = result.data.allMarkdownRemark.edges
    const posts = allPosts.filter(({ node }) => new Date(node.frontmatter.rawDate) <= now)

    // Create blog posts pages with re-linked next and previous
    posts.forEach(({ node }, index) => {
      const next = index === posts.length - 1 ? null : posts[index + 1].node
      const previous = index === 0 ? null : posts[index - 1].node

      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          slug: node.fields.slug,
          previous,
          next
        }
      })
    })

    // Create blog post list pages
    const postsPerPage = 30
    const numPages = Math.ceil(posts.length / postsPerPage)
    const currentDateIso = now.toISOString()

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog/` : `/blog/page/${i + 1}`,
        component: path.resolve('./src/templates/blog-list.js'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          currentDate: currentDateIso
        }
      })
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `blog` })
    createNodeField({
      node,
      name: `slug`,
      value: `blog/${slug.replace('/', '').replace('/', '')}`
    })
  }
};

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    Query: {
      recentPublishedPosts: {
        type: ['MarkdownRemark'],
        resolve: async (source, args, context) => {
          const now = new Date()
          const { entries } = await context.nodeModel.findAll({
            type: 'MarkdownRemark',
            query: {
              sort: {
                fields: ['frontmatter.date'],
                order: ['DESC']
              }
            }
          })
          const filtered = []
          for (const node of entries) {
            const nodeDate = new Date(node.frontmatter.date)
            if (nodeDate <= now) {
              filtered.push(node)
              if (filtered.length === 3) break
            }
          }
          return filtered
        }
      }
    }
  })
}
