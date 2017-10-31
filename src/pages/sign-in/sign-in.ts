import { Component } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})

export class SignInPage {

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {}

  signUserIn(f: NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();
    this.authService.signin(f.value.email, f.value.pswd)
      .then(data => {
        loading.dismiss();
        console.log("logged in.")
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: "Sign In Failed",
          message: error.message,
          buttons: ["OK"]
        });
        alert.present();
      })
  }
}
