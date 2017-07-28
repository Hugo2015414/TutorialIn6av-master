import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactoService } from '../../../services/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: 'contacto.component.html',
  providers: [ContactoService]
})
export class ContactoComponent implements OnInit {
  constructor(private contactoService: ContactoService) {  }
  url:string;
    formularioContacto:FormGroup;
    formularioUpdate:FormGroup;

 ngOnInit() {
    let validaciones = [
      Validators.required, Validators.minLength(2)
    ]

    this.contactoService.getContactos().subscribe();

    this.formularioContacto = new FormGroup({
      'idUsuario': new FormControl('', validaciones),
      'nombre': new FormControl('', validaciones),
      'apellido': new FormControl('', validaciones),
      'direccion': new FormControl('', validaciones),
      'telefono': new FormControl('', validaciones),
      'correo': new FormControl('', validaciones),
      'idCategoria': new FormControl('', validaciones),
    });
  }

  private actualizarPage() {
    this.contactoService.getContactos().subscribe();
    this.ngOnInit();
  }

  public agregarContacto() {
    console.log(this.formularioContacto.value);
    this.contactoService.agregarContacto(this.formularioContacto.value)
    this.actualizarPage();
  }

  public eliminar(idContacto:number) {
    console.log(idContacto);
    this.contactoService.eliminarContacto(idContacto);
    this.contactoService.getContactos().subscribe();
    this.ngOnInit();
  }

}
