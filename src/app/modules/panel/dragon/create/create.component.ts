import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from "angular-notifier";

import { DragonService } from 'src/app/services/dragon.service';
import { Dragon } from 'src/app/models/dragon';

import { AppEventDispatcher } from '../../../../shared/AppEventDispatcher';
import { EventTypes } from '../../../../shared/eventTypes';

import { CustomValidator } from 'src/app/shared/utils/custom.validator';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;
  private readonly notifier: NotifierService;
  active: boolean;
  sendForm: Boolean;
  id: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private dragonService: DragonService
  ) { 
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
      this.dragonService.getId(this.id).then((data: any) => {
        this.focusInput();
        this.createForm.patchValue(data);
        AppEventDispatcher.dispatch(EventTypes.PRELOADER, 'hide');
      }).catch((error) => {
        console.log(error);
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
        createAt: new Date,
        history: this.createForm.controls.history.value,
        histories: []
      }
      if(this.id) {
        this.update(dragon);
      } else {
        this.save(dragon);
      }
    } else {
      this.notifier.show({
        type: "error",
        message: "Ajuste todos os campos inválidos antes de enviar o formulário.",
        id: "error-form",
      });
    }
  }

  save(dragon: Dragon) {
    this.dragonService.post(dragon).then((data: any) => {
      this.notifier.show({
        type: "success",
        message: `o Dragão "${dragon.name}" foi adicionado a lista.`,
        id: "success-form",
      });
      this.router.navigate(['/']);
      AppEventDispatcher.dispatch(EventTypes.PRELOADER, 'hide');
      this.sendForm = false;
    }).catch((error) => {
      this.notifier.show({
        type: "error",
        message: error,
        id: "success-form",
      });
    });
  }

  update(dragon: Dragon) {
    this.dragonService.put(dragon, this.id).then((data: any) => {
      this.notifier.show({
        type: "success",
        message: `o Dragão ${dragon.name} foi atualizado.`,
        id: "success-form",
      });
      this.router.navigate(['/']);
      AppEventDispatcher.dispatch(EventTypes.PRELOADER, 'hide');
      this.sendForm = false;
    }).catch((error) => {
      this.notifier.show({
        type: "error",
        message: error,
        id: "success-form",
      });
    });
  }

  focusInput() {
    this.active = true;
  }

}
