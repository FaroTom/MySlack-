import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { SignupScreenComponent } from './signup-screen/signup-screen.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {path: 'login', component: LoginScreenComponent},
  {path: 'signup', component: SignupScreenComponent},
  {path: 'dashboard', component: MainPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
