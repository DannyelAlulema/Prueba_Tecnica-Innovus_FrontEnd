import { AuthorService } from './../../services/author.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { buildErrorMessage, successMessage } from 'src/app/utils/helpers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  public isAdmin : Boolean;
  public books : any;
  private editMode : Boolean = false;

  public id : number = 0;
  public title : string = '';
  public author_id : number = 0;
  public genre : string = '';
  public publisher : string = '';
  public publication_year : string = '';
  public description : string = '';
  public price : string = '';
  public stock : string = '';

  public authors: any;

  constructor (private service : BookService, private aService : AuthService, private auService : AuthorService) {
    this.isAdmin = this.aService.isAdmin();
  }

  ngOnInit(): void {
    this.getBooks();

    this.auService.getAll().subscribe(res => {
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

      this.id =res.data.id;
      this.title = res.data.title;
      this.author_id = res.data.author_id;
      this.genre = res.data.genre;
      this.publisher = res.data.publisher;
      this.publication_year = res.data.publication_year;
      this.description = res.data.description;
      this.price = res.data.price;
      this.stock = res.data.stock;
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

      this.getBooks();
      successMessage(res.data);
    })
  }

  save() {
    const data = {
      title: this.title,
      author_id: this.author_id,
      genre: this.genre,
      publisher: this.publisher,
      publication_year: this.publication_year,
      description: this.description,
      price: this.price,
      stock: this.stock,
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

    this.getBooks();
    this.resetFields();
  }

  cancel() {
    this.resetFields();
  }

  getBooks() {
    this.service.getAll().subscribe((res) => {
      if (res.code != 200) {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Error al cargar Usuarios',
        });
        return;
      }

      this.books = res.data;
    });
  }

  resetFields() {
    this.id = 0;
    this.title = '';
    this.author_id = 0;
    this.genre = '';
    this.publisher = '';
    this.publication_year = '';
    this.description = '';
    this.price = '';
    this.stock = '';

    this.editMode = false;
  }
}
