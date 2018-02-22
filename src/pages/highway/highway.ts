import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { SettingsPage } from "../settings/settings";
import { AlertController } from "ionic-angular/components/alert/alert-controller";

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
  joueur: string;
  indexJoueur: number;
  centerCard = { name: "back", value: 0 };
  cards: Array<{ name: string; value: number }>;
  chosenCard: Array<{ name: string; value: number }>;
  nextCard = { name: "back", value: 0 };
  modifIndex: number;
  manche: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
    this.playerList = navParams.get("param1");
    this.joueur = this.playerList[0].name;
    this.imgPath = "assets/imgs/cards/";
    this.initJeu();
    this.indexJoueur = 0;
    this.manche = 1;
  }

  initJeu() {
    this.cards = [
      { name: "as_coeur", value: 1 },
      { name: "as_pique", value: 1 },
      { name: "as_carreau", value: 1 },
      { name: "as_trefle", value: 1 },
      { name: "deux_coeur", value: 2 },
      { name: "deux_pique", value: 2 },
      { name: "deux_carreau", value: 2 },
      { name: "deux_trefle", value: 2 },
      { name: "trois_coeur", value: 3 },
      { name: "trois_pique", value: 3 },
      { name: "trois_carreau", value: 3 },
      { name: "trois_trefle", value: 3 },
      { name: "quatre_coeur", value: 4 },
      { name: "quatre_pique", value: 4 },
      { name: "quatre_carreau", value: 4 },
      { name: "quatre_trefle", value: 4 },
      { name: "cinq_coeur", value: 5 },
      { name: "cinq_pique", value: 5 },
      { name: "cinq_carreau", value: 5 },
      { name: "cinq_trefle", value: 5 },
      { name: "six_coeur", value: 6 },
      { name: "six_pique", value: 6 },
      { name: "six_carreau", value: 6 },
      { name: "six_trefle", value: 6 },
      { name: "sept_coeur", value: 7 },
      { name: "sept_pique", value: 7 },
      { name: "sept_carreau", value: 7 },
      { name: "sept_trefle", value: 7 },
      { name: "huit_coeur", value: 8 },
      { name: "huit_pique", value: 8 },
      { name: "huit_carreau", value: 8 },
      { name: "huit_trefle", value: 8 },
      { name: "neuf_coeur", value: 9 },
      { name: "neuf_pique", value: 9 },
      { name: "neuf_carreau", value: 9 },
      { name: "neuf_trefle", value: 9 },
      { name: "dix_coeur", value: 10 },
      { name: "dix_pique", value: 10 },
      { name: "dix_carreau", value: 10 },
      { name: "dix_trefle", value: 10 },
      { name: "valet_coeur", value: 11 },
      { name: "valet_pique", value: 11 },
      { name: "valet_carreau", value: 11 },
      { name: "valet_trefle", value: 11 },
      { name: "dame_coeur", value: 12 },
      { name: "dame_pique", value: 12 },
      { name: "dame_carreau", value: 12 },
      { name: "dame_trefle", value: 12 },
      { name: "roi_coeur", value: 13 },
      { name: "roi_pique", value: 13 },
      { name: "roi_carreau", value: 13 },
      { name: "roi_trefle", value: 13 }
    ];
    this.chosenCard = [
      { name: "back", value: 0 },
      { name: "back", value: 0 },
      { name: "back", value: 0 },
      { name: "back", value: 0 },
      { name: "back", value: 0 },
      { name: "back", value: 0 },
      { name: "back", value: 0 }
    ];
    this.modifIndex = 0;
    this.firstCard();
  }

  firstCard() {
    var i = Math.floor(Math.random() * this.cards.length);
    this.chosenCard[0].name = this.cards[i].name;
    this.chosenCard[0].value = this.cards[i].value;
    this.centerCard = this.chosenCard[0];
    this.cards.splice(i, 1);
  }

  randomCard() {
    var i = Math.floor(Math.random() * this.cards.length);
    this.nextCard.name = this.cards[i].name;
    this.nextCard.value = this.cards[i].value;
  }

  deleteCard(nom, val) {
    this.cards.forEach(element => {
      if (element.name == nom) {
        this.cards.splice(this.cards.indexOf(element), 1);
      }
    });
  }

  newCard(val) {
    if (this.modifIndex < 5) {
      console.log("MODIFINDEX : " + this.modifIndex);
      console.log(this.chosenCard);
      console.log(this.centerCard);
      this.randomCard();
      if (val == 1) {
        this.chosenCard[this.modifIndex + 1].name = this.nextCard.name;
        this.chosenCard[this.modifIndex + 1].value = this.nextCard.value;
        this.deleteCard(this.nextCard.name, this.nextCard.value);
        this.centerCard = this.chosenCard[this.modifIndex + 1];
        if (this.nextCard.value <= this.chosenCard[this.modifIndex].value) {
          if (this.manche < 3) {
            console.log("2+ MODIFINDEX : " + this.modifIndex);
            this.alertErreur();
          } else {
            this.finJeuJoueur();
          }
        } else {
          this.modifIndex++;
          if (this.modifIndex == 5) this.alertWinner();
        }
      } else if (val == 0) {
        this.chosenCard[this.modifIndex + 1].name = this.nextCard.name;
        this.chosenCard[this.modifIndex + 1].value = this.nextCard.value;
        this.deleteCard(this.nextCard.name, this.nextCard.value);
        this.centerCard = this.chosenCard[this.modifIndex + 1];
        if (this.nextCard.value >= this.chosenCard[this.modifIndex].value) {
          if (this.manche < 3) {
            console.log("2- MODIFINDEX : " + this.modifIndex);
            this.alertErreur();
          } else {
            this.finJeuJoueur();
          }
        } else {
          this.modifIndex++;
          if (this.modifIndex == 5) this.alertWinner();
        }
      }

      console.log("MODIFINDEX av: " + this.modifIndex);
    } else {
      console.log("MODIFINDEX 2323: " + this.modifIndex);
      this.centerCard = this.chosenCard[this.modifIndex];
      this.alertWinner();
    }
  }

  changePlayer() {
    this.indexJoueur++;
    this.playerList.forEach(element => {
      if (this.playerList.indexOf(element) == this.indexJoueur) {
        this.joueur = element.name;
      }
    });
    let alert = this.alertCtrl.create({
      title: "Changement joueur",
      subTitle: this.joueur + " à toi de jouer !",
      buttons: [
        {
          text: "OK",
          handler: data => {}
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  /*** ALERTES ***/
  alertWinner() {
    let alert = this.alertCtrl.create({
      title: "FELICITATIONS " + this.joueur + " !!",
      subTitle: "Tu peux distribuer 6 gorgées",
      buttons: [
        {
          text: "OK",
          handler: data => {
            if (this.indexJoueur + 1 >= this.playerList.length) {
              this.finJeu();
            } else {
              this.changePlayer();
              this.initJeu();
              this.manche = 1;
            }
          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  alertErreur() {
    var cartesRestantes = 5 - this.modifIndex;
    let alert = this.alertCtrl.create({
      title: "PERDU",
      subTitle: "Perdu ! Bois " + cartesRestantes + " gorgées.",
      buttons: [
        {
          text: "ok..",
          handler: data => {
            this.manche++;
            this.initJeu();
          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  finJeuJoueur() {
    let alert = this.alertCtrl.create({
      title: "GAME OVER",
      subTitle: "Perdu ! Tu es nul. Cul sec.",
      buttons: [
        {
          text: "ok..",
          handler: data => {
            if (this.indexJoueur + 1 >= this.playerList.length) {
              this.finJeu();
            } else {
              this.changePlayer();
              this.initJeu();
              this.manche = 1;
            }
          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  finJeu() {
    let alert = this.alertCtrl.create({
      title: "FIN DU JEU",
      subTitle: "Le jeu est terminé ! Pour fêter ça tout le monde boit.",
      buttons: [
        {
          text: "Ouaaaais",
          handler: data => {
            this.navCtrl.pop();
          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  /*** REDIRECT BUTTONS ***/
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
}
