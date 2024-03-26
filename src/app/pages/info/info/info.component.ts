import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedContactInfoService } from '../../../services/shared-contact-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent{

  information!: any;

  constructor(private dataService: SharedContactInfoService,
    private router: Router) { 
      const responseData = this.dataService.getResponseData();
      this.information = responseData;
      this.saveInformation()
    }

  goToHome() {
    this.router.navigate(['/']);
  }

  saveInformation() {
    this.dataService.setResponseData(this.information);
  }
}
