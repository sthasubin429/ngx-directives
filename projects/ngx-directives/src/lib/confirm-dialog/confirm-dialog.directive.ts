import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ngxConfirmDialog]',
})
export class ConfirmDialogDirective {
  @Input() ngxConfirmDialog: string = 'Are you sure you want to proceed?';
  @Output() ngxConfirmClick: EventEmitter<Event> = new EventEmitter();

  private dialogElement!: HTMLDivElement | null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onClick(): void {
    this.showDialog();
  }

  private createDialog(): void {
    this.dialogElement = this.renderer.createElement('div');
    if (this.dialogElement) {
      this.dialogElement.classList.add('confirmation-dialog');
      this.dialogElement.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
      this.dialogElement.style.position = 'fixed';
      this.dialogElement.style.top = '0';
      this.dialogElement.style.left = '0';
      this.dialogElement.style.width = '100%';
      this.dialogElement.style.height = '100%';
      this.dialogElement.style.display = 'flex';
      this.dialogElement.style.justifyContent = 'center';
      this.dialogElement.style.alignItems = 'center';
      this.dialogElement.style.zIndex = '999';

      const dialogContent: HTMLElement = this.renderer.createElement('div');
      dialogContent.style.backgroundColor = 'white';
      dialogContent.style.padding = '20px';
      dialogContent.style.borderRadius = '5px';

      const title: HTMLElement = this.renderer.createElement('h2');
      title.innerText = 'Confirmation';

      const message: HTMLElement = this.renderer.createElement('p');
      message.innerText = 'Are you sure you want to proceed?';

      const okButton: HTMLElement = this.renderer.createElement('button');
      okButton.style.marginRight = '10px';
      okButton.innerText = 'OK';
      okButton.classList.add('ok-button');
      okButton.addEventListener('click', (event: Event) => this.onOKClick(event));

      const cancelButton: HTMLElement = this.renderer.createElement('button');
      cancelButton.innerText = 'Cancel';
      cancelButton.addEventListener('click', (event: Event) => this.onCancelClick(event));

      dialogContent.appendChild(title);
      dialogContent.appendChild(message);
      dialogContent.appendChild(okButton);
      dialogContent.appendChild(cancelButton);

      this.dialogElement.appendChild(dialogContent);
      this.renderer.appendChild(this.el.nativeElement, this.dialogElement);
    }
  }

  private onOKClick(event: Event): void {
    event.stopPropagation();
    this.ngxConfirmClick.emit(event);
    this.hideDialog();
  }

  private onCancelClick(event: Event): void {
    event.stopPropagation();
    this.hideDialog();
  }

  private showDialog(): void {
    if (!this.dialogElement) {
      this.createDialog();
    }
    this.renderer.setStyle(this.dialogElement, 'display', 'flex');
  }

  private hideDialog(): void {
    this.renderer.setStyle(this.dialogElement, 'display', 'none');
  }
}
