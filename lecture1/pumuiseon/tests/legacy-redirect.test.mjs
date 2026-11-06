import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const html = readFileSync(new URL('../legacy-my-community-redirect.html', import.meta.url), 'utf8');
const script = html.split('<script>')[1].split('</script>')[0];

test('old public links preserve detail, filters and material history at the new address', () => {
  for (const legacy of ['portfolio-feedback-hub', 'my-community']) {
    for (const route of ['#/', '#/requests/PR-2007', '#/orders/PR-2001', '#/requests?status=action&q=센서', '#/materials/MT-0001#movement-history']) {
      const original = new URL('https://kdhan0320-bot.github.io/dohan-portfolio/' + legacy + '/?from=portfolio' + route);
      const link = { href: '' };
      let redirected;
      runInNewContext(script, {
        URL,
        document: { getElementById: () => link },
        window: { location: {
          origin: original.origin, search: original.search, hash: original.hash,
          replace: value => { redirected = new URL(value); },
        } },
      });
      assert.equal(redirected.origin, original.origin);
      assert.equal(redirected.pathname, '/dohan-portfolio/pumuiseon/');
      assert.equal(redirected.search, original.search);
      assert.equal(redirected.hash, original.hash);
      assert.equal(link.href, redirected.href);
    }
  }
});
