import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';

import { DragonService } from 'src/app/services/dragon.service';
import { Dragon } from 'src/app/models/dragon';

import { AppEventDispatcher } from '../../../../shared/AppEventDispatcher';
import { EventTypes } from '../../../../shared/eventTypes';

import { CustomValidator } from 'src/app/shared/utils/custom.validator';

@Component({
  selector: 'app-create',
  templateUrl: './createDragon.component.html',
  styleUrls: ['./createDragon.component.scss']
})
export class CreateDragonComponent implements OnInit {
  createForm: FormGroup;
  private readonly notifier: NotifierService;
  active: boolean;
  sendForm: boolean;
  serverError: boolean;
  id: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private dragonService: DragonService
  ) {
    this.serverError = false;
    this.active = false;
    this.sendForm = false;
    this.notifier = notifierService;
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), CustomValidator.spacesOnly]],
      type: ['', [Validators.required, Validators.minLength(2), CustomValidator.spacesOnly]],
      history: ['']
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      AppEventDispatcher.dispatch(EventTypes.PRELOADER, 'show');
      this.dragonService.getId(this.id).subscribe((data: any) => {
        this.focusInput();
        this.createForm.patchValue(data);
        AppEventDispatcher.dispatch(EventTypes.PRELOADER, 'hide');
      },
      error => {
        this.error('Ocorreu um problema insperado.');

      });
    }
  }

  get f() { return this.createForm.controls; }

  onSubmit() {
    this.sendForm = true;
    this.focusInput();
    if (this.createForm.valid) {
      AppEventDispatcher.dispatch(EventTypes.PRELOADER, 'show');
      let dragon = new Dragon();
      dragon = {
        name: this.createForm.controls.name.value.trim(),
        type: this.createForm.controls.type.value.trim(),
        createAt: new Date(),
        history: this.createForm.controls.history.value,
        histories: []
      };

      if (this.id) {
        this.update(dragon);
      } else {
        this.save(dragon);
      }
    } else {
      this.notifier.show({
        type: 'error',
        message: 'Ajuste todos os campos inválidos antes de enviar o formulário.',
        id: 'error-form',
      });
    }
  }

  save(dragon: Dragon) {
    this.dragonService.post(dragon).subscribe((data: any) => {
      this.notifier.show({
        type: 'success',
        message: `o Dragão '${dragon.name}' foi adicionado a lista.`,
        id: 'success-form',
      });
      this.router.navigate(['/']);
      AppEventDispatcher.dispatch(EventTypes.PRELOADER, 'hide');
      this.sendForm = false;
    },
    error => {
      this.error('Ocorreu um problema insperado.');

    });
  }

  update(dragon: Dragon) {
    this.dragonService.put(dragon, this.id).subscribe((data: any) => {
      this.notifier.show({
        type: 'success',
        message: `o Dragão ${dragon.name} foi atualizado.`,
        id: 'success-form',
      });
      this.router.navigate(['/']);
      AppEventDispatcher.dispatch(EventTypes.PRELOADER, 'hide');
      this.sendForm = false;
    },
    error => {
      this.error('Ocorreu um problema insperado.');

    });
  }

  focusInput() {
    this.active = true;
  }

  error(message: string) {
    this.notifier.show({
      type: 'error',
      message,
      id: 'success-form',
    });
    AppEventDispatcher.dispatch(EventTypes.ERROR, 'show');
    AppEventDispatcher.dispatch(EventTypes.PRELOADER, 'hide');
    this.serverError = true;
  }

}
