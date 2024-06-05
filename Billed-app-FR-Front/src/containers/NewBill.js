import { ROUTES_PATH } from '../constants/routes.js'
import Logout from "./Logout.js"

export default class NewBill {
  constructor({ document, onNavigate, store, localStorage }) {
    this.document = document
    this.onNavigate = onNavigate
    this.store = store
    const formNewBill = this.document.querySelector(`form[data-testid="form-new-bill"]`)
    formNewBill.addEventListener("submit", this.handleSubmit)
    const file = this.document.querySelector(`input[data-testid="file"]`)
    file.addEventListener("change", this.handleChangeFile)
    this.fileUrl = null
    this.fileName = null
    this.billId = null
    new Logout({ document, localStorage, onNavigate })
  }
  // Verify if the file is an image
  handleChangeFile = e => {
    e.preventDefault()
    const fileInput = this.document.querySelector(`input[data-testid="file"]`);
    const file = this.document.querySelector(`input[data-testid="file"]`).files[0]
    const fileExtension = file.name.split('.').pop();
    const errorMsg = this.document.querySelector('p[data-testid="error-msg"]');
    if (!['jpg', 'jpeg', 'png'].includes(fileExtension)) {
      errorMsg.classList.add('active');
      fileInput.value = '';
      fileInput.files = null;
    } else {
      errorMsg.classList.remove('active');
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    const file = this.document.querySelector(`input[data-testid="file"]`).files[0]
    if(file) {
      const fileName = file.name
      const formData = new FormData()
      const email = JSON.parse(localStorage.getItem("user")).email
      formData.append('file', file)
      formData.append('email', email)
      formData.append('type', e.target.querySelector(`select[data-testid="expense-type"]`).value)
      formData.append('name',  e.target.querySelector(`input[data-testid="expense-name"]`).value)
      formData.append('amount', parseInt(e.target.querySelector(`input[data-testid="amount"]`).value))
      formData.append('date',  e.target.querySelector(`input[data-testid="datepicker"]`).value)
      formData.append('vat', e.target.querySelector(`input[data-testid="vat"]`).value)
      formData.append('pct', parseInt(e.target.querySelector(`input[data-testid="pct"]`).value) || 20)
      formData.append('commentary', e.target.querySelector(`textarea[data-testid="commentary"]`).value)
      formData.append('fileUrl', this.fileUrl)
      formData.append('fileName', this.fileName)
      formData.append('status', 'pending')
  
      this.store
        .bills()
        .create({
          data: formData,
          headers: {
            noContentType: true
          }
        })
        .then(({fileUrl, key}) => {
          this.billId = key
          this.fileUrl = fileUrl
          this.fileName = fileName
          this.onNavigate(ROUTES_PATH['Bills'])
        }).catch(error => console.error(error))
  
    }
  }
}