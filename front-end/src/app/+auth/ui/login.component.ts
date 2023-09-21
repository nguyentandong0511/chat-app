import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HomeStore } from 'src/app/+home/data-access/store/home.store';
import { provideComponentStore } from '@ngrx/component-store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
  ],
  template: `
    <div class="w-full min-h-full flex flex-col justify-center items-center py-12">
    <div class="px-5 py-12 sm:px-12 rounded-xl w-[450px] mx-auto max-w-full">

      <ng-container>
        <form
          class="mt-8"
          [formGroup]="hStore.loginForm"
        >
          <mat-form-field
            class="w-full mb-5"
            appearance="fill"
            [floatLabel]="'always'"
          >
            <input
              matInput
              [placeholder]="'Nhập user name'"
              autocomplete="off"
              name="userName"
              formControlName="userName"
            />
            <mat-error>
              Vui lòng nhập tên đăng nhập
            </mat-error>
          </mat-form-field>
          <mat-form-field
            class="w-full "
            appearance="fill"
            [floatLabel]="'always'"
          >
            <input
              #passwordField
              type="password"
              autocomplete="off"
              matInput
              [placeholder]="'Vui lòng nhập mật khẩu'"
              name="passWord"
              formControlName="passWord"
            />

            <mat-error>
              Vui lòng nhập mật khẩu
            </mat-error>
            <button
              matSuffix
              type="button"
              (click)="
                passwordField.type === 'password'
                  ? (passwordField.type = 'text')
                  : (passwordField.type = 'password')
              "
              class="-mr-1 flex items-center justify-center"
            >
              <mat-icon
                class="icon-size-5"
                [fontIcon]="
                  passwordField.type === 'password'
                    ? 'visibility'
                    : 'visibility_off'
                "
              >
              </mat-icon>
            </button>
          </mat-form-field>
          <div class="mt-3 text-right">
            <button class="py-3 px-6 bg-black hover:bg-black focus:bg-black text-white rounded-md" type="button"
                (click)="hStore.login()">
                Đăng nhập
            </button>
          </div>
        </form>
      </ng-container>
  </div>

  `,
  styles: [
    `
      :host ::ng-deep .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
        padding-right: 16px !important;
      }
    `
  ],
  providers: [provideComponentStore(HomeStore)]
})
export class LoginComponent {
  hStore = inject(HomeStore)
  vm$ = this.hStore.selectSignal(s => s);
}
