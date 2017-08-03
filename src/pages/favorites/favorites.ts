import { Component } from '@angular/core';
import { QuotesService } from '../../services/quotes'; 
import { Quote } from '../../data/quote.interface';
import { ModalController } from 'ionic-angular';
import { QuotePage } from '../quote/quote';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})

export class FavoritesPage {
  quotes: Quote[];

  constructor (private quoteService: QuotesService, private modalCtrl: ModalController) {}

  ionViewWillEnter() {
    this.quotes = this.quoteService.getFavoriteQuotes();
  }

  getQuoteDetail(quote: Quote) {
    let modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
      if (remove) {
        this.quoteService.removeQuoteFromFavorites(quote);
        this.quotes = this.quoteService.getFavoriteQuotes();
      }
    })
  }

  unfavoriteQuote(quote:Quote) {
    this.quoteService.removeQuoteFromFavorites(quote);
    this.quotes=this.quoteService.getFavoriteQuotes();
  }
}