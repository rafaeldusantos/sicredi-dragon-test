import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { DragonService } from 'src/app/services/dragon.service';
import { NotifierService } from 'angular-notifier';

import { Dragon } from 'src/app/models/dragon';
import { Pagination } from 'src/app/models/pagination';

import { AppEventDispatcher } from 'src/app/shared/AppEventDispatcher';
import { EventTypes } from 'src/app/shared/eventTypes';

@Component({
  selector: 'app-list',
  templateUrl: './listDragon.component.html',
  styleUrls: ['./listDragon.component.scss']
})
export class ListDragonComponent implements OnInit {
  totalDragon: Array<Dragon>;
  list: Array<Dragon>;
  dragon: Dragon;
  pagination: Pagination;
  pages: Array<number>;
  perPage: number;
  modalProccess: boolean;
  serverError: boolean;
  to: number;
  from: number;
  private readonly notifier: NotifierService;

  popoverTitle = 'Deletar Dragão';
  popoverMessage = 'Você confirma a exclusão deste Dragão?';
  confirmClicked = false;
  cancelClicked = false;
  confirmText = 'Sim';
  cancelText = 'Não';

  constructor(
    private dragonService: DragonService,
    private notifierService: NotifierService
  ) {
    this.totalDragon = [];
    this.pagination = new Pagination(this.perPage);
    this.dragon = new Dragon();
    this.modalProccess = false;
    this.notifier = notifierService;
    this.serverError = false;
    this.perPage = 10;
  }

  ngOnInit() {
    this.mountList();
  }

  mountList() {
    this.dragonService.get().subscribe(data => {
      this.totalDragon = data;
      AppEventDispatcher.dispatch(EventTypes.PRELOADER, 'hide');
      this.list = this.paginate(this.pagination.currentPage);
    },
    error => {
      this.error('Ocorreu um problema insperado.');
    });
  }

  paginate(page: number) {
    const totalPages = Math.ceil(this.totalDragon.length / this.perPage);
    this.pagination = {
      totalPages,
      currentPage: page,
      pages : Array(totalPages).fill(0).map(( x, i ) => i + 1),
      perPage: this.perPage
    };

    const calcPage = this.pagination.perPage * this.pagination.currentPage;
    this.to = (calcPage) - 9;
    this.from = calcPage < this.totalDragon.length
      ? calcPage
      : this.totalDragon.length;

    return this.totalDragon.slice(
      (this.pagination.currentPage - 1) * this.pagination.perPage, this.pagination.currentPage * this.pagination.perPage);
  }

  pageChanged(newPage: number) {
    this.list = this.paginate(newPage);
  }

  openDetails(id: string) {
    this.dragonService.getId(id).subscribe(data => {
      this.dragon = data;
      this.modalProccess = true;
    },
    error => {
      this.error('Ocorreu um problema insperado.');
    });

  }

  remove(id: string) {
    this.dragonService.delete(id).subscribe(() => {
      AppEventDispatcher.dispatch(EventTypes.PRELOADER, 'show');
      this.notifier.show({
        type: 'success',
        message: 'O Dragão foi removido da lista.',
        id: 'success-form',
      });
      this.mountList();
    },
    error => {
      this.error('Ocorreu um problema insperado.');

    });
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
