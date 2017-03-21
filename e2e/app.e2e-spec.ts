import { DemoClientV2Page } from './app.po';

describe('demo-client-v2 App', function() {
  let page: DemoClientV2Page;

  beforeEach(() => {
    page = new DemoClientV2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
