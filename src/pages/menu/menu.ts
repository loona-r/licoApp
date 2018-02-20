import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { SettingsPage } from "../settings/settings";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { SelfDrawPage } from "../self-draw/self-draw";
import { BetSumPage } from "../bet-sum/bet-sum";
import { PicoloPage } from "../picolo/picolo";
import { HighwayPage } from "../highway/highway";

@Component({
  selector: "page-menu",
  templateUrl: "menu.html"
})
export class MenuPage {
  playerList: Array<{ id: number; name: string }>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
    this.playerList = navParams.get("param1").filter(function(x) {
      return x.name != "";
    });
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
    this.navCtrl.pop({ animate: false });
  }

  highwayInfo() {
    let alert = this.alertCtrl.create({
      title: "Highway",
      subTitle:
        "Highway est un jeu de pari. On doit parier sur la hauteur d'une carte, en fonction de la précédente. Le joueur doit swipper la carte vers le haut s'il pense qu'elle est plus grande, ou vers le bas dans le cas contraire. Dès lors qu'il se trompe, il doit boire autant de gorgées que de cartes trouvées. Si le joueur dévoile toutes les cartes, il distribue les 6 gorgées aux autres joueurs.",
      buttons: [
        {
          text: "Annuler",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Jouer",
          handler: data => {
            this.navCtrl.push(HighwayPage, {
              param1: this.playerList
            });
          }
        }
      ]
    });
    alert.present();
  }

  picoloInfo() {
    let alert = this.alertCtrl.create({
      title: "Picolo",
      subTitle:
        "Le picolo est un jeu de défi. Les joueurs doivent exécuter ce que l'application leur demande. Pour passer les défis, on doit simplement cliquer sur l'écran.",
      buttons: [
        {
          text: "Annuler",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Jouer",
          handler: data => {
            this.navCtrl.push(PicoloPage, {
              param1: this.playerList
            });
          }
        }
      ]
    });
    alert.present();
  }

  betSumInfo() {
    let alert = this.alertCtrl.create({
      title: "Bet Sum",
      subTitle:
        "Bet Sum est un jeu de pari sur une somme de chiffre. Chaque joueur doit, dans un premier temps, choisir un chiffre. Pour cela, il swippe horizontalement, pour faire défiler les 9 chiffres (qui apparaissent aléatoirement, de façon à ce qu'on ne puisse pas deviner le chiffre choisi). Pour valider, le joueur doit faire un simple appui sur l'écran. Lorsque tout le monde à choisi un chiffre, ils parient sur la somme de tous les chiffres. Finalement, l'application affiche la somme, et le joueur qui est le plus loin du compte boit.",
      buttons: [
        {
          text: "Annuler",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Jouer",
          handler: data => {
            this.navCtrl.push(BetSumPage, {
              param1: this.playerList
            });
          }
        }
      ]
    });
    alert.present();
  }

  selfDrawInfo() {
    let alert = this.alertCtrl.create({
      title: "Self Draw",
      subTitle:
        "Chaque joueur prend un selfie depuis l'application, dessine dessus, puis l'enregistre. À la fin, chaque selfie est affiché, et chaque joueur vote au tour à tour pour le plus amusant. Finalement, le joueur ayant reçu le plus de vote doit boire (et comme c'est un jeu plutôt long, cul sec !)",
      buttons: [
        {
          text: "Annuler",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Jouer",
          handler: data => {
            this.navCtrl.push(SelfDrawPage, {
              param1: this.playerList
            });
          }
        }
      ]
    });
    alert.present();
  }
}
