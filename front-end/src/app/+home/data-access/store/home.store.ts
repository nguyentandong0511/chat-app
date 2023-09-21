import { Injectable } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import * as moment from 'moment';
import { io } from 'socket.io-client';

export interface HomeState {
    messageList: { userName: string, room: number, time: string, message: string }[],
    isLogin: boolean
}

const initialState: HomeState = {
    messageList: [],
    isLogin: false
};

@Injectable({ providedIn: 'root' })
export class HomeStore extends ComponentStore<HomeState> implements OnStoreInit {
    socket = io('http://localhost:3000');
    message = new FormControl('', { nonNullable: true });
    loginForm = this._fb.group({
        userName: this._fb.control('', [Validators.required]),
        passWord: this._fb.control('', [Validators.required]),
    });

    constructor(
        private _fb: NonNullableFormBuilder,
        private _router: Router,
    ) {
        super(initialState);

    }

    ngrxOnStoreInit() {
        this.socket.on('connect', () => {
            // console.log(this.socket);
        });

        this.socket.on('receive_message', (msg: { userName: string, room: number, time: string, message: string }) => {
            this.selectSignal(s => s.messageList)().push(msg)
        });
    }

    login() {
        for (let control in this.loginForm.controls) {
            this.loginForm.get(control)!.markAsTouched();
            this.loginForm.get(control)!.markAsDirty();
        }

        if (this.loginForm.invalid) {
            return;
        }

        this.socket.emit("join_room", 123);
        this.updateLogin()
        sessionStorage.setItem('userName', this.loginForm.controls.userName.value)
        this._router.navigate(['/']);
    }

    updateLogin = this.updater((s) => {
        s.isLogin = true
        return s
    })

    checkUser(userName: string) {
        return sessionStorage.getItem('userName') === userName
    }


    sendMessage() {
        if (this.message.invalid) return;
        const chat = {
            userName: sessionStorage.getItem('userName'),
            time: moment(new Date()).utc(true).toISOString(),
            room: 123,
            message: this.message.getRawValue()
        }
        this.message.reset()
        this.socket.emit('send_message', { message: chat });
    }

}
