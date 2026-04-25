import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.toastr.warning('Please enter a valid email and password.');
      return;
    }

    this.auth.login(this.loginForm.getRawValue()).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token ?? res);
        this.router.navigate(['/dashboard']);
      },
      error: () => this.toastr.error('Invalid email or password.')
    });
  }
}