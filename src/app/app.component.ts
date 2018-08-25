import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public electronService: ElectronService,
    private translate: TranslateService,
    private _hotkeysService: HotkeysService,
    private router: Router
  ) {

    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }

    this._hotkeysService.add(new Hotkey('ctrl+shift+d', (event: KeyboardEvent): boolean => {
      this.router.navigate(['/']);
      return false; // Prevent bubbling
    }));

    this._hotkeysService.add(new Hotkey('ctrl+shift+p', (event: KeyboardEvent): boolean => {
      this.router.navigate(['/products']);
      return false; // Prevent bubbling
    }));

    this._hotkeysService.add(new Hotkey('ctrl+shift+a', (event: KeyboardEvent): boolean => {
      this.router.navigate(['/party-rates']);
      return false; // Prevent bubbling
    }));

    this._hotkeysService.add(new Hotkey('ctrl+shift+c', (event: KeyboardEvent): boolean => {
      this.router.navigate(['/containers']);
      return false; // Prevent bubbling
    }));

    this._hotkeysService.add(new Hotkey('ctrl+shift+t', (event: KeyboardEvent): boolean => {
      this.router.navigate(['/transactions']);
      return false; // Prevent bubbling
    }));

    this._hotkeysService.add(new Hotkey('ctrl+shift+r', (event: KeyboardEvent): boolean => {
      this.router.navigate(['/reports']);
      return false; // Prevent bubbling
    }));

    this._hotkeysService.add(new Hotkey('ctrl+shift+u', (event: KeyboardEvent): boolean => {
      this.router.navigate(['/users']);
      return false; // Prevent bubbling
    }));

    this._hotkeysService.add(new Hotkey('ctrl+shift+h', (event: KeyboardEvent): boolean => {
      this.router.navigate(['/help']);
      return false; // Prevent bubbling
    }));
  }


  closeWindow() {
    this.electronService.window.close();
  }

  minimizeWindow() {
    this.electronService.window.minimize();
  }

  maximizeWindow() {
    this.electronService.window.maximize();
  }

  resizeWindow() {
    this.electronService.window.restore();
  }
}
