import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { MenuPage } from "../menu/menu";
import { SettingsPage } from "../settings/settings";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  settings() {
    this.navCtrl.push(SettingsPage);
  }

  menuPage() {
    this.navCtrl.push(MenuPage);
  }
}
