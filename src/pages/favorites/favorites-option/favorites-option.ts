import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

@Component({
  selector: 'page-favorites-option',
  template: `
    <ion-grid text-center>
      <ion-row>
        <ion-col>
          <h3>Options</h3>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button ion-button outline (click)="onNewQuote()">Add Quote</button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button ion-button outline (click)="onClearFavorites()">Clear All</button>
        </ion-col>
      </ion-row>
    </ion-grid>
  `
})

export class FavoritesOptionPage {
  constructor (private viewCtrl: ViewController) {}

  onNewQuote() {
    this.viewCtrl.dismiss('new');
  }
  onClearFavorites() {
    this.viewCtrl.dismiss('clear');
  }
}
