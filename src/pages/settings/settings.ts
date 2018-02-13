import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { HomePage } from "../home/home";

@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
  playerList: Array<Object>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.playerList = navParams.data.playerList;
  }

  backPage() {
    this.navCtrl.pop({ animate: false });
  }
}
