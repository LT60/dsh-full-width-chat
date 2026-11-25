# Full-width conversation

The conversation normally centers its transcript in a reading column whose width
is capped at about 920 px (or 64% of the column, whichever is smaller). On a wide
monitor that leaves large empty margins on both sides. This plugin removes the
cap, so the transcript, the input box, dock cards and takeover cards all span the
whole conversation column.

## What changes

- The message column, the composer and the cards that follow the same width axis
  fill the conversation column from edge to edge.
- The sidebar's embedded conversation keeps its own width.
- The drag-to-resize width handles no longer move while the plugin is enabled:
  the width is pinned to the column. Disable the plugin in **Plugins** to get the
  resize handles and the default cap back.

## Optional breathing room

The stylesheet reads one optional custom property, `--dsh-wide-chat-gutter`,
which is empty (0 px) by default. A value puts that much space on each side:

```css
:root { --dsh-wide-chat-gutter: 24px; }
```

## Implementation

The bundle's Client module is a single injected stylesheet. The host half has no
behavior, tools or configuration. The override targets the conversation body by
its stable `data-conversation-content` attribute rather than the generated
CSS-Modules class hashes.
