// terms-modal.component.ts
import { Component, OnInit, Inject, ElementRef, ViewChild  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-terms-modal',
  templateUrl: './terms-modal.component.html',
  styleUrls: ['./terms-modal.component.scss']
})
export class TermsModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TermsModalComponent>) { }

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

