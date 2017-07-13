import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Router } from "@angular/router";
declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  private model: any;
  private bTipo: boolean = false;
  private arrTipoIden: Array<string> = ['CC', 'TI'];
  private arrParams: any;
  constructor(private _Http: Http, private _ActivatedRoute: ActivatedRoute, private _ApiService: ApiService, private _Router: Router) {
    this.model = {
      id: 0,
      nombre: "",
      tipo_identificacion: "",
      identificacion: "",
      numero: "",
      fecha_nacimiento: "",
    };
    this._ActivatedRoute.params.subscribe(params => {
      this.bTipo = params['id'] ? true : false;
      this.arrParams = params ? params : this.arrParams;
    });
  }

  ngOnInit() {
    //Existe Id -> Modificacion
    if (this.bTipo) {
      this._ApiService.getCustomer(this.arrParams['id']).then(response => {
        this.model = response[0];
      }).catch(error => {
        console.log("error:", error);
      });
    }
  }

  onSubmit(f: NgForm) {
    if (this.bTipo) {
      this._ApiService.updateCustomer(this.arrParams['id'], jQuery.param(f.value)).then(response => {
        if (response['state']) {
          alert(response['message']);
          this._Router.navigate(['/tabla']);
        } else {
          alert(response['message']);
          this._Router.navigate(['/error']);
        }
      }).catch(error => {
        console.log("error:", error);
      });
    } else {
      this._ApiService.createCustomer(jQuery.param(f.value)).then(response => {
        if (response['state']) {
          alert(response['message']);
          this.model = {
            id: 0,
            nombre: "",
            tipo_identificacion: "",
            identificacion: "",
            numero: "",
            fecha_nacimiento: "",
          };
        } else {
          alert(response['message']);
          this._Router.navigate(['/error']);
        }
      }).catch(error => {
        console.log("error:", error);
      });

    }
  }
 

}
