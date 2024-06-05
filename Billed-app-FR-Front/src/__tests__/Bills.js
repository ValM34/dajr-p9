/**
 * @jest-environment jsdom
 */

import { screen, waitFor } from "@testing-library/dom"
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'
import { localStorageMock } from "../__mocks__/localStorage.js";
import BillsContainer from '../containers/Bills.js';
import { ROUTES_PATH } from "../constants/routes.js"
import mockStore from '../__mocks__/store.js';
import router from "../app/Router.js";

jest.mock('../app/store', () => mockStore);

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", async () => {

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.Bills)
      await waitFor(() => screen.getByTestId('icon-window'))
      const windowIcon = screen.getByTestId('icon-window')
      const expectedClassName = "active-icon";
      expect(windowIcon.classList.contains(expectedClassName)).toBeTruthy();
    })
    test("Then bills should be ordered from earliest to latest", () => {
      const billsToTest = [
        {
          id: '47qAXb6fIm2zOKkLzMro',
          vat: '80',
          fileUrl: 'https://test.storage.tld/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=c1640e12-a24b-4b11-ae52-529112e9602a',
          status: 'pending',
          type: 'Hôtel et logement',
          commentary: 'séminaire billed',
          name: 'encore',
          fileName: 'preview-facture-free-201801-pdf-1.jpg',
          date: '2004-04-04',
          amount: 400,
          commentAdmin: 'ok',
          email: 'a@a',
          pct: 20
        },
        {
          id: 'BeKy5Mo4jkmdfPGYpTxZ',
          vat: '',
          amount: 100,
          name: 'test1',
          fileName: '1592770761.jpeg',
          commentary: 'plop',
          pct: 20,
          type: 'Transports',
          email: 'a@a',
          fileUrl: 'https://test.storage.tld/v0/b/billable-677b6.a…61.jpeg?alt=media&token=7685cd61-c112-42bc-9929-8a799bb82d8b',
          date: '2001-01-01',
          status: 'refused',
          commentAdmin: 'en fait non'
        },
        {
          id: 'UIUZtnPQvnbFnB0ozvJh',
          name: 'test3',
          email: 'a@a',
          type: 'Services en ligne',
          vat: '60',
          pct: 20,
          commentAdmin: "bon bah d'accord",
          amount: 300,
          status: 'accepted',
          date: '2003-03-03',
          commentary: '',
          fileName: 'facture-client-php-exportee-dans-document-pdf-enregistre-sur-disque-dur.png',
          fileUrl: 'https://test.storage.tld/v0/b/billable-677b6.a…dur.png?alt=media&token=571d34cb-9c8f-430a-af52-66221cae1da3'
        },
        {
          id: 'qcCK3SzECmaZAGRrHjaC',
          status: 'refused',
          pct: 20,
          amount: 200,
          email: 'a@a',
          name: 'test2',
          vat: '40',
          fileName: 'preview-facture-free-201801-pdf-1.jpg',
          date: '2002-02-02',
          commentAdmin: 'pas la bonne facture',
          commentary: 'test2',
          type: 'Restaurants et bars',
          fileUrl: 'https://test.storage.tld/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=4df6ed2c-12c8-42a2-b013-346c1346f732'
        }
      ]
      const expectedResult = [
        {
          id: '47qAXb6fIm2zOKkLzMro',
          vat: '80',
          fileUrl: 'https://test.storage.tld/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=c1640e12-a24b-4b11-ae52-529112e9602a',
          status: 'pending',
          type: 'Hôtel et logement',
          commentary: 'séminaire billed',
          name: 'encore',
          fileName: 'preview-facture-free-201801-pdf-1.jpg',
          date: '2004-04-04',
          amount: 400,
          commentAdmin: 'ok',
          email: 'a@a',
          pct: 20
        },
        {
          id: 'UIUZtnPQvnbFnB0ozvJh',
          name: 'test3',
          email: 'a@a',
          type: 'Services en ligne',
          vat: '60',
          pct: 20,
          commentAdmin: "bon bah d'accord",
          amount: 300,
          status: 'accepted',
          date: '2003-03-03',
          commentary: '',
          fileName: 'facture-client-php-exportee-dans-document-pdf-enregistre-sur-disque-dur.png',
          fileUrl: 'https://test.storage.tld/v0/b/billable-677b6.a…dur.png?alt=media&token=571d34cb-9c8f-430a-af52-66221cae1da3'
        },
        {
          id: 'qcCK3SzECmaZAGRrHjaC',
          status: 'refused',
          pct: 20,
          amount: 200,
          email: 'a@a',
          name: 'test2',
          vat: '40',
          fileName: 'preview-facture-free-201801-pdf-1.jpg',
          date: '2002-02-02',
          commentAdmin: 'pas la bonne facture',
          commentary: 'test2',
          type: 'Restaurants et bars',
          fileUrl: 'https://test.storage.tld/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=4df6ed2c-12c8-42a2-b013-346c1346f732'
        },
        {
          id: 'BeKy5Mo4jkmdfPGYpTxZ',
          vat: '',
          amount: 100,
          name: 'test1',
          fileName: '1592770761.jpeg',
          commentary: 'plop',
          pct: 20,
          type: 'Transports',
          email: 'a@a',
          fileUrl: 'https://test.storage.tld/v0/b/billable-677b6.a…61.jpeg?alt=media&token=7685cd61-c112-42bc-9929-8a799bb82d8b',
          date: '2001-01-01',
          status: 'refused',
          commentAdmin: 'en fait non'
        }
      ]
      const billsContainer = new BillsContainer({ document, onNavigate: null, store: null, localStorage: window.localStorage });
      const billsTested = billsContainer.orderBillsByDateAntiChrono(billsToTest);
      expect(billsTested).toEqual(expectedResult);
    })
    describe("When I click on eye icon", () => {
      beforeEach(() => {
        jest.spyOn(mockStore, "bills")
        Object.defineProperty(
            window,
            'localStorage',
            { value: localStorageMock }
        )
        window.localStorage.setItem('user', JSON.stringify({
          type: 'Employee',
          email: "a@a"
        }))
        const root = document.createElement("div")
        root.setAttribute("id", "root")
        document.body.appendChild(root)
        router()
      })
      it("should display an image", async () => {
        const modaleFile = screen.getByTestId('modaleFile')
        $.fn.modal = jest.fn(() => {
          modaleFile.classList.add('show');
        })
        await waitFor(() => screen.getAllByTestId('icon-eye'))
        const eyeIcon = screen.getAllByTestId('icon-eye')
        userEvent.click(eyeIcon[0])
        expect(modaleFile).toHaveClass('show');
      })
    })
  })
})

