import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <ngx-spinner
      bdColor="rgba(51,51,51,0.8)"
      size="medium"
      color="#fff"
      type="ball-scale-multiple"
    >
      <mat-card style="padding: 1rem;">
        <img src="assets/img/logo.svg" alt="#" />
        <!-- <p style="font-size: 20px; color: white">Loading...</p> -->
        <br />
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      </mat-card>
    </ngx-spinner>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'etax-file';
}
