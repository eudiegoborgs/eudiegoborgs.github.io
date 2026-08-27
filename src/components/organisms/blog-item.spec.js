import React from "react"
import { render } from "@testing-library/react"
import BlogItem from "./blog-item"

describe("BlogItem", () => {
  const mockContent = {
    frontmatter: {
      title: "Test Post Title",
      date: "01 de Janeiro de 2026",
    },
    fields: {
      slug: "blog/test-post",
      readingTime: {
        minutes: 5,
        text: "5 min read",
      },
    },
    excerpt: "Este é um resumo de teste para o post do blog.",
  }

  it("renders title, date, read time and excerpt", () => {
    const { getByText } = render(<BlogItem content={mockContent} />)

    expect(getByText("Test Post Title")).toBeTruthy()
    expect(getByText(/01 de Janeiro de 2026/i)).toBeTruthy()
    expect(getByText("Este é um resumo de teste para o post do blog.")).toBeTruthy()
  })

  it("renders correctly without excerpt", () => {
    const contentWithoutExcerpt = { ...mockContent, excerpt: undefined }
    const { getByText, queryByText } = render(<BlogItem content={contentWithoutExcerpt} />)

    expect(getByText("Test Post Title")).toBeTruthy()
    expect(queryByText("Este é um resumo de teste para o post do blog.")).toBeNull()
  })
})
