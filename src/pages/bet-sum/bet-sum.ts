import { Component } from "@angular/core";
import { NavController, NavParams, Platform } from "ionic-angular";
import { SettingsPage } from "../settings/settings";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { ScreenOrientation } from "@ionic-native/screen-orientation";

/**
 * Generated class for the BetSumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-bet-sum",
  templateUrl: "bet-sum.html"
})
export class BetSumPage {
  playerList: Array<{ id: number; name: string }>;
  aleaNumber: number;
  index: number;
  joueur: string;
  somme: number;
  constructor(
    public screenOrientation: ScreenOrientation,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public platform: Platform
  ) {
    platform.ready().then(() => {
      platform.registerBackButtonAction(() => this.backPage());
    });
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.playerList = navParams.get("param1");
    this.joueur = this.playerList[1].name;
    this.randomNumber();
    this.index = 0;
    this.changePlayer();
    this.somme = 0;
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

  randomNumber() {
    this.aleaNumber = Math.floor(Math.random() * 10);
  }

  onClick() {
    let alert = this.alertCtrl.create({
      title: "Numéro choisi",
      subTitle:
        "Voulez-vous vraiment choisir le numéro " + this.aleaNumber + " ?",
      buttons: [
        {
          text: "Non",
          role: "cancel"
        },
        {
          text: "Oui",
          handler: () => {
            this.somme = this.somme + this.aleaNumber;
            this.randomNumber();
            this.index++;
            this.changePlayer();
          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  changePlayer() {
    if (this.index < this.playerList.length) {
      this.playerList.forEach(element => {
        if (this.playerList.indexOf(element) == this.index) {
          this.joueur = element.name;
        }
      });
    } else {
      let alert = this.alertCtrl.create({
        title: "FIN DU JEU",
        subTitle: "Faites vos paris !",
        buttons: [
          {
            text: "Afficher Somme",
            handler: () => {
              let alert = this.alertCtrl.create({
                title: "Résultats",
                subTitle: "Somme : " + this.somme,
                buttons: [
                  {
                    text: "Ok",
                    handler: () => {
                      this.backPage();
                    }
                  }
                ],
                enableBackdropDismiss: false
              });
              alert.present();
            }
          }
        ],
        enableBackdropDismiss: false
      });
      alert.present();
    }
  }
}
