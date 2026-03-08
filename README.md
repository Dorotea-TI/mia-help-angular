# Mia Help Angular

Workspace actualizado a Angular 21.

Incluye:

- librerias publicables `@doroteati/mia-help-core`, `@doroteati/mia-help-editor` y `@doroteati/mia-help-viewer`
- componentes standalone por defecto
- wrappers `NgModule` para compatibilidad con proyectos legacy
- aplicacion `example` con arranque standalone y soporte SSR

## Comandos

- `npm install`
- `npm start`
- `npm run build:core`
- `npm run build:editor`
- `npm run build:viewer`
- `npm run build`
- `npm run build:ssr:example`
- `npm run serve:ssr:example`

## Uso standalone

Importa los componentes directamente desde el `public-api` del paquete:

- `HelpListComponent`
- `NewItemHelpComponent`
- `HelpfulColumnComponent`
- `HomeHelpComponent`
- `TopicViewHelpComponent`

## Compatibilidad con modulos

Si el proyecto consumidor sigue usando `NgModule`, puedes importar:

- `MiaHelpCoreModule`
- `MiaHelpEditorModule`
- `MiaHelpViewerModule`

## Estado actual

- Angular y dependencias del workspace actualizadas a versiones compatibles con Angular 21
- `example` migrado a `bootstrapApplication`
- SSR compilando en `dist/example`

Quedan warnings de bundle en dependencias externas (`moment`, `quill-delta`) y en budgets del ejemplo, pero no bloquean la compilacion.
