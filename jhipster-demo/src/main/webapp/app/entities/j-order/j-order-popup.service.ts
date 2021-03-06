import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JOrder } from './j-order.model';
import { JOrderService } from './j-order.service';

@Injectable()
export class JOrderPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private jOrderService: JOrderService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.jOrderService.find(id).subscribe((jOrder) => {
                    if (jOrder.orderDate) {
                        jOrder.orderDate = {
                            year: jOrder.orderDate.getFullYear(),
                            month: jOrder.orderDate.getMonth() + 1,
                            day: jOrder.orderDate.getDate()
                        };
                    }
                    this.ngbModalRef = this.jOrderModalRef(component, jOrder);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.jOrderModalRef(component, new JOrder());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    jOrderModalRef(component: Component, jOrder: JOrder): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.jOrder = jOrder;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
