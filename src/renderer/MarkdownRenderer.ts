import {App, Component, MarkdownRenderer} from 'obsidian';

export class MarkdownRendererWrapper {
  static render(app: App, el: HTMLElement, text: string, ctx: Component) {
    MarkdownRenderer.render(app, text, el, '', ctx);
  }
}