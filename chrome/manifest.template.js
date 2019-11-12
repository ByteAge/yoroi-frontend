// @flow

/*::
type Icons = {
  '16': string,
  '48': string,
  '128': string,
};
*/

export default ({
  description,
  defaultTitle,
  contentSecurityPolicy,
  versionName,
  extensionKey,
  iconOverride,
  versionOverride,
} /*: {
  description: string,
  defaultTitle: string,
  contentSecurityPolicy: string,
  versionName?: string,
  extensionKey?: string,
  iconOverride?: Icons,
  versionOverride?: string,
} */
) => { // eslint-disable-line function-paren-newline
  const icons = iconOverride == null
    ? {
      /* eslint-disable quote-props */
      '16': 'img/icon-16.png',
      '48': 'img/icon-48.png',
      '128': 'img/icon-128.png',
      /* eslint-enable quote-props */
    }
    : iconOverride;
  const base = {
    version: versionOverride == null
      ? '1.10.0'
      : versionOverride,
    name: 'yoroi',
    manifest_version: 2,
    description,
    browser_action: {
      default_title: defaultTitle,
      default_icon: icons,
    },
    browser_specific_settings: {
      gecko: {
        id: '{530f7c6c-6077-4703-8f71-cb368c663e35}',
      },
    },
    icons,
    background: {
      page: 'background.html',
    },
    permissions: [
      'storage',
      '*://connect.trezor.io/*',
      'https://emurgo.github.io/yoroi-extension-ledger-connect/*'
    ],
    content_scripts: [
      {
        matches: ['*://connect.trezor.io/*/popup.html'],
        js: ['js/trezor-content-script.js'],
      },
      {
        matches: ['https://emurgo.github.io/yoroi-extension-ledger-connect/*'],
        js: ['js/ledger-content-script.js']
      }
    ],
    content_security_policy: contentSecurityPolicy,
    protocol_handlers: [
      {
        protocol: 'web+cardano',
        name: 'Yoroi',
        uriTemplate: 'main_window.html#/send-from-uri?q=%s',
      },
    ],
  };

  const verName /*: {| version_name?: string |} */ = versionName != null
    ? { version_name: versionName }
    : Object.freeze({});
  const extKey /*: {| key?: string |} */ = extensionKey != null
    ? { key: extensionKey }
    : Object.freeze({});
  return {
    ...verName,
    ...base,
    ...extKey,
  };
};
