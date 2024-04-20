import { Component, OnInit, Inject, ElementRef, ViewChild  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-privacy-modal',
  templateUrl: './privacy-modal.component.html',
  styleUrls: ['./privacy-modal.component.scss']
})
export class PrivacyModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PrivacyModalComponent>) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.dialogRef.close();
  }
  scrollTo(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }

}
