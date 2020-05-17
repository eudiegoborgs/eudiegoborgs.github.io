import React from "react"
import { render, fireEvent } from "@testing-library/react"
import Icon from "./index"
describe("Icon", () => {
  it("renders correctly", () => {
    const { container, rerender } = render(<Icon source="plus"/>)
    expect(container.firstChild.classList.contains('fa-plus')).toBe(true)
  })
})