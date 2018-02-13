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
}
