import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
  playerList: Array<{ id: number; name: string }>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
}
