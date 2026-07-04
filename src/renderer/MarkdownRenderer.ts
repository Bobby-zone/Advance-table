import {App, MarkdownRenderer} from 'obsidian';

export class MarkdownRendererWrapper {
  static render(app: App, el: HTMLElement, text: string, ctx?: any) {
    MarkdownRenderer.render(app, text, el, '', ctx);
  }
}