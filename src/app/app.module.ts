import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule,HttpClientModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],
  providers: [NativeStorage, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },SocialSharing],
  bootstrap: [AppComponent],
})
export class AppModule {}
