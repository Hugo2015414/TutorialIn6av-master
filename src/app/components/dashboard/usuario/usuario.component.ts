import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: 'usuario.component.html',
  providers: [UsuarioService]
})
export class UsuarioComponent implements OnInit {
  usuarioCargado: any;

  constructor(private usuarioService: UsuarioService) {  }
  usuarioNuevo:FormGroup;
  usuarioEditar:FormGroup;

  ngOnInit() {
    let validaciones = [
      Validators.required, Validators.minLength(2)
    ]

    this.usuarioService.getUsuarios().subscribe();
    this.usuarioNuevo = new FormGroup({
      'nick': new FormControl('', validaciones),
      'contrasena': new FormControl('', validaciones)
    });

    this.usuarioEditar = new FormGroup({
      'idUsuario': new FormControl('', validaciones),
      'nick': new FormControl('', validaciones),
      'contrasena': new FormControl('', validaciones)
    });
  }

  idUsuario : any;

  public cargar(item : any) {
    this.usuarioCargado = item;
    this.usuarioEditar.controls.idUsuario.setValue(this.usuarioCargado.idUsuario);
    this.usuarioEditar.controls.nick.setValue(this.usuarioCargado.nick);
    this.usuarioEditar.controls.contrasena.setValue(this.usuarioCargado.contrasena);
    this.idUsuario = this.usuarioCargado.idUsuario;
    console.log(JSON.stringify(this.usuarioCargado))
  }

  public agregarUsuario() {
    console.log(this.usuarioNuevo.value);
    this.usuarioService.agregarUsuario(this.usuarioNuevo.value)
    this.usuarioService.getUsuarios().subscribe();
    this.ngOnInit();
  }

  public editarUsuario() {
    console.log(this.usuarioEditar.value);
    this.usuarioService.editarUsuario(this.usuarioEditar.value, this.idUsuario)
    this.usuarioService.getUsuarios().subscribe();
    this.ngOnInit();
  }

  public eliminar(idUsuario:number) {
    console.log(idUsuario);
    this.usuarioService.eliminar(idUsuario);
    this.usuarioService.getUsuarios().subscribe();
    this.ngOnInit();
  }
}
