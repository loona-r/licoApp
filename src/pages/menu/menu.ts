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
    this.playerList = navParams.data.playerList;
  }

  settings() {
    this.navCtrl.push(SettingsPage, this.playerList, { animate: false });
  }

  backPage() {
    this.navCtrl.pop({ animate: false });
  }
}
