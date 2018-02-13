import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  id;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.id = navParams.data.id;
    this.id = 1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  backPage() {
    switch(this.id) {
      case 1:
        this.navCtrl.push(HomePage);
      break;
      
      /*
      case 2:

      break;
      
      case 3:

      break;
      
      case 4:

      break;
      
      case 5:

      break;
      
      case 6:

      break;

      */

      default:
      break;
    }
  }

}
