import React from "react"
import { render } from "@testing-library/react"
import TypeWritter from "./typewritter"

describe("TypeWritter", () => {
  it("renders correctly", () => {
    const { container } = render(<TypeWritter words={['Writing code with love']} />)
    expect(container.querySelector('.Typewriter')).not.toBeNull()
  })
})