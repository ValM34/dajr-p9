/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { screen, waitFor } from "@testing-library/dom"
import userEvent from '@testing-library/user-event'
import { ROUTES_PATH } from "../constants/routes.js"
import mockStore from '../__mocks__/store.js';
import router from "../app/Router.js";

jest.mock('../app/store', () => mockStore);

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    beforeEach(() => {
      localStorage.setItem("user", JSON.stringify({ type: "Employee", email: "a@a" }));
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.NewBill)
    })
    test("Then mail icon is the active icon on the left menu", () => {
      const mailIcon = screen.getByTestId('icon-mail')
      expect(mailIcon).toHaveClass('active-icon')
    })
    test("Then image input file just accept jpg, jpeg or png format", async () => {
      // When the format is good, the file is uploaded
      const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
      const inputFile = screen.getByTestId("file")
      userEvent.upload(inputFile, file);

      await new Promise(process.nextTick);

      const errorMsgElement = screen.getByTestId("error-msg");
      expect(errorMsgElement).not.toHaveClass('active');
    })
    test("Then image input file rejects on wrong format", async () => {
      // When the format is good, the file is uploaded
      const file = new File(['(⌐□_□)'], 'test.toto', { type: 'image/png' });
      const inputFile = screen.getByTestId("file")
      userEvent.upload(inputFile, file);

      await new Promise(process.nextTick);

      const errorMsgElement = screen.getByTestId("error-msg");
      expect(errorMsgElement).toHaveClass('active');
      expect(inputFile.value).toBe('');
      expect(inputFile.files).toBe(null);
    })
    test("Then I submit a new bill", async () => {
      // First upload a file and then submit the form
      const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
      const inputFile = screen.getByTestId("file")
      userEvent.upload(inputFile, file);

      // Submit form
      const submitButton = screen.getByRole('button', { type: 'submit' })
      userEvent.click(submitButton)

      // Verify if onNavigate was triggered
      await waitFor(() => screen.getByText("Mes notes de frais"))
      expect(window.location.hash).toBe(ROUTES_PATH.Bills)
    })
  })
})
