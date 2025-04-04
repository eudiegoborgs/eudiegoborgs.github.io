import React from "react"
import { render } from "@testing-library/react"
import SwitchInput from "./switch-input"
describe("SwitchInput", () => {
  it("renders correctly", () => {
    const { container, rerender } = render(<SwitchInput />)
    expect(container.firstChild.classList.contains('fa-toggle-off')).toBe(true)
    expect(container.firstChild.classList.contains('fa-toggle-on')).toBe(false)
    rerender(<SwitchInput on={1} />)
    expect(container.firstChild.classList.contains('fa-toggle-off')).toBe(false)
    expect(container.firstChild.classList.contains('fa-toggle-on')).toBe(true)
  })
})
