import React from "react"
import { render } from "@testing-library/react"
import Icon from "./icon"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

describe("Icon", () => {
  it("renders correctly", () => {
    const { container } = render(<Icon source={faPlus}/>)
    expect(container.querySelector('.fa-plus')).not.toBeNull()
  })
})
