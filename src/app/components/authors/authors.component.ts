import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthorService } from 'src/app/services/author.service';
import { buildErrorMessage, successMessage } from 'src/app/utils/helpers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  public isAdmin: Boolean;
  public authors: any;
  private editMode : Boolean = false;

  public id : number = 0;
  public name : string = '';
  public biography : string = '';

  constructor(private service: AuthorService, private aService: AuthService) {
    this.isAdmin = this.aService.isAdmin();
  }

  ngOnInit(): void {
    this.getAuthors();
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
      this.biography = res.data.biography;
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

      this.getAuthors();
      successMessage(res.data);
    })
  }

  save() {
    const data = {
      name: this.name,
      biography: this.biography
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

    this.getAuthors();
    this.resetFields();
  }

  cancel() {
    this.resetFields();
  }

  getAuthors() {
    this.service.getAll().subscribe((res) => {
      if (res.code != 200) {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Error al cargar Autores',
        });
        return;
      }

      this.authors = res.data;
    });
  }

  resetFields() {
    this.id = 0;
    this.name = '';
    this.biography = '';

    this.editMode = false;
  }
}
