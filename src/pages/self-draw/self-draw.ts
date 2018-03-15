import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { SettingsPage } from "../settings/settings";
import { ScreenOrientation } from "@ionic-native/screen-orientation";

/**
 * Generated class for the SelfDrawPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-self-draw",
  templateUrl: "self-draw.html"
})
export class SelfDrawPage {
  playerList: Array<{ id: number; name: string }>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public screenOrientation: ScreenOrientation
  ) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
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
    this.navCtrl.pop();
  }
}
