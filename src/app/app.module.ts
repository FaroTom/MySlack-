import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import {MatIconModule} from '@angular/material/icon';
import { SignupScreenComponent } from './signup-screen/signup-screen.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { MainPageComponent } from './main-page/main-page.component';
import { LeftsideComponent } from './leftside/leftside.component';
import { CenterContentComponent } from './center-content/center-content.component';
import { RightsideComponent } from './rightside/rightside.component';
import { NewChannelComponent } from './new-channel/new-channel.component';
import { ChannelInfosComponent } from './channel-infos/channel-infos.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    SignupScreenComponent,
    MainPageComponent,
    LeftsideComponent,
    CenterContentComponent,
    RightsideComponent,
    NewChannelComponent,
    ChannelInfosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }, LoginScreenComponent, CenterContentComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
