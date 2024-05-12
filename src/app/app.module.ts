import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SupermarketComponent } from './supermarket/supermarket.component';
import { AddComponent } from './add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateSupermarketComponent } from './update-supermarket/update-supermarket.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RechercheParTypeComponent } from './recherche-par-type/recherche-par-type.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { RegisterComponent } from './register/register.component';
import { TokenInterceptor } from './token.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    SupermarketComponent,
    AddComponent,
    UpdateSupermarketComponent,
    LoginComponent,
    ForbiddenComponent,
    RechercheParTypeComponent,
    RechercheParNomComponent,
    SearchFilterPipe,
    RegisterComponent,

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{ provide : HTTP_INTERCEPTORS,
useClass : TokenInterceptor,
multi : true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
