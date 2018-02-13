import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { SettingsPage } from "../settings/settings";

@Component({
  selector: "page-menu",
  templateUrl: "menu.html"
})
export class MenuPage {
  playerList: Array<Object>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.playerList = navParams.get("param1");
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
}
