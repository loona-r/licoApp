import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { MenuPage } from "../menu/menu";
import { SettingsPage } from "../settings/settings";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { ScreenOrientation } from "@ionic-native/screen-orientation";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  playerList: Array<{ id: number; name: string }>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public screenOrientation: ScreenOrientation
  ) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.playerList = [{ id: 1, name: "" }, { id: 2, name: "" }];
  }

  submit() {
    console.log(this.playerList);
    console.log("length" + this.playerList.length);
    if (this.playerList.length >= 2 && this.countEmptyPlayer()) {
      this.deleteEmptyPlayer();
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
    } else {
      let toast = this.toastCtrl.create({
        message: "Il faut au moins 2 joueurs",
        duration: 3000,
        position: "bottom"
      });

      toast.onDidDismiss(() => {
        console.log("Dismissed toast");
      });

      toast.present();
    }
    console.log(this.playerList);
  }

  settings() {
    this.navCtrl.push(
      SettingsPage,
      {},
      {
        animate: true,
        animation: "md-transition"
      }
    );
  }

  addPlayer() {
    if (this.playerList.length < 10) {
      this.playerList.push({
        id: this.playerList.length + 1,
        name: ""
      });
      console.log(this.playerList);
    }
  }

  removePlayer() {
    if (this.playerList.length > 2) {
      this.playerList.splice(this.playerList.length - 1, 1);
      console.log(this.playerList);
    }
  }

  deleteEmptyPlayer() {
    this.playerList.forEach(element => {
      if (element.name == "") {
        this.playerList.splice(this.playerList.indexOf(element));
      }
    });
    console.log(this.playerList);
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
