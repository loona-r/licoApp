import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { SettingsPage } from "../settings/settings";

/**
 * Generated class for the HighwayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-highway",
  templateUrl: "highway.html"
})
export class HighwayPage {
  playerList: Array<{ id: number; name: string }>;
  imgPath: string;
  cards: Array<string>;
  chosenCard: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.playerList = navParams.get("param1");
    this.imgPath = "assets/imgs/cards/";
    this.cards = [
      "as_coeur",
      "deux_coeur",
      "trois_coeur",
      "quatre_coeur",
      "cinq_coeur",
      "six_coeur",
      "sept_coeur",
      "huit_coeur",
      "neuf_coeur",
      "dix_coeur",
      "valet_coeur",
      "dame_coeur",
      "roi_coeur",
      "as_pique",
      "deux_pique",
      "trois_pique",
      "quatre_pique",
      "cinq_pique",
      "six_pique",
      "sept_pique",
      "huit_pique",
      "neuf_pique",
      "dix_pique",
      "valet_pique",
      "dame_pique",
      "roi_pique",
      "as_trefle",
      "deux_trefle",
      "trois_trefle",
      "quatre_trefle",
      "cinq_trefle",
      "six_trefle",
      "sept_trefle",
      "huit_trefle",
      "neuf_trefle",
      "dix_trefle",
      "valet_trefle",
      "dame_trefle",
      "roi_trefle",
      "as_carreau",
      "deux_carreau",
      "trois_carreau",
      "quatre_carreau",
      "cinq_carreau",
      "six_carreau",
      "sept_carreau",
      "huit_carreau",
      "neuf_carreau",
      "dix_carreau",
      "valet_carreau",
      "dame_carreau",
      "roi_carreau"
    ];
    this.chosenCard = this.imgPath + "back.png";
  }

  settings() {
    this.navCtrl.push(
      SettingsPage,
      {
        param1: this.playerList
      },
      {
        animate: true,
        animation: "md-transition"
      }
    );
  }

  backPage() {
    this.navCtrl.pop();
  }

  randomCard() {
    var i = Math.floor(Math.random() * this.cards.length);
    if (this.cards.length > 0) {
      this.chosenCard = this.imgPath + this.cards[i] + ".png";
      this.cards.splice(i, 1);
      console.log(this.chosenCard);
    }
  }
}
