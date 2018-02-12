import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { HomePage } from "../home/home";
import { SettingsPage } from "../settings/settings";

@Component({
  selector: "page-menu",
  templateUrl: "menu.html"
})
export class MenuPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  settings() {
    this.navCtrl.push(SettingsPage);
  }

  backPage() {
    this.navCtrl.push(HomePage);
    console.log("coucou");
  }
}
