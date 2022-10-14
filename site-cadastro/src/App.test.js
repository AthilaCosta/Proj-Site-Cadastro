/* eslint-disable jest/valid-expect */

import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Inicio from './componentes/Inicio'



describe('teste inicio', () => {

  it("Não aparece o botão cancelar", () => {
    render(<Inicio />)
    const buttonCancel = screen.queryByRole("cancelarEdit")
    expect(buttonCancel).not.toBeInTheDocument()
  })

  it("O botão cancelar aparce", () => {
    render(<Inicio />)
    const butonnEdit = screen.queryByRole("editar")
    const butonnCancel = screen.queryByRole("ancelarEdit")
    userEvent.click(butonnEdit)
    expect(butonnCancel).not.toBeInTheDocument()
  })

  it("O botão editar está na tela", () => {
    render(<Inicio />)
    const buttonEdit = screen.queryByRole("editar")
    expect(buttonEdit).toBeInTheDocument();
  })

  it("chamando a função", () => {
    render(<Inicio />)
    const buttonEdit = screen.queryByRole("editar")
    fireEvent.click(buttonEdit)
    expect(screen.queryByText(/editar/i))
  })

  it("O botão salvar está travado", () => {
    render(<Inicio />)
    expect(screen.getByRole("salvar")).toBeDisabled()
  })

  it("O botão editar está destravando", () => {
    render(<Inicio />)
    const butonnEdit = screen.queryByRole("editar")
    userEvent.click(butonnEdit)
    expect(screen.getByRole("salvar")).not.toBeDisabled()
  })
  it("Os input estão travando", () => {
    render(<Inicio />)
    const butonnEdit = screen.queryByRole("editar")
    userEvent.click(butonnEdit)
    expect(screen.getByRole("nome")).not.toBeDisabled()
  })
  it("O input só recebe numero", () => {
    render(<Inicio />)
    const inputIdade = screen.queryByRole("idade")
    expect(inputIdade.value).toBe("")
    fireEvent.change(inputIdade, {target: {value: "a"}})
    expect(inputIdade.value).toBe("")
  })
})