import { Component } from '@angular/core';
import { AdminserviceService } from 'src/app/Services/adminservice.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  totalBadgeCount: number = 0;
  name: any;
  lname: any;
  constructor(private adminService: AdminserviceService) {
    this.name = localStorage.getItem('first_name');
    this.lname = localStorage.getItem('last_name');

  }

  ngOnInit() {
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', (event: Event) => {
        event.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled').toString());
      });

      const storedSidebarToggle = localStorage.getItem('sb|sidebar-toggle');
      if (storedSidebarToggle === 'true') {
        document.body.classList.add('sb-sidenav-toggled');
      }
    }
  }

  logOut() {

    this.adminService.logout();

  }
}
