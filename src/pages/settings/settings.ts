import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { AlertController } from "ionic-angular/components/alert/alert-controller";

@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
  playerList: Array<{ id: number; name: string }>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
    this.playerList = navParams.get("param1");
  }

  backPage() {
    this.navCtrl.pop({ animate: false });
  }

  countEmptyPlayer() {
    var count = 0;
    this.playerList.forEach(element => {
      if (element.name == "") {
        count++;
      }
    });
    console.log("count" + count);
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
      buttons: ["OK"]
    });
    alert.present();
  }
}
