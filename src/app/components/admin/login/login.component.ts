import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Simular delay de rede
    setTimeout(() => {
      if (this.authService.login(this.username, this.password)) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.errorMessage = 'Usuário ou senha incorretos!';
      }
      this.isLoading = false;
    }, 1000);
  }
}
