import React from "react"
import { render } from "@testing-library/react"
import BrandName from "./brand-name"
import { StaticQuery } from "gatsby" // mocked

beforeEach(() => {
  StaticQuery.mockImplementationOnce(({ render }) =>
    render({
      site: {
        siteMetadata: {
          title: 'Titulo de teste'
        }
      }
    })
  )
})
describe("BrandName", () => {
  it("renders correctly", () => {
    const { getByText } = render(<BrandName />)
    const title = getByText('Titulo de teste')
  })
})
