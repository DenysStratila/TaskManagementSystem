import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from 'src/app/services';
import { RoleModel } from 'src/app/models';
import { MatDialog } from '@angular/material';
import { RoleComponent } from '../role/role.component';
import { filter, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  constructor(private admin: AdminService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.admin.currentUser = undefined;
  }

  public onEditRole(role: RoleModel): void {
    const dialogRef = this.dialog.open(RoleComponent, {
      height: '200px',
      width: '300px',
      data: { role }
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(response => !!response),
        mergeMap(response =>
          this.admin
            .updateRole((response as RoleModel), this.admin.currentUser.id)
            .pipe(mergeMap(_ => of(response)))
        )
      )
      .subscribe(
        success => {
          this.admin.currentUser.role = (success as RoleModel).role;
          this.spinner.hide();
          this.toastr.success("Role has changed!");
        },
        error => {
          console.log(error);
          this.spinner.hide();
          if (error.error.userRole)
            this.toastr.warning(error.error.userRole);
          else if (error.error.userId)
            this.toastr.warning(error.error.userId);
          else if (error.error.userName)
            this.toastr.warning(error.error.roleName);
          else
            this.toastr.warning('Cannot change a role');
        }
      );
  }
}
