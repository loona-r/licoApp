import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { MenuPage } from "../menu/menu";
import { SettingsPage } from "../settings/settings";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  playerList: Array<Object>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.playerList = [
      { id: 1, name: "" },
      { id: 2, name: "" },
      { id: 3, name: "" },
      { id: 4, name: "" }
    ];
  }

  settings() {
    this.navCtrl.push(SettingsPage);
  }

  menuPage(liste) {
    this.navCtrl.push(MenuPage, this.playerList);
  }

  submit() {
    this.menuPage(this.playerList);
    console.log(this.playerList);
  }

  addPlayer() {
    this.playerList.push({ id: this.playerList.length + 1, name: "" });
    console.log(this.playerList);
  }
}
