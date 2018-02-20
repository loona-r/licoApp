import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { SettingsPage } from "../settings/settings";
import { AlertController } from "ionic-angular/components/alert/alert-controller";

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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
    this.playerList = navParams.get("param1");
    this.oui();
    this.index = 1;
    this.choosePlayer();
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

  oui() {
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
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Oui",
          handler: () => {
            console.log(this.aleaNumber);
            this.index++;
            this.choosePlayer();
          }
        }
      ]
    });
    alert.present();
  }

  choosePlayer() {
    this.playerList.forEach(element => {
      if (element.id == this.index) {
        this.joueur = element.name;
      }
    });
  }
}
