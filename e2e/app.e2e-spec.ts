import { AngularBundleSizeExperimentPage } from './app.po';

describe('angular-bundle-size-experiment App', () => {
  let page: AngularBundleSizeExperimentPage;

  beforeEach(() => {
    page = new AngularBundleSizeExperimentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
