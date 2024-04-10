import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  // // this fux are in the layout.component.ts not yet refactored
  // // because of rapid development
  // userList: any[] = [];
  // constructor(private userSrv: UserService) {}
  // ngOnInit() {
  //   this.getUsers();
  // }
  // getUsers() {
  //   this.userSrv.getUsers().subscribe((res: any) => {
  //     this.userList = res.data;
  //   });
  // }
}
