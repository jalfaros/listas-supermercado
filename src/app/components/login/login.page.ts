import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Storage } from '@ionic/storage'
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private _authService: AuthServiceService,
    private storage: Storage,
    private _toast: ToastService
  ) { }

  async ngOnInit() {
    this.generateForm();
    await this.storage.create();
    this.loggedInChecker();


  }


  generateForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls)
        .forEach(iterator => {

          if (iterator instanceof FormGroup) {

            Object.values(iterator.controls).forEach(campo => {
              campo.markAllAsTouched();
            })

          } else {
            iterator.markAllAsTouched();
          }
        });
      return;
    }

    this.firebaseLogin();
  }

  private firebaseLogin() {
    this._authService.localSignIn(this.loginForm.value).then(response => {
      if (response['message']) {
        this._toast.informationToast(response['message'], 'danger', 'Login fail');
      } else {
        this.saveUserStorage(response)
      }
    })
  }

  googleSignIn() {
    this._authService.googleSignIn().then(response => {
      if (response['message']) {
        this._toast.informationToast(response['message'], 'danger', 'Login fail');
      }else{
        console.log(response)
        this.saveUserStorage( response );
      }
    })
  }


  private async saveUserStorage({ email, displayName, uid }) {
    const userInfo = {
      uid,
      displayName,
      email
    }
    await this.storage.set('userInformation', JSON.stringify(userInfo));
    this.loginForm.reset();
    this.router.navigate(['/home'])
  }

  loggedInChecker() {
    this.storage.get('userInformation').then((val) => {
      if (val !== null) {
        this.router.navigate(['/home'])
      }
    })
  }
}
