import { TemplateRef, ViewContainerRef } from '@angular/core';
import { DeviceDirective } from './device.directive';
import { waitForAsync } from '@angular/core/testing';

describe('DeviceDirective', () => {
  let templateRef: TemplateRef<unknown>;
  let viewContainer: ViewContainerRef;
  let templateRefMock: TemplateRef<unknown>;
  let viewContainerMock: ViewContainerRef;
  beforeEach(() => {
    templateRef = {} as TemplateRef<unknown>;
    viewContainer = {} as ViewContainerRef;
    templateRefMock = jasmine.createSpyObj('TemplateRef', ['createEmbeddedView']);
    viewContainerMock = jasmine.createSpyObj('ViewContainerRef', ['createEmbeddedView', 'clear']);
  });
  it('should create an instance', () => {
    const directive = new DeviceDirective(templateRef, viewContainer);
    expect(directive).toBeTruthy();
  });

  it('should set screen size and update visibility of content', () => {
    const directive = new DeviceDirective(templateRef, viewContainer);
    directive.ngxDevice = 'md';
    expect(directive['screenSize']).toEqual('md');
    expect(directive['hasView']).toBeFalse();
  });

  it('should update visibility of content when window is resized', () => {
    const templateRef = {} as TemplateRef<unknown>;
    const viewContainer = {} as ViewContainerRef;
    const directive = new DeviceDirective(templateRef, viewContainer);
    directive.ngxDevice = 'md';
    expect(directive['hasView']).toBeFalse();
    directive['checkScreenSize'] = jasmine.createSpy('checkScreenSize');
    directive.ngOnInit();
    window.dispatchEvent(new Event('resize'));
    expect(directive['checkScreenSize']).toHaveBeenCalled();
  });

  it('should show content when screen size matches breakpoint', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(992);

    const deviceDirective = new DeviceDirective(templateRefMock, viewContainerMock);
    deviceDirective.ngxDevice = 'md';
    expect(viewContainerMock.createEmbeddedView).toHaveBeenCalled();
  });

  it('should show content when screen size matches breakpoint', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(992);

    const directive = new DeviceDirective(templateRefMock, viewContainerMock);
    directive.ngxDevice = 'md';
    directive.ngOnInit();
    expect(viewContainerMock.createEmbeddedView).toHaveBeenCalled();
  });

  it('should hide content when screen size is smaller than breakpoint', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(200);
    const directive = new DeviceDirective(templateRefMock, viewContainerMock);
    directive.ngxDevice = 'md';
    directive['hasView'] = true;
    directive.ngOnInit();
    window.dispatchEvent(new Event('resize'));
    expect(viewContainerMock.clear).toHaveBeenCalled();
  });

  it('should hide content when screen size is larger than breakpoint and was previously hidden', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1200);
    const directive = new DeviceDirective(templateRefMock, viewContainerMock);
    directive.ngxDevice = 'md';
    directive['hasView'] = false;
    directive.ngOnInit();
    window.dispatchEvent(new Event('resize'));
    expect(viewContainerMock.createEmbeddedView).toHaveBeenCalled();
  });

  it('When invalid value is provided', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1200);
    spyOn(console, 'error');
    const directive = new DeviceDirective(templateRefMock, viewContainerMock);
    directive.ngxDevice = 'Unknown';
    directive['hasView'] = true;
    directive.ngOnInit();
    window.dispatchEvent(new Event('resize'));
    expect(viewContainerMock.createEmbeddedView).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();
  });
});