// test d'intégration GET
describe("Given I am a user connected as Employee", () => {
  describe("When I navigate to Dashboard", () => {
    test("fetches bills from mock API GET", async () => {
      localStorage.setItem("user", JSON.stringify({ type: "Employee", email: "a@a" }));
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.Bills)
      await waitFor(() => screen.getByText("Mes notes de frais"))
      const billsType  = await screen.getByText("Type")
      expect(billsType).toBeTruthy()
      const billsName  = await screen.getByText("Nom")
      expect(billsName).toBeTruthy()
      const billsDate  = await screen.getByText("Date")
      expect(billsDate).toBeTruthy()
      const billsAmount  = await screen.getByText("Montant")
      expect(billsAmount).toBeTruthy()
      const billsStatus = await screen.getByText("Statut")
      expect(billsStatus).toBeTruthy()
      const billsActions = await screen.getByText("Actions")
      expect(billsActions).toBeTruthy()

      expect(screen.getByTestId("btn-new-bill")).toBeTruthy()
    })
  })
  describe("When an error occurs on API", () => {
    beforeEach(() => {
      jest.spyOn(mockStore, "bills")
      Object.defineProperty(
          window,
          'localStorage',
          { value: localStorageMock }
      )
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee',
        email: "a@a"
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.appendChild(root)
      router()
    })
    test("fetches bills from an API and fails with 404 message error", async () => {

      mockStore.bills.mockImplementationOnce(() => {
        return {
          list : () =>  {
            return Promise.reject(new Error("Erreur 404"))
          }
        }})
      window.onNavigate(ROUTES_PATH.Bills)
      await new Promise(process.nextTick);
      const message = await screen.getByText(/Erreur 404/)
      expect(message).toBeTruthy()
    })

    test("fetches messages from an API and fails with 500 message error", async () => {

      mockStore.bills.mockImplementationOnce(() => {
        return {
          list : () =>  {
            return Promise.reject(new Error("Erreur 500"))
          }
        }})

      window.onNavigate(ROUTES_PATH.Bills)
      await new Promise(process.nextTick);
      const message = await screen.getByText(/Erreur 500/)
      expect(message).toBeTruthy()
    })
  })
})
