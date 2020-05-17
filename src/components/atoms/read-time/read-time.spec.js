import React from "react"
import { render, fireEvent } from "@testing-library/react"
import ReadTime from "./index"
describe("ReadTime", () => {
  it("renders correctly 1 minute", () => {
    const { getByRole } = render(<ReadTime time="1"/>)
    const info = getByRole('contentinfo', /1 minuto de leitura/i)
  })
  it("renders correctly more 1 minute", () => {
    const { getByRole } = render(<ReadTime time="3"/>)
    const info = getByRole('contentinfo', /3 minutos de leitura/i)
  })
})