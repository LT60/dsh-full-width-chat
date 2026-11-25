/*!
 * dsh-full-width-chat
 * Make the conversation fill its whole column instead of a centered reading column.
 *
 * The conversation shares one width axis: ConversationRoot publishes
 * `--dsh-chat-content-width` on the body element, and the transcript column,
 * the composer card and the dock/takeover cards all cap against it. Overriding
 * that single custom property widens every one of them at once.
 *
 * The selector deliberately uses stable semantic attributes
 * (`data-conversation-content`, plus the CSS-Modules local-name suffix
 * `embeddedBody` for the sidebar occurrence) rather than the generated class
 * hashes, which change on every DSH rebuild.
 *
 * `!important` is required: the host sets the property in its own module
 * stylesheet, and the drag-to-resize preference is written to a different
 * property (`--dsh-chat-user-width`) as an inline style.
 */
window.__ModuleLoader__.load({
  id: 'dsh-full-width-chat',
  factory() {
    'use strict'

    const PLUGIN_ID = 'dsh-full-width-chat'

    // `--dsh-wide-chat-gutter` is optional breathing room on each side; it
    // defaults to 0, i.e. the transcript reaches the edges of the column.
    const CSS = `
[data-conversation-content]:not([class*='embeddedBody']) {
  --dsh-chat-content-width: calc(100% - 2 * var(--dsh-wide-chat-gutter, 0px)) !important;
}
`

    return {
      apply(ctx) {
        if (typeof document === 'undefined') return
        ctx.effect(() => {
          const tag = document.createElement('style')
          tag.dataset.plugin = PLUGIN_ID
          tag.dataset.pluginCss = `${PLUGIN_ID}/full-width`
          tag.textContent = CSS
          document.head.appendChild(tag)
          return () => { tag.remove() }
        }, 'full-width-chat: fill the conversation column')
      },
    }
  },
})
