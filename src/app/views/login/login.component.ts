import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    providers: [AuthService, MessageService]
})
export class LoginComponent {
    public loadingState: boolean = false;
    public loginForm!: FormGroup<LoginForm>;
    public registerForm!: FormGroup<RegisterForm>;
    public tabActiveIndex: number = 0;

    constructor(
        private authService: AuthService,
        private messageService: MessageService) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)])
        })

        this.registerForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(2)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)])
        });
    }

    onLoginSubmit(form: any) {
        if (form.valid) {
            this.loadingState = true; // Inicia o estado de carregamento
            this.authService.login(form.value.email, form.value.password)
                .pipe(
                    catchError((error) => {
                        if (error.status === 403) {
                            this.messageService.add({
                                severity: 'warn',
                                summary: 'Acesso Negado',
                                detail: 'Sua conta ainda não foi aprovada. Por favor, aguarde a aprovação do administrador.'
                            });
                        } else {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Erro de Login',
                                detail: 'Credenciais inválidas. Por favor, tente novamente.'
                            });
                        }
                        this.loadingState = false;
                        throw error;
                    }))
                .subscribe({
                    next: (response) => {
                        console.log('Login bem-sucedido:', response);
                        // Redirecionar ou realizar outras ações após o login
                    }
                });
        }
    }

    onRegisterSubmit(form: any) {
        if (form.valid) {
            this.loadingState = true;

            this.authService.signup(form.value.name, form.value.email, form.value.password)
                .pipe(
                    catchError((error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro de Registro',
                            detail: 'Não foi possível registrar o usuário. Por favor, tente novamente.'
                        });
                        this.loadingState = false;

                        throw error;
                    }))
                .subscribe({
                    next: (response) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Registro bem-sucedido',
                            detail: 'Usuário registrado com sucesso. Aguarde aprovação...'
                        });
                        this.tabActiveIndex = 0; // Volta para a aba de login após o registro
                        this.loadingState = false;

                    }
                });
        }
    }

}

interface LoginForm {
    email: FormControl,
    password: FormControl
}

interface RegisterForm {
    name: FormControl,
    email: FormControl,
    password: FormControl
}



