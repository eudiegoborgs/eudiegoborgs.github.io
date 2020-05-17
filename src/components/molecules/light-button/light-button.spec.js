import React from "react"
import { render, fireEvent } from "@testing-library/react"
import LightButton from "./index"
describe("LightButton", () => {
  it("renders correctly", () => {
    const { getByRole } = render(<LightButton />)
    const button = getByRole('button')
  })

  it("Click event change title", () => {
    const { getByRole, getByTitle, container } = render(<LightButton />)
    const icon = getByTitle('Apagar a luz')
    expect(icon.title).toBe('Apagar a luz')

    fireEvent.click(getByRole('button'))
    expect(icon.title).toBe('Acender a luz')

    fireEvent.click(getByRole('button'))
    expect(icon.title).toBe('Apagar a luz')
  })
})