import { Component } from "@angular/core";
import { NavController, NavParams, Platform } from "ionic-angular";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { ScreenOrientation } from "@ionic-native/screen-orientation";

@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
  playerList: Array<{ id: number; name: string }>;
  lastPage: string;
  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public screenOrientation: ScreenOrientation
  ) {
    platform.ready().then(() => {
      platform.registerBackButtonAction(() => this.backPage());
    });
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.playerList = navParams.get("param1");
    this.lastPage = this.navCtrl.last().component.name;
  }

  backPage() {
    if (this.lastPage == "PicoloPage")
      this.screenOrientation.lock(
        this.screenOrientation.ORIENTATIONS.LANDSCAPE
      );
    this.navCtrl.pop({ animate: false });
  }

  countEmptyPlayer() {
    var count = 0;
    this.playerList.forEach(element => {
      if (element.name == "") {
        count++;
      }
    });
    if (
      count == this.playerList.length ||
      (this.playerList.length == 2 && count == 1)
    ) {
      return false;
    } else {
      return true;
    }
  }

  boutonInutile() {
    let alert = this.alertCtrl.create({
      title: "Félicitations !!",
      subTitle:
        "Bravo, tu as cliqué sur le bouton inutile ! Bois 2 gorgées pour célébrer cette trouvaille",
      buttons: [
        {
          text: "COOL"
        }
      ]
    });
    alert.present();
  }
}
