import React from "react"
import { render } from "@testing-library/react"
import TypeWritter from "./index"
describe("TypeWritter", () => {
  it("renders correctly", () => {
    const { getByRole } = render(<TypeWritter words={['Writing code with love']} />)
    const title = getByRole('heading', /Writing code with love/i)
  })
})