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

  submit() {
    this.navCtrl.push(
      MenuPage,
      {
        param1: this.playerList
      },
      {
        animate: true,
        animation: "md-transition"
      }
    );
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

  addPlayer() {
    if (this.playerList.length < 10) {
      this.playerList.push({ id: this.playerList.length + 1, name: "" });
      console.log(this.playerList);
    }
  }

  removePlayer() {
    this.playerList.splice(this.playerList.length - 1, 1);
    console.log(this.playerList);
  }
}
