import { Quote } from '../data/quote.interface';
import { AlertController, ToastController } from 'ionic-angular';

export class QuotesService {
    private favoriteQuotes: Quote[] = []

    addQuoteToFavorites(quote: Quote) {
        this.favoriteQuotes.push(quote);
    }

    removeQuoteFromFavorites(quote: Quote) {
        let idx = this.favoriteQuotes.findIndex((quoteEl: Quote) => {
            return quoteEl.id == quote.id;
        });
        this.favoriteQuotes.splice(idx, 1);
    }

    getFavoriteQuotes() {
        return this.favoriteQuotes.slice();
    }

    isFavorite(quote: Quote) {
        let idx = this.favoriteQuotes.findIndex((quoteEl: Quote) => {
            return quoteEl.id == quote.id;
        });
        return idx==-1? false : true;
    }

    clearAll(){
        this.favoriteQuotes = []
    }
}