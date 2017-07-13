import { VistaPage } from './app.po';

describe('vista App', () => {
  let page: VistaPage;

  beforeEach(() => {
    page = new VistaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
