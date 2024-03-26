import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactInfoService } from '../../services/contact-info.service';
import { SharedContactInfoService } from '../../services/shared-contact-info.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  idInfoForm!: FormGroup;
  loading: boolean = false;
  docTypes = [""];
  infoToSearch = {
    docType: "",
    idNumber: ""
  };

  constructor(
    private formBuilder: FormBuilder,
    private contactInfoService: ContactInfoService,
    private dataService: SharedContactInfoService,
    private router: Router
  ) {
    this.createIdInfoForm();
    this.docTypes = ["Cédula de ciudadanía", "Pasaporte"];
  }

  createIdInfoForm() {
    this.idInfoForm = this.formBuilder.group({
      selectedDocType: ["", Validators.required],
      idNumber: ["", Validators.required]
    });
  }

  async onSubmit() {
    this.loading = true;
    this.infoToSearch.docType = this.idInfoForm.value.selectedDocType.charAt(0);
    this.infoToSearch.idNumber = this.idInfoForm.value.idNumber;
    await this.getPersonInfoByIdNumber(this.infoToSearch.docType, this.infoToSearch.idNumber);
  }

  async getPersonInfoByIdNumber(type: string, number: string) {
    try {
      const response = await this.contactInfoService.getPersonInfo(type, number);
      this.dataService.setResponseData(response);
      this.router.navigate(['/identificacion']);
      console.log('Respuesta:', response);
    } catch (error) {
      console.error('Error:', error);
      let responseError = error;
      await this.showErrorBySA2(responseError)
    } finally {
      this.loading = false;
    }
  }

  async showErrorBySA2(estado: any) {
    let statusCode = estado.status;
    let errorMessage = estado.error;
    let errorTittle = "";
    let errorIcon: any;

    switch (statusCode) {
      case 400:
        errorTittle = "Error en la solicitud";
        errorIcon = 'warning';
        break;
      case 404:
        errorTittle = "No encontrado";
        errorIcon = 'question';
        break;
      case 500:
        errorTittle = "Error interno";
        errorIcon = 'error';
        break;
      default:
        errorTittle = "Error"
        errorIcon = 'error';
        break;
    }

    await Swal.fire({
      title: errorTittle,
      text: errorMessage,
      icon: errorIcon
    });
  }
}
