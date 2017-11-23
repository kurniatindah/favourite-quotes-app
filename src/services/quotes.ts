import { Quote } from '../data/quote.interface';
import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { AuthService } from './authService';
import 'rxjs';

@Injectable()

export class QuotesService {
    constructor(public http: Http, public authSvc : AuthService) {
    }

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

    storeList(token: string) {
        const uid = this.authSvc.getActiveUser().uid;
        return this.http
        .put('https://tugasmobile-4796.firebaseio.com/' + uid + '/favquotes.json?auth='
        + token, this.favoriteQuotes)
        .map((response: Response) => {
        return response.json();
        });
    }

    getData(token){
        // console.log("Fetching Data");
        const uid = this.authSvc.getActiveUser().uid;
        return this.http
        .get('https://tugasmobile-4796.firebaseio.com/c' + uid + '/favquotes.json?auth=' + token)
        .map((response : Response) => {
            this.favoriteQuotes = response.json();
            console.log(this.favoriteQuotes);
            return this.favoriteQuotes;
        });
    }
}