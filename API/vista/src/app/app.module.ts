import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';

import { TablaComponent } from './components/tabla/tabla.component';
import { FormComponent } from './components/form/form.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';

import { APP_ROUTING } from "./routes/app.routes";

import { ApiService } from "./services/api.service";

@NgModule({
  declarations: [
    AppComponent,
    TablaComponent,
    FormComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING
  ],
  providers: [ApiService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
