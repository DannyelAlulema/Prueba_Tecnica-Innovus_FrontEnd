import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { buildErrorMessage, successMessage } from 'src/app/utils/helpers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public users: any;

  public id: number = 0;
  public name: string = '';
  public username: string = '';
  public password: string = '';
  public passwordConfirm: string = '';
  public role: string = 'USER';

  private editMode: Boolean = false;

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  edit(id: number) {
    this.editMode = true;

    this.service.getOne(id).subscribe((res) => {
      if (res.code != 200) {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Error al cargar usuario',
        });

        return;
      }

      this.id = res.data.id;
      this.name = res.data.name;
      this.username = res.data.username;
      this.role = res.data.role;
    });
  }

  delete(id: number) {
    this.service.destroy(id).subscribe(res => {
      if (res.code != 200) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al eliminar registro'
        });
        return;
      }

      this.getUsers();
      successMessage(res.data);
    })
  }

  save() {
    if (this.password != this.passwordConfirm) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Las contraseñas no coinciden',
      });
      return;
    }

    const data = {
      name: this.name,
      username: this.username,
      password: this.password,
      role: this.role,
    };

    if (this.editMode) {
      this.service.update(this.id, data).subscribe((res) => {
        if (res.code != 200) {
          let errMessage: string = buildErrorMessage(res.error);

          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: errMessage,
          });

          this.resetFields();
          return;
        }

        successMessage(res.data);
      });
    } else {
      this.service.store(data).subscribe((res) => {
        if (res.code != 200) {
          let errMessage: string = buildErrorMessage(res.error);

          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: errMessage,
          });

          this.resetFields();
          return;
        }

        successMessage(res.data);
      });
    }

    this.getUsers();
    this.resetFields();
  }

  cancel() {
    this.resetFields();
  }

  getUsers() {
    this.service.getAll().subscribe((res) => {
      if (res.code != 200) {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Error al cargar Usuarios',
        });
        return;
      }

      this.users = res.data;
    });
  }

  resetFields() {
    this.id = 0;
    this.name = '';
    this.username = '';
    this.password = '';
    this.passwordConfirm = '';
    this.role = 'USER';

    this.editMode = false;
  }
}
