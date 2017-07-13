import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from "../../services/api.service";
declare var jQuery: any;
declare var $: any;
@Component({
    selector: 'app-tabla',
    templateUrl: './tabla.component.html',
    styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
    constructor(private _Router: Router, private _ApiService: ApiService) {
    }
    ngOnInit() {
        $('#table').bootstrapTable({
            columns: [
                {
                    field: 'state',
                    checkbox: true,
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'id',
                    title: 'Id Base de datos'
                }, {
                    field: 'nombre',
                    title: 'Nombre del customer'
                }, {
                    field: 'tipo_identificacion',
                    title: 'Tipo identificación del customer'
                }, {
                    field: 'identificacion',
                    title: 'Identificación del customer'
                }, {
                    field: 'numero',
                    title: 'numero del customer'
                }, {
                    field: 'fecha_nacimiento',
                    title: 'Fecha de nacimiento del customer'
                }, {
                    field: 'fecha_creacion',
                    title: 'Fecha de creación del customer'
                }],
            dataType: 'json',
            sidePagination: 'client',
            locale: 'es-ES',
            contentType: 'application/x-www-form-urlencoded',
            url: 'http://localhost/AndresBoyaca/API/api.php/customer',
            method: 'GET',
            height: '400',
            pagination: true,
            pageList: [10, 25, 50, 100],
            showColumns: true,
            showRefresh: true,
            singleSelect: true,
            clickToSelect: true,
            maintainSelected: true,
            toolbar: $('#toolbar')
        });
    }

    ver() {
        let nSelect = $('#table').bootstrapTable('getSelections');
        if (nSelect.length === 0) {
            alert('Debe seleccionar un registro');
        } else {
            let id = nSelect[0].id;
            this._Router.navigate(['/form', id]);
        }
    }
    eliminar() {
        let nSelect = $('#table').bootstrapTable('getSelections');
        if (nSelect.length === 0) {
            alert('Debe seleccionar un registro');
        } else {
            let id = nSelect[0].id;
            this._ApiService.deleteCustomer(id).then(response => {
                if (response['state']) {
                    alert(response['message']);
                } else {
                    alert(response['message']);
                    this._Router.navigate(['/error']);
                }
                $('#table').bootstrapTable('refresh');
            }).catch(error => {
                console.log("error:", error);
            });
        }
    }
    crear(){
          this._Router.navigate(['/form']);
    }

}
