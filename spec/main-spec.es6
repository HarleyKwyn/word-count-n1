import {ComponentRegistry} from 'nylas-exports';
import {activate, deactivate} from '../lib/main';

// import MyMessageSidebar from '../lib/my-message-sidebar';
import WordCountIndicator from './word-count-indicator';

describe("activate", () => {
  it("should register the composer button and sidebar", () => {
    spyOn(ComponentRegistry, 'register');
    activate();
    expect(ComponentRegistry.register).toHaveBeenCalledWith(WordCountIndicator, {role: 'Composer:ActionButton'});
    // expect(ComponentRegistry.register).toHaveBeenCalledWith(MyMessageSidebar, {role: 'MessageListSidebar:ContactCard'});
  });
});

describe("deactivate", () => {
  it("should unregister the composer button and sidebar", () => {
    spyOn(ComponentRegistry, 'unregister');
    deactivate();
    expect(ComponentRegistry.unregister).toHaveBeenCalledWith(WordCountIndicator);
    // expect(ComponentRegistry.unregister).toHaveBeenCalledWith(MyMessageSidebar);
  });
});
