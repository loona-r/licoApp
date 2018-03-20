import { Component } from "@angular/core";
import { NavController, NavParams, Platform } from "ionic-angular";
import { SettingsPage } from "../settings/settings";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from "angularfire2/database";
import { ScreenOrientation } from "@ionic-native/screen-orientation";

/**
 * Generated class for the PicoloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-picolo",
  templateUrl: "picolo.html"
})
export class PicoloPage {
  playerList: Array<{ id: number; name: string }>;
  items: Observable<any[]>;
  mode: string;
  defi: string;
  theme: string;
  dilemme: string;

  constructor(
    public platform: Platform,
    private screenOrientation: ScreenOrientation,
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    platform.ready().then(() => {
      platform.registerBackButtonAction(() => this.backPage());
    });

    this.playerList = navParams.get("param1");
    this.items = db.list("/").valueChanges();
    this.mode = "";
    this.defi = "";
    this.dilemme = "";
    this.theme = "";
    this.nouveauTour();
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  nouveauTour() {
    this.defiAleat();
    this.changeMode();
  }

  changeMode() {
    var i = Math.floor(Math.random() * 200);
    if (i < 100) this.mode = "Divers";
    if (i >= 100 && i < 190) this.mode = "Jeu";
    if (i >= 190 && i < 200) this.mode = "Caliente";
  }

  dilemmeAlea(itemData) {
    var i = Math.floor(Math.random() * itemData.Jeu.Dilemme.length);
    this.dilemme = itemData.Jeu.Dilemme[i];
  }

  themeAlea(itemData) {
    var i = Math.floor(Math.random() * itemData.Jeu.Theme.length);
    this.theme = itemData.Jeu.Theme[i];
  }

  joueurAleat() {
    var i = Math.floor(Math.random() * this.playerList.length);
    return this.playerList[i].name;
  }

  gorgeesAleat() {
    return (Math.floor(Math.random() * 5) + 1).toString();
  }

  defiAleat() {
    var joueur1, joueur2;
    this.items.forEach(item => {
      item.forEach(itemData => {
        if (this.mode == "Divers") {
          var i = Math.floor(Math.random() * itemData.Divers.length);
          this.defi = itemData.Divers[i].replace("%X%", this.gorgeesAleat());
        } else if ((this.mode = "Jeu")) {
          var iJ = Math.floor(Math.random() * itemData.Jeu.Divers.length);
          this.defi = itemData.Jeu.Divers[iJ].replace(
            "%X%",
            this.gorgeesAleat()
          );
        } else if ((this.mode = "Caliente")) {
          var iC = Math.floor(Math.random() * itemData.Jeu.Caliente.length);
          this.defi = itemData.Jeu.Caliente[iC].replace(
            "%X%",
            this.gorgeesAleat()
          );
        }
        this.defi = this.defi.replace("%X%", this.gorgeesAleat());
        joueur1 = this.joueurAleat();
        do {
          joueur2 = this.joueurAleat();
        } while (joueur1 == joueur2);
        this.defi = this.defi.replace("%P%", joueur1);
        this.defi = this.defi.replace("%P2%", joueur2);

        if (this.defi.includes("DILEMME")) {
          this.mode = "Dilemme";
          this.dilemmeAlea(itemData);
          this.defi = this.defi.replace("DILEMME", this.dilemme);
        }
        if (this.defi.includes("THEME")) {
          this.mode = "Theme";
          this.themeAlea(itemData);
          this.defi = this.defi.replace("THEME", this.theme);
        }
      });
    });
  }

  settings() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
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
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.navCtrl.pop();
  }
}
