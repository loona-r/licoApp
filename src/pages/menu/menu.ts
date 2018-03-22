import { Component } from "@angular/core";
import { NavController, NavParams, Platform } from "ionic-angular";
import { SettingsPage } from "../settings/settings";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { BetSumPage } from "../bet-sum/bet-sum";
import { PicoloPage } from "../picolo/picolo";
import { HighwayPage } from "../highway/highway";
import { PrankPhonePage } from "../prank-phone/prank-phone";

@Component({
  selector: "page-menu",
  templateUrl: "menu.html"
})
export class MenuPage {
  playerList: Array<{ id: number; name: string }>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public platform: Platform
  ) {
    platform.ready().then(() => {
      platform.registerBackButtonAction(() => this.backPage());
    });
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
          role: "cancel"
        },
        {
          text: "Jouer",
          handler: data => {
            this.navCtrl.push(HighwayPage, {
              param1: this.playerList
            });
          }
        }
      ],
      enableBackdropDismiss: false
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
          role: "cancel"
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
        "Bet Sum est un jeu de pari sur une somme de chiffre. Pour valider, le joueur doit faire un simple appui sur l'écran. Lorsque tout le monde a choisi un chiffre, ils parient sur la somme de tous les chiffres. Finalement, le joueur qui est le plus loin du compte boit.",
      buttons: [
        {
          text: "Annuler",
          role: "cancel"
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

  prankPhoneInfo() {
    let alert = this.alertCtrl.create({
      title: "Prank Phone",
      subTitle:
        "L'application propose aléatoirement un contact du téléphone, et un défi à réaliser par un joueur.",
      buttons: [
        {
          text: "Annuler",
          role: "cancel"
        },
        {
          text: "Jouer",
          handler: data => {
            this.navCtrl.push(PrankPhonePage, {
              param1: this.playerList
            });
          }
        }
      ]
    });
    alert.present();
  }
}
