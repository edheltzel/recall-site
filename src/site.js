export const siteName = 'Recall';

/** Placeholder until the Recall brief lands. */
export const siteDescription =
  'Persistent memory for coding agents. Recall captures each session, distills what matters into one local SQLite file, and injects it when the next session starts.';

/** Landing install command (captain lock). */
export const installCommand = 'gap sync';

/** Product repo. */
export const repoHref = 'https://github.com/edheltzel/Recall';

/** Docs and install guide are coming-soon placeholders. Keep the links visible. */
export const docsHref = '/docs/';
export const installHref = '/docs/install/';

/**
 * Social preview image. TODO: recolor public/og.png to the Recall accent once the
 * brief lands. Until then this is the DoSkills image as a stand-in.
 */
export const ogImage = {
  path: '/og.png',
  width: 1200,
  height: 630,
  alt: 'Recall. Persistent memory for coding agents.',
};
