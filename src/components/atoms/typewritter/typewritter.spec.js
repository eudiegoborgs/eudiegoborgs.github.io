import React from "react"
import { render } from "@testing-library/react"
import TypeWritter from "./index"
describe("TypeWritter", () => {
  it("renders correctly", () => {
    const { getByRole } = render(<TypeWritter />)
    const title = getByRole('heading', /Writing code with love/i)
  })
})