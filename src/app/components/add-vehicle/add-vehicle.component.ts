import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css',
})
export class AddVehicleComponent {
  @Input() registerVehicleObj: any;
  @Output() registerSubmit = new EventEmitter<any>();

  router = inject(Router);
  toastr = inject(ToastrService);

  constructor(private userSrv: UserService) {}

  ngOnInit() {
    this.isAuthenticated();
  }

  isAuthenticated() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  onSubmit() {
    console.log('submit child');
    this.registerSubmit.emit();
  }
}
