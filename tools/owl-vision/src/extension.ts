import * as vscode from 'vscode';
import { Search } from './search';
import { ComponentDefinitionProvider } from './definiton_providers';

export async function activate(context: vscode.ExtensionContext) {
    const search = new Search();

    context.subscriptions.push(vscode.commands.registerCommand('owl-vision.switch', () => search.switchCommand()));
    context.subscriptions.push(vscode.commands.registerCommand('owl-vision.switch-besides', () => search.switchCommand(true)));
    context.subscriptions.push(vscode.commands.registerCommand('owl-vision.find-component', () => search.findComponentCommand()));
    context.subscriptions.push(vscode.commands.registerCommand('owl-vision.find-template', () => search.findTemplateCommand()));

    const componentDefProvider = new ComponentDefinitionProvider(search);
    context.subscriptions.push(vscode.languages.registerDefinitionProvider({ language: 'xml' }, componentDefProvider));
    context.subscriptions.push(vscode.languages.registerDefinitionProvider({ language: 'javascript' }, componentDefProvider));
}

export function deactivate() { }
