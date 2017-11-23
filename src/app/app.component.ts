import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SettingsPage } from '../pages/settings/settings';
import { AuthService } from '../services/authService';
import { retry } from 'rxjs/operator/retry';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage = TabsPage;
  signInPage = SignInPage;
  signUpPage = SignUpPage;
  settingsPage = SettingsPage;
  private loggedIn = 0;

  @ViewChild('sideMenuContent') nav: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private authService: AuthService) {

    firebase.initializeApp({
      apiKey: "AIzaSyDvzON3QwOXNR91lHfc8WEqmCHYkj4e0cE",
      authDomain: "tugasmobile-4796.firebaseapp.com",
      databaseURL: "https://tugasmobile-4796.firebaseio.com",
      projectId: "tugasmobile-4796",
      storageBucket: "tugasmobile-4796.appspot.com",
      messagingSenderId: "1039733888972"
    })

    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        this.loggedIn = 1;
        this.nav.setRoot(TabsPage)
        
      }
      else{
        this.loggedIn = 0;
        this.nav.setRoot(SignInPage)
      }
    })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  logOut(){
    this.authService.logout()
  }

}
