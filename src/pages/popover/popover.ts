import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { QuotesService } from '../../services/quotes';
import { Quote } from '../../data/quote.interface';
import { FavoritesPage } from '../favorites/favorites';
import { AuthService } from '../../services/authService';

/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  templateUrl: 'popover.html'
  // template: `
  //             <ion-title><h2>Options</h2></ion-title>
  //             <ion-content text-center>
  //               <ion-grid>
  //                 <ion-row>
  //                   <ion-col>
  //                     <button ion-button outline (click)="close()">Save</button>
  //                   </ion-col>
  //                 </ion-row>
  //                 <ion-row>
  //                   <ion-col>
  //                     <button ion-button outline (click)="onNewQuote()">Add Quote</button>
  //                   </ion-col>
  //                 </ion-row>
  //                 <ion-row>
  //                   <ion-col>
  //                     <button ion-button outline (click)="clearAll()">Clear All</button>
  //                   </ion-col>
  //                 </ion-row>
  //               </ion-grid>
  //             </ion-content>
  //           `
})
export class PopoverPage {
  quotes: Quote[];
  favPage = FavoritesPage
  token : any

  constructor(
    public viewController: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private quoteService: QuotesService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private loadingCtrl: LoadingController) {
  }

  close(){
    this.viewController.dismiss()
  }

  save(){
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Processing'
    });
    loading.present()

    this.authService.getActiveUser().getToken()
    .then((token:string) => {
      const uid = this.authService.getActiveUser().uid
      this.quoteService.storeList(token).subscribe( () => this.presentToast("Save Success"),
        error => {
          console.log(error);
        });
      });
      loading.dismiss()
  }

  onNewQuote() {
    const alert = this.alertCtrl.create({
      title: "Add New Quote",
      inputs: [
        {
          name: "person",
          placeholder: "Quote Author"
        },
        {
          name: "text",
          placeholder: "Quote"
        }
      ],
      buttons: [
        {
          text: "OK",
          handler: data => {
            let q = {id: "0", person: data.person, text: data.text};
            if (data.person && data.text) {
              this.quoteService.addQuoteToFavorites(q);
              this.quotes = this.quoteService.getFavoriteQuotes();

              const toast = this.toastCtrl.create({
                message: 'New quote was added',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
              // this.navCtrl.push(FavoritesPage)
            }
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    })
    alert.present();
  }

  clearAll(){
    this.quoteService.clearAll()
  }

}
