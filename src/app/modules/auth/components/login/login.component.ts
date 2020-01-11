import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StorageService } from 'src/app/modules/shared/services/storage.service';
import { Router } from '@angular/router';
import { AjaxService } from 'src/app/modules/shared/services/ajax.service';

export interface UserModel {
  pk: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}
export interface LoginResponse {
  token: string;
  user: UserModel;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this._fb.group({
    // email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private _fb: FormBuilder,
    private _storage: StorageService,
    private _router: Router,
    private _ajax: AjaxService
  ) { }

  ngOnInit() {
  }

  login() {
    const data = this.loginForm.value;
    this._ajax.login(data).subscribe((response: LoginResponse) => {
      this._storage.setUser(response.user);
      this._storage.setToken(response.token);
      // this._storage.setRole('admin');
      this._router.navigate(['/dashboard']);
    }, (error) => {
      alert('Oops, there was an error logging you in!')
    });
  }

}
